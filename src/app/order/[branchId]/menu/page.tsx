"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined,
  StarFilled,
  CoffeeOutlined,
  TagOutlined,
  FireOutlined,
  GiftOutlined,
  ClockCircleOutlined,
  ShopOutlined,
  HomeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { App, Drawer, Dropdown, MenuProps, Modal } from "antd";
import { ROUTES } from "@/constants/routes";
import { getBranchById } from "@/data/branches";
import { mockProducts, ProductItem } from "@/data/products";

interface CartItemCustomization {
  frapinomix?: string;
  whippedCream?: string;
  extraWhippedCream?: boolean;
  extraShot?: boolean;
  itemTotal: number;
}

interface CartEntry {
  product: ProductItem;
  quantity: number;
  customization: CartItemCustomization;
}

// Category definition with specific subcategories matching app screenshot design
interface CategoryDef {
  name: string;
  icon: React.ReactNode;
  subCategories: string[];
}

const categoryDefinitions: CategoryDef[] = [
  {
    name: "Barista's Choice",
    icon: <StarFilled className="text-amber-400" />,
    subCategories: ["All", "Seasonal Favourites"],
  },
  {
    name: "App deals",
    icon: <TagOutlined className="text-emerald-500" />,
    subCategories: ["All", "Combos"],
  },
  {
    name: "Cold drinks",
    icon: <FireOutlined className="text-sky-500" />,
    subCategories: ["All", "Drink Of The Month", "Iced Classics"],
  },
  {
    name: "Hot drinks",
    icon: <CoffeeOutlined className="text-amber-700" />,
    subCategories: ["All", "Classic Coffee", "Specialty Coffee"],
  },
  {
    name: "Break Fast",
    icon: <ClockCircleOutlined className="text-orange-500" />,
    subCategories: ["All", "Hot Breakfast", "Bagels & Toast", "Healthy Start"],
  },
  {
    name: "Food",
    icon: <ShopOutlined className="text-[#1e3932]" />,
    subCategories: ["All", "Warm Paninis", "Wraps & Bowls"],
  },
  {
    name: "Pastry",
    icon: <GiftOutlined className="text-pink-500" />,
    subCategories: ["All", "Fika Bakery"],
  },
  {
    name: "Ready To Drink",
    icon: <ShoppingOutlined className="text-blue-500" />,
    subCategories: ["All", "Juices & Waters", "Canned Coffee"],
  },
  {
    name: "Enjoy At Home",
    icon: <HomeOutlined className="text-emerald-600" />,
    subCategories: ["All", "Coffee Beans", "Barista Syrups"],
  },
];

export default function BranchMenuPage() {
  const router = useRouter();
  const params = useParams();
  const { message } = App.useApp();
  const branchId = (params?.branchId as string) || "br-1";
  const branch = getBranchById(branchId);

  // Active Category State ("All" or specific category name)
  const [selectedCategory, setSelectedCategory] = useState<string>("Barista's Choice");
  
  // Selected Subcategories map: { [categoryName]: subCategoryName }
  const [activeSubCategories, setActiveSubCategories] = useState<Record<string, string>>({
    "Barista's Choice": "All",
    "App deals": "All",
    "Cold drinks": "All",
    "Hot drinks": "All",
    "Break Fast": "All",
    "Food": "All",
    "Pastry": "All",
    "Ready To Drink": "All",
    "Enjoy At Home": "All",
  });

  // Cart State (Persisted in localStorage with lazy initialization)
  const [cart, setCart] = useState<Record<string, CartEntry>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const savedCart = localStorage.getItem(`eh_cart_${branchId}`);
      return savedCart ? JSON.parse(savedCart) : {};
    } catch {
      return {};
    }
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  
  // Checkout Drawer Options
  const [pickupMode, setPickupMode] = useState<"Take Away" | "At our place">("Take Away");
  const [selectedPayment, setSelectedPayment] = useState<"coffeeCard" | "card" | "paypal" | "cod">("card");
  const [isOfferActive, setIsOfferActive] = useState<boolean>(false);

  // Product Customization Modal State (Matching Screenshot 3 & 4)
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);
  const [frapinomixOption, setFrapinomixOption] = useState<string>("Standard");
  const [whippedCreamOption, setWhippedCreamOption] = useState<string>("Standard");
  const [extraWhippedCream, setExtraWhippedCream] = useState<boolean>(false);
  const [extraShot, setExtraShot] = useState<boolean>(false);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(`eh_cart_${branchId}`, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, branchId]);

  // Handle subcategory click for a specific category
  const handleSubCategorySelect = (categoryName: string, subCategoryName: string) => {
    setActiveSubCategories((prev) => ({
      ...prev,
      [categoryName]: subCategoryName,
    }));
  };

  // Open Product Modal
  const openProductModal = (product: ProductItem) => {
    setModalProduct(product);
    setModalQty(1);
    setFrapinomixOption("Standard");
    setWhippedCreamOption("Standard");
    setExtraWhippedCream(false);
    setExtraShot(false);
  };

  // Calculate modal item total
  const calculateModalPrice = (basePrice: number) => {
    let total = basePrice;
    if (extraWhippedCream) total += 8;
    if (extraShot) total += 10;
    return total * modalQty;
  };

  // Add customized item from modal to cart
  const handleAddModalToCart = () => {
    if (!modalProduct) return;

    const itemPrice = (calculateModalPrice(modalProduct.price) / modalQty);
    const cartKey = `${modalProduct.id}-${frapinomixOption}-${whippedCreamOption}-${extraWhippedCream}-${extraShot}`;

    setCart((prev) => {
      const existing = prev[cartKey];
      const newQty = existing ? existing.quantity + modalQty : modalQty;
      return {
        ...prev,
        [cartKey]: {
          product: modalProduct,
          quantity: newQty,
          customization: {
            frapinomix: frapinomixOption,
            whippedCream: whippedCreamOption,
            extraWhippedCream,
            extraShot,
            itemTotal: itemPrice,
          },
        },
      };
    });

    message.success(`Added ${modalProduct.name} to order! ☕`);
    setModalProduct(null);
  };

  // Quick add item directly
  const handleQuickAdd = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const cartKey = `${product.id}-Standard-Standard-false-false`;

    setCart((prev) => {
      const existing = prev[cartKey];
      return {
        ...prev,
        [cartKey]: {
          product,
          quantity: existing ? existing.quantity + 1 : 1,
          customization: {
            frapinomix: "Standard",
            whippedCream: "Standard",
            extraWhippedCream: false,
            extraShot: false,
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

  const removeCartItem = (cartKey: string) => {
    setCart((prev) => {
      const nextCart = { ...prev };
      delete nextCart[cartKey];
      return nextCart;
    });
    message.info("Item removed from order");
  };

  // Calculate totals
  const cartEntries = Object.entries(cart);
  const totalCartCount = cartEntries.reduce((sum, [, entry]) => sum + entry.quantity, 0);
  const rawSubtotal = cartEntries.reduce(
    (sum, [, entry]) => sum + entry.customization.itemTotal * entry.quantity,
    0
  );
  const discountAmount = isOfferActive ? Math.round(rawSubtotal * 0.5) : 0;
  const finalTotalPrice = Math.max(0, rawSubtotal - discountAmount);

  // Categories to render: if "All", show all category sections; otherwise show selected category section
  const categoriesToDisplay =
    selectedCategory === "All Menu"
      ? categoryDefinitions
      : categoryDefinitions.filter((c) => c.name === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/order/${branch.id}`}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all border border-gray-200 cursor-pointer active:scale-95"
            >
              <LeftOutlined className="text-[10px]" />
              <span>Back</span>
            </Link>

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#16302b] flex items-center gap-2">
                <span>{selectedCategory === "All Menu" ? "Full Menu Catalog" : selectedCategory}</span>
                <span className="hidden sm:inline-block bg-brand-sage text-[#1e3932] text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  {branch.name}
                </span>
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                {branch.city} • Open until {branch.closingTime}
              </p>
            </div>
          </div>

          {/* Quick Cart Pill indicator in header */}
          {totalCartCount > 0 && (
            <button
              onClick={() => router.push(`/order/${branch.id}/checkout`)}
              className="bg-[#1e3932] hover:bg-primary-hover text-white px-4 py-2 rounded-full font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ShoppingOutlined className="text-sm" />
              <span>View Order ({totalCartCount}) • {finalTotalPrice} SEK</span>
            </button>
          )}
        </div>

        {/* Sticky Category Selection Navigation Bar */}
        <div className="border-t border-gray-100 bg-white px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory("All Menu")}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === "All Menu"
                  ? "bg-[#1e3932] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ⭐ All Menu
            </button>

            {categoryDefinitions.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#1e3932] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Menu Body - Render Category Sections with Subcategory Filters & Horizontal/Grid Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 pb-32 space-y-10">
        {categoriesToDisplay.map((cat) => {
          const activeSub = activeSubCategories[cat.name] || "All";

          // Filter products for this specific category and subcategory
          const categoryProducts = mockProducts.filter((p) => {
            if (p.category !== cat.name) return false;
            if (activeSub === "All") return true;
            return p.subCategory === activeSub;
          });

          return (
            <section key={cat.name} className="space-y-4">
              {/* Category Section Header matching Screenshot 1 & 2 */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedCategory(cat.name)}
                  className="flex items-center gap-2 group text-left cursor-pointer"
                >
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] group-hover:text-[#1e3932] transition-colors">
                    {cat.name}
                  </h2>
                  <RightOutlined className="text-sm text-gray-400 group-hover:text-[#1e3932] group-hover:translate-x-1 transition-all" />
                </button>

                <span className="text-xs font-bold text-gray-400">
                  {categoryProducts.length} items
                </span>
              </div>

              {/* Sub-category Filter Pills for this specific Category (Matching Screenshots 1 & 2) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {cat.subCategories.map((sub) => {
                  const isSubActive = activeSub === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => handleSubCategorySelect(cat.name, sub)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isSubActive
                          ? "bg-brand-sage text-[#1e3932] font-extrabold shadow-2xs"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>

              {/* Product Grid Layout (Matching Screenshot 1 & 2 card styling) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => openProductModal(product)}
                    className="bg-[#fef9f5] rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-md transition-all p-3.5 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
                  >
                    {/* Product Image Container */}
                    <div className="relative h-36 sm:h-44 w-full bg-white rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-3 shadow-2xs">
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 200px, 300px"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Top Left Badge */}
                      {product.badge && (
                        <div className="absolute top-2 left-2 bg-[#1e3932] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="space-y-1 flex-1 flex flex-col justify-between">
                      <h3 className="text-xs sm:text-sm font-extrabold text-[#16302b] line-clamp-2 leading-tight group-hover:text-[#1e3932] transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs sm:text-sm font-extrabold text-gray-700">
                          {product.price} SEK
                        </span>

                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          className="bg-[#1e3932] hover:bg-primary-hover text-white h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
                          title="Add to order"
                        >
                          <PlusOutlined />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Sticky Bottom View Order Floating Bar (Matching Screenshot 4) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto">
          <button
            onClick={() => router.push(`/order/${branch.id}/checkout`)}
            className="w-full bg-[#1e3932] hover:bg-primary-hover text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-emerald-700 transition-all active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white text-[#1e3932] font-black text-xs flex items-center justify-center shadow-xs">
                {totalCartCount}
              </div>
              <span className="font-extrabold text-sm sm:text-base">View Order</span>
            </div>

            <span className="font-extrabold text-sm sm:text-base text-amber-300">
              {finalTotalPrice} SEK
            </span>
          </button>
        </div>
      )}

      {/* ==============================================================================
          MODAL: Product Detail & Customization Screen (Matching Screenshot 3 & 4)
         ============================================================================== */}
      {modalProduct && (
        <Modal
          open={!!modalProduct}
          onCancel={() => setModalProduct(null)}
          footer={null}
          centered
          className="product-customization-modal"
          width={480}
        >
          <div className="space-y-5">
            {/* Top Close Button Pill & Image Header (Matching Screenshot 3) */}
            <div className="relative bg-[#fef9f5] rounded-3xl p-6 flex flex-col items-center justify-center border border-gray-100">
              <button
                onClick={() => setModalProduct(null)}
                className="absolute top-4 left-4 bg-white hover:bg-gray-100 text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200 shadow-2xs cursor-pointer transition-all active:scale-95"
              >
                Close
              </button>

              <div className="relative h-44 w-44">
                <Image
                  src={modalProduct.imageSrc}
                  alt={modalProduct.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Title, Price & Description (Matching Screenshot 3) */}
            <div className="space-y-1.5 px-1">
              <h2 className="text-xl font-extrabold text-[#16302b]">
                {modalProduct.name}
              </h2>
              <p className="text-sm font-extrabold text-gray-700">
                {modalProduct.price} SEK
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-medium pt-1">
                {modalProduct.description}
              </p>
            </div>

            {/* Options Dropdown Accordions (Matching Screenshot 3 & 4) */}
            <div className="space-y-2">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
                <span className="text-xs font-bold text-[#16302b]">Frapinomix</span>
                <select
                  value={frapinomixOption}
                  onChange={(e) => setFrapinomixOption(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-1 text-xs font-bold text-emerald-800 focus:outline-none cursor-pointer"
                >
                  <option value="Standard">Standard</option>
                  <option value="Dairy Free">Dairy Free</option>
                  <option value="Oat Milk">Oat Milk</option>
                </select>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
                <span className="text-xs font-bold text-[#16302b]">Whipped Cream</span>
                <select
                  value={whippedCreamOption}
                  onChange={(e) => setWhippedCreamOption(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-1 text-xs font-bold text-emerald-800 focus:outline-none cursor-pointer"
                >
                  <option value="Standard">Standard</option>
                  <option value="Light Cream">Light Cream</option>
                  <option value="No Cream">No Cream</option>
                </select>
              </div>
            </div>

            {/* "Make it your own" Add-ons Section (Matching Screenshot 3 & 4) */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
                Make it your own
              </h4>

              <div
                onClick={() => setExtraWhippedCream(!extraWhippedCream)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  extraWhippedCream
                    ? "bg-brand-sage border-emerald-400 text-[#1e3932] font-bold"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xs font-bold">Extra whipped cream</span>
                <span className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold">
                  {extraWhippedCream ? "✓" : "+"}
                </span>
              </div>

              <div
                onClick={() => setExtraShot(!extraShot)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  extraShot
                    ? "bg-brand-sage border-emerald-400 text-[#1e3932] font-bold"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xs font-bold">Extra espresso shot (+10 SEK)</span>
                <span className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold">
                  {extraShot ? "✓" : "+"}
                </span>
              </div>
            </div>

            {/* Nutritional Disclaimer Text (Matching Screenshot 3 & 4) */}
            <p className="text-[11px] text-gray-500 font-medium pt-1">
              For nutritional content and ingredients, read more in our{" "}
              <span className="underline cursor-pointer text-[#1e3932]">product information</span>.
            </p>

            {/* Sticky Bottom Actions Bar (Matching Screenshot 3 & 4) */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
              {/* Stepper */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-bold border border-gray-200 cursor-pointer"
                >
                  <MinusOutlined />
                </button>
                <span className="text-sm font-extrabold w-4 text-center">
                  {modalQty}
                </span>
                <button
                  onClick={() => setModalQty((q) => q + 1)}
                  className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-bold border border-gray-200 cursor-pointer"
                >
                  <PlusOutlined />
                </button>
              </div>

              {/* Add CTA */}
              <button
                onClick={handleAddModalToCart}
                className="flex-1 bg-[#1e3932] hover:bg-primary-hover text-white py-3.5 px-6 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-95 text-center"
              >
                Add {calculateModalPrice(modalProduct.price)} SEK
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ==============================================================================
          DRAWER: "Your Order" Checkout View (Matching Screenshot 5)
         ============================================================================== */}
      <Drawer
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        placement="bottom"
        styles={{ wrapper: { maxHeight: "90vh" } }}
        className="rounded-t-3xl"
        title={
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-base text-[#16302b]">
              Your Order
            </span>
            <span className="text-xs text-emerald-800 font-bold bg-brand-sage px-3 py-1 rounded-full">
              {branch.name}
            </span>
          </div>
        }
      >
        <div className="space-y-6 pb-6 max-w-xl mx-auto">
          {/* Pick Up Options Tab Switcher (Matching Screenshot 5) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#16302b] block uppercase tracking-wider">
              Pick Up Options
            </label>

            <div className="bg-gray-100 p-1 rounded-2xl flex items-center">
              <button
                onClick={() => setPickupMode("Take Away")}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  pickupMode === "Take Away"
                    ? "bg-brand-sage text-[#1e3932] shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Take Away
              </button>

              <button
                onClick={() => setPickupMode("At our place")}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  pickupMode === "At our place"
                    ? "bg-brand-sage text-[#1e3932] shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                At our place
              </button>
            </div>
          </div>

          {/* Location & Time Summary (Matching Screenshot 5) */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShopOutlined className="text-emerald-700 text-sm mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#16302b]">Pick up at {branch.name}</p>
                <p className="text-[11px] text-gray-500 font-medium">Open {branch.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 border-t border-gray-200/60 pt-2">
              <ClockCircleOutlined className="text-amber-700 text-sm mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#16302b]">Estimated Pickup</p>
                <p className="text-[11px] text-amber-800 font-medium">
                  We have taken our last order for the day if closed, otherwise ready in ~10 mins.
                </p>
              </div>
            </div>
          </div>

          {/* Products List with ... dropdown (Matching Screenshot 5) */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
              Products
            </h4>

            {cartEntries.map(([cartKey, entry]) => {
              const dropdownItems: MenuProps["items"] = [
                {
                  key: "modify",
                  label: "Modify Customizations",
                  onClick: () => {
                    setModalProduct(entry.product);
                    setIsCartDrawerOpen(false);
                  },
                },
                {
                  key: "remove",
                  label: "Remove Item",
                  danger: true,
                  onClick: () => removeCartItem(cartKey),
                },
              ];

              return (
                <div
                  key={cartKey}
                  className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <h5 className="text-xs sm:text-sm font-extrabold text-[#16302b]">
                      {entry.product.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {entry.customization.frapinomix} • {entry.customization.whippedCream}
                      {entry.customization.extraWhippedCream ? " • Extra Cream" : ""}
                    </p>
                    <p className="text-xs font-extrabold text-[#1e3932]">
                      {entry.customization.itemTotal} SEK × {entry.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-gray-200">
                      <button
                        onClick={() => updateCartQuantity(cartKey, -1)}
                        className="h-6 w-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-xs cursor-pointer"
                      >
                        <MinusOutlined />
                      </button>
                      <span className="text-xs font-bold px-1">{entry.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(cartKey, 1)}
                        className="h-6 w-6 rounded-full bg-[#1e3932] text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                      >
                        <PlusOutlined />
                      </button>
                    </div>

                    <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                      <button className="text-gray-500 hover:text-gray-800 p-1 cursor-pointer">
                        <MoreOutlined className="text-lg" />
                      </button>
                    </Dropdown>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expresso Offers Section (Matching Screenshot 5) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
                Expresso Offers
              </h4>
              <span className="text-xs text-gray-400 font-bold">1 of 5</span>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-3 shadow-xs flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="bg-emerald-100 text-[#1e3932] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  ✓ Offer
                </span>
                <h5 className="text-xs sm:text-sm font-extrabold text-[#16302b]">
                  50% off your favourite drink from the menu!
                </h5>
                <p className="text-[11px] text-gray-400 font-medium">Expires in 25 days</p>
              </div>

              <button
                onClick={() => {
                  setIsOfferActive(!isOfferActive);
                  message.success(isOfferActive ? "Offer deactivated" : "50% Discount Activated! 🎉");
                }}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  isOfferActive
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-[#1e3932] text-white hover:bg-primary-hover shadow-xs"
                }`}
              >
                {isOfferActive ? "Active ✓" : "Activate"}
              </button>
            </div>
          </div>

          {/* Payment Summary (Matching Screenshot 5) */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <h4 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
              To Pay
            </h4>

            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>Ordering</span>
              <span>{rawSubtotal.toFixed(2)} SEK</span>
            </div>

            {isOfferActive && (
              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span>Discount (50% Off Offer)</span>
                <span>-{discountAmount.toFixed(2)} SEK</span>
              </div>
            )}

            <div className="flex justify-between text-sm font-extrabold text-[#16302b] pt-1 border-t border-gray-100">
              <span>In Total</span>
              <span className="text-[#1e3932] text-base">{finalTotalPrice.toFixed(2)} SEK</span>
            </div>
          </div>

          {/* Payment Method Selector (Matching Screenshot 5) */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <h4 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
              Payment Method
            </h4>

            <div className="space-y-2 text-xs font-bold text-gray-800">
              {/* Coffee Card Option */}
              <div
                onClick={() => setSelectedPayment("coffeeCard")}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === "coffeeCard"
                    ? "bg-brand-sage border-emerald-400 text-[#1e3932]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div>
                  <span className="block font-bold">Coffee Card (0 SEK)</span>
                  <span className="text-[11px] text-emerald-700 underline font-semibold">Top Up</span>
                </div>
                <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === "coffeeCard" ? "border-[#1e3932] bg-[#1e3932]" : "border-gray-300"}`} />
              </div>

              {/* Payment Card Option */}
              <div
                onClick={() => setSelectedPayment("card")}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === "card"
                    ? "bg-brand-sage border-emerald-400 text-[#1e3932]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>Payment Card (Visa / Mastercard)</span>
                <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === "card" ? "border-[#1e3932] bg-[#1e3932]" : "border-gray-300"}`} />
              </div>

              {/* Paypal Option */}
              <div
                onClick={() => setSelectedPayment("paypal")}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === "paypal"
                    ? "bg-brand-sage border-emerald-400 text-[#1e3932]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>PayPal</span>
                <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === "paypal" ? "border-[#1e3932] bg-[#1e3932]" : "border-gray-300"}`} />
              </div>

              {/* Cash On Delivery Option */}
              <div
                onClick={() => setSelectedPayment("cod")}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === "cod"
                    ? "bg-brand-sage border-emerald-400 text-[#1e3932]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>Pay at Counter / Cash</span>
                <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === "cod" ? "border-[#1e3932] bg-[#1e3932]" : "border-gray-300"}`} />
              </div>
            </div>
          </div>

          {/* Sticky Bottom Final Order Button (Matching Screenshot 5) */}
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
            className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-4 rounded-full font-extrabold text-sm sm:text-base shadow-lg transition-all cursor-pointer active:scale-98 text-center flex items-center justify-between px-6"
          >
            <span>Pay and place order</span>
            <span>{finalTotalPrice.toFixed(2)} SEK</span>
          </button>
        </div>
      </Drawer>
    </div>
  );
}
