"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  CloseOutlined,
  LeftOutlined,
  SearchOutlined,
  RightOutlined,
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined,
  StarFilled,
  CoffeeOutlined,
  TagOutlined,
  FireOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { App, Input, Modal, Drawer } from "antd";
import { ROUTES } from "@/constants/routes";
import { getBranchById } from "@/data/branches";
import { mockProducts, ProductItem } from "@/data/products";

interface CartItemCustomization {
  size: "Small" | "Regular" | "Large";
  milk: "Whole Milk" | "Oat Milk" | "Almond Milk" | "Skimmed Milk";
  extraShot: boolean;
  itemTotal: number;
}

interface CartEntry {
  product: ProductItem;
  quantity: number;
  customization: CartItemCustomization;
}

export default function BranchMenuPage() {
  const router = useRouter();
  const params = useParams();
  const { message } = App.useApp();
  const branchId = (params?.branchId as string) || "br-1";
  const branch = getBranchById(branchId);

  // Menu Category & Search State
  const [activeCategory, setActiveCategory] = useState<string>("Barista's Choice");
  const [menuSearch, setMenuSearch] = useState<string>("");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [pickupTime, setPickupTime] = useState<string>("ASAP (~10 mins)");
  const [usePointsDiscount, setUsePointsDiscount] = useState<boolean>(false);

  // Customization Modal State
  const [customizingProduct, setCustomizingProduct] = useState<ProductItem | null>(null);
  const [customSize, setCustomSize] = useState<"Small" | "Regular" | "Large">("Regular");
  const [customMilk, setCustomMilk] = useState<"Whole Milk" | "Oat Milk" | "Almond Milk" | "Skimmed Milk">("Whole Milk");
  const [customExtraShot, setCustomExtraShot] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(`eh_cart_${branchId}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Ignore storage errors
    }
  }, [branchId]);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(`eh_cart_${branchId}`, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, branchId]);

  // Open Customization Modal
  const openCustomization = (product: ProductItem) => {
    setCustomizingProduct(product);
    setCustomSize("Regular");
    setCustomMilk("Whole Milk");
    setCustomExtraShot(false);
  };

  // Calculate item total price based on choices
  const calculateItemPrice = (basePrice: number, size: string, milk: string, extraShot: boolean) => {
    let price = basePrice;
    if (size === "Small") price -= 4;
    if (size === "Large") price += 8;
    if (milk === "Oat Milk" || milk === "Almond Milk") price += 6;
    if (extraShot) price += 10;
    return price;
  };

  // Add customized item to cart
  const handleConfirmAddToCart = () => {
    if (!customizingProduct) return;

    const size = customSize;
    const milk = customMilk;
    const extraShot = customExtraShot;
    const itemPrice = calculateItemPrice(customizingProduct.price, size, milk, extraShot);
    const cartKey = `${customizingProduct.id}-${size}-${milk}-${extraShot}`;

    setCart((prev) => {
      const existing = prev[cartKey];
      const newQty = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [cartKey]: {
          product: customizingProduct,
          quantity: newQty,
          customization: {
            size,
            milk,
            extraShot,
            itemTotal: itemPrice,
          },
        },
      };
    });

    message.success(`Added ${customizingProduct.name} to cart! ☕`);
    setCustomizingProduct(null);
  };

  // Quick add default item
  const handleQuickAddToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const defaultSize = "Regular";
    const defaultMilk = "Whole Milk";
    const defaultExtraShot = false;
    const cartKey = `${product.id}-${defaultSize}-${defaultMilk}-${defaultExtraShot}`;

    setCart((prev) => {
      const existing = prev[cartKey];
      return {
        ...prev,
        [cartKey]: {
          product,
          quantity: existing ? existing.quantity + 1 : 1,
          customization: {
            size: defaultSize,
            milk: defaultMilk,
            extraShot: defaultExtraShot,
            itemTotal: product.price,
          },
        },
      };
    });

    message.success(`Added ${product.name} to order!`);
  };

  // Cart quantity controls
  const updateCartQuantity = (cartKey: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[cartKey];
      if (!existing) return prev;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        const nextCart = { ...prev };
        delete nextCart[cartKey];
        return nextCart;
      }

      return {
        ...prev,
        [cartKey]: {
          ...existing,
          quantity: newQty,
        },
      };
    });
  };

  // Calculate cart summary
  const cartEntries = Object.entries(cart);
  const totalCartCount = cartEntries.reduce((sum, [, entry]) => sum + entry.quantity, 0);
  const rawSubtotal = cartEntries.reduce(
    (sum, [, entry]) => sum + entry.customization.itemTotal * entry.quantity,
    0
  );
  const discountAmount = usePointsDiscount ? Math.min(10, rawSubtotal) : 0;
  const finalTotalPrice = Math.max(0, rawSubtotal - discountAmount);

  // Categories list
  const categories = [
    { name: "Barista's Choice", icon: <StarFilled className="text-amber-400" /> },
    { name: "App deals", icon: <TagOutlined className="text-emerald-500" /> },
    { name: "Cold drinks", icon: <FireOutlined className="text-sky-500" /> },
    { name: "Hot drinks", icon: <CoffeeOutlined className="text-amber-700" /> },
  ];

  // Filter products by category & search
  const filteredProducts = mockProducts.filter((p) => {
    const matchesCat = p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/order/${branch.id}`}
              className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all cursor-pointer border border-gray-200/80 active:scale-95"
              aria-label="Back to Store Details"
            >
              <LeftOutlined className="text-xs" />
            </Link>

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#16302b] flex items-center gap-2">
                <span>{branch.name} Menu</span>
                <span className="hidden sm:inline-block bg-brand-sage text-[#1e3932] text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  Open until {branch.closingTime}
                </span>
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                Step 3 of 3: Select Products & Pre-Order
              </p>
            </div>
          </div>

          {/* Header Step Progress Pills */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={ROUTES.ORDER}
              className="px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              1. Location
            </Link>
            <span className="text-gray-300">›</span>
            <Link
              href={`/order/${branch.id}`}
              className="px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              2. Details
            </Link>
            <span className="text-gray-300">›</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1e3932] text-white shadow-xs">
              3. Order Menu
            </span>
          </div>

          {/* Quick Cart Pill indicator in header */}
          {totalCartCount > 0 && (
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="bg-brand-sage hover:bg-emerald-200 text-[#1e3932] px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-2 border border-emerald-300/80 transition-all cursor-pointer shadow-2xs"
            >
              <ShoppingOutlined className="text-sm" />
              <span>{totalCartCount} items ({finalTotalPrice} SEK)</span>
            </button>
          )}
        </div>
      </header>

      {/* Sub Header Category Navigation Bar */}
      <div className="sticky top-[61px] z-30 bg-white border-b border-gray-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 space-y-2.5">
          {/* Category Pills & Search */}
          <div className="flex items-center justify-between gap-3">
            {/* Horizontal Category Nav */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setActiveSubCategory("All");
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#1e3932] text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Search Input */}
            <div className="w-48 sm:w-64 shrink-0 hidden sm:block">
              <Input
                prefix={<SearchOutlined className="text-gray-400 mr-1" />}
                placeholder="Search coffee or snacks..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                allowClear
                className="rounded-full py-1.5 px-3 bg-gray-100 border-none text-xs"
              />
            </div>
          </div>

          {/* Sub-category filter pills */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-100 overflow-x-auto no-scrollbar">
            {["All", "Seasonal Favourites", "Combos", "Drink Of The Month"].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeSubCategory === sub
                    ? "bg-brand-sage text-[#1e3932]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Menu Product Grid */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-32 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b]">
                {activeCategory}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Handcrafted beverages & freshly baked treats at {branch.name}
              </p>
            </div>

            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {filteredProducts.length} items available
            </span>
          </div>

          {/* Products Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md transition-all p-4 flex flex-col justify-between group hover:-translate-y-0.5"
              >
                {/* Product Image & Badges Container */}
                <div className="relative h-44 w-full bg-[#fef9f5] rounded-2xl overflow-hidden flex items-center justify-center p-3 mb-3">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top Left Badge */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-[#1e3932] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                      {product.badge}
                    </div>
                  )}

                  {/* Calories info */}
                  {product.calories && (
                    <div className="absolute bottom-2.5 right-2.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.calories} kcal
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-extrabold text-[#16302b] line-clamp-1 group-hover:text-[#1e3932] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-3">
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">Price</span>
                    <span className="text-base font-extrabold text-[#16302b]">
                      {product.price} SEK
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openCustomization(product)}
                      className="bg-brand-sage hover:bg-emerald-200 text-[#1e3932] px-3.5 py-2 rounded-full font-bold text-xs transition-all cursor-pointer"
                    >
                      Customize
                    </button>

                    <button
                      onClick={(e) => handleQuickAddToCart(product, e)}
                      className="bg-[#1e3932] hover:bg-primary-hover text-white h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                      title="Quick Add"
                    >
                      <PlusOutlined />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Cart Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-7xl mx-auto">
          <div className="bg-[#1e3932] text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-emerald-700/80 max-w-2xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
                <ShoppingOutlined />
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-2">
                  <span>{totalCartCount} {totalCartCount === 1 ? "Item" : "Items"}</span>
                  <span className="text-xs font-normal text-emerald-200">({branch.name})</span>
                </h4>
                <p className="text-xs text-amber-300 font-extrabold">
                  Total: {finalTotalPrice} SEK
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="bg-white hover:bg-emerald-50 text-[#1e3932] px-6 py-2.5 rounded-full font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <span>View Cart & Checkout</span>
              <RightOutlined className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Product Customization */}
      {customizingProduct && (
        <Modal
          open={!!customizingProduct}
          onCancel={() => setCustomizingProduct(null)}
          footer={null}
          centered
          className="custom-product-modal"
          width={520}
        >
          <div className="p-2 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-[#fef9f5] shrink-0 border border-gray-200">
                <Image
                  src={customizingProduct.imageSrc}
                  alt={customizingProduct.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#16302b]">
                  {customizingProduct.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-2">
                  {customizingProduct.description}
                </p>
                <p className="text-sm font-bold text-[#1e3932] pt-1">
                  Base Price: {customizingProduct.price} SEK
                </p>
              </div>
            </div>

            {/* Customization 1: Size */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 block">
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Small", "Regular", "Large"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setCustomSize(sz)}
                    className={`py-2.5 rounded-2xl font-bold text-xs border transition-all cursor-pointer ${
                      customSize === sz
                        ? "bg-[#1e3932] text-white border-[#1e3932] shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div>{sz}</div>
                    <span className="text-[10px] opacity-80 font-normal">
                      {sz === "Small" ? "-4 SEK" : sz === "Large" ? "+8 SEK" : "Standard"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 2: Milk Option */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 block">
                Milk Choice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["Whole Milk", "Oat Milk", "Almond Milk", "Skimmed Milk"] as const).map((mlk) => (
                  <button
                    key={mlk}
                    onClick={() => setCustomMilk(mlk)}
                    className={`py-2.5 px-3 rounded-2xl font-bold text-xs border text-left flex justify-between items-center transition-all cursor-pointer ${
                      customMilk === mlk
                        ? "bg-[#1e3932] text-white border-[#1e3932] shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <span>{mlk}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {mlk === "Oat Milk" || mlk === "Almond Milk" ? "+6 SEK" : "Free"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 3: Extra Shot */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 block">
                Extra Espresso Shot
              </label>
              <button
                onClick={() => setCustomExtraShot(!customExtraShot)}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-xs border flex items-center justify-between transition-all cursor-pointer ${
                  customExtraShot
                    ? "bg-brand-sage text-[#1e3932] border-emerald-400 font-extrabold"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span>➕ Add Extra Master Roast Espresso Shot</span>
                <span>+10 SEK</span>
              </button>
            </div>

            {/* Total Price & Add Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 font-medium block">Calculated Item Total</span>
                <span className="text-xl font-extrabold text-[#16302b]">
                  {calculateItemPrice(customizingProduct.price, customSize, customMilk, customExtraShot)} SEK
                </span>
              </div>

              <button
                onClick={handleConfirmAddToCart}
                className="bg-[#1e3932] hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* DRAWER: Expandable Cart Checkout Drawer */}
      <Drawer
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        placement="bottom"
        styles={{ wrapper: { maxHeight: "85vh" } }}
        className="rounded-t-3xl"
        title={
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-base text-[#16302b]">
              Your Fika Cart ({totalCartCount} items)
            </span>
            <span className="text-xs text-emerald-800 font-bold bg-brand-sage px-3 py-1 rounded-full">
              Pickup at {branch.name}
            </span>
          </div>
        }
      >
        <div className="space-y-6 pb-6 max-w-xl mx-auto">
          {/* Cart Items List */}
          <div className="space-y-3">
            {cartEntries.map(([cartKey, entry]) => (
              <div
                key={cartKey}
                className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-xl bg-white overflow-hidden shrink-0 border border-gray-200">
                    <Image
                      src={entry.product.imageSrc}
                      alt={entry.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#16302b]">
                      {entry.product.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {entry.customization.size} • {entry.customization.milk}
                      {entry.customization.extraShot ? " • Extra Shot" : ""}
                    </p>
                    <p className="text-xs font-bold text-[#1e3932]">
                      {entry.customization.itemTotal} SEK each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(cartKey, -1)}
                    className="h-7 w-7 rounded-full bg-white hover:bg-gray-200 border border-gray-300 flex items-center justify-center text-xs text-gray-700 cursor-pointer"
                  >
                    <MinusOutlined />
                  </button>
                  <span className="text-xs font-extrabold w-5 text-center">
                    {entry.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(cartKey, 1)}
                    className="h-7 w-7 rounded-full bg-[#1e3932] text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pickup Time Selector */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <label className="text-xs font-extrabold text-[#16302b] block">
              Estimated Pickup Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["ASAP (~10 mins)", "In 15 mins", "In 30 mins"].map((t) => (
                <button
                  key={t}
                  onClick={() => setPickupTime(t)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    pickupTime === t
                      ? "bg-[#1e3932] text-white border-[#1e3932]"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Reward Points Discount Option */}
          <div
            onClick={() => setUsePointsDiscount(!usePointsDiscount)}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              usePointsDiscount
                ? "bg-brand-sage border-emerald-400 text-[#1e3932]"
                : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <GiftOutlined className="text-lg text-emerald-700" />
              <div>
                <span className="text-xs font-extrabold block">Redeem 50 Loyalty Points</span>
                <span className="text-[11px] text-gray-500 font-medium">Save 10 SEK on this pre-order</span>
              </div>
            </div>
            <span className="text-xs font-extrabold bg-[#1e3932] text-white px-2.5 py-1 rounded-full">
              {usePointsDiscount ? "Applied ✓" : "Apply"}
            </span>
          </div>

          {/* Order Summary & Final Button */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>Subtotal</span>
              <span>{rawSubtotal} SEK</span>
            </div>

            {usePointsDiscount && (
              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span>Loyalty Reward Discount</span>
                <span>-10 SEK</span>
              </div>
            )}

            <div className="flex justify-between text-base font-extrabold text-[#16302b] pt-1">
              <span>Total Amount</span>
              <span className="text-[#1e3932]">{finalTotalPrice} SEK</span>
            </div>

            <button
              onClick={() => {
                message.success("🎉 Order placed! Your barista is preparing your Fika.");
                setCart({});
                try {
                  localStorage.removeItem(`eh_cart_${branchId}`);
                } catch {
                  // ignore
                }
                setIsCartDrawerOpen(false);
                router.push(ROUTES.ORDER);
              }}
              className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-4 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-98 text-center mt-3"
            >
              Confirm Pre-Order ({finalTotalPrice} SEK)
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
