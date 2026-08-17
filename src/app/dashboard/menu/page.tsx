"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlusOutlined,
  SearchOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { App, Input, Switch, Modal, Select } from "antd";
import { mockProducts, ProductItem } from "@/data/products";

export default function DashboardMenuPage() {
  const { message } = App.useApp();
  const [products, setProducts] = useState<ProductItem[]>(mockProducts);
  const [stockStatus, setStockStatus] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
    p3: true,
    p4: true,
    p5: true,
    p6: true,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number>(65);
  const [newCategory, setNewCategory] = useState<string>("Barista's Choice");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleToggleStock = (productId: string, currentStatus: boolean) => {
    setStockStatus((prev) => ({
      ...prev,
      [productId]: !currentStatus,
    }));
    message.success(
      `Product updated: Marked as ${!currentStatus ? "IN STOCK" : "OUT OF STOCK"}`
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      message.error("Please enter a product title");
      return;
    }

    const newItem: ProductItem = {
      id: `p-${Date.now()}`,
      name: newTitle,
      description: "Freshly crafted coffee shop beverage.",
      price: Number(newPrice),
      category: newCategory,
      subCategory: "New Release",
      imageSrc: "/frapino_passion.png",
    };

    setProducts((prev) => [newItem, ...prev]);
    setStockStatus((prev) => ({ ...prev, [newItem.id]: true }));
    message.success(`🎉 Added new item "${newTitle}" to menu!`);
    setNewTitle("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
            Menu Catalog & Stock Toggle
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Manage global coffee shop beverages, bakery pricing, and live store availability.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#1e3932] hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusOutlined />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-1" />}
          placeholder="Search product by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full py-2 px-4 bg-gray-50 border-gray-200 text-xs sm:text-sm w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-gray-500">Category:</span>
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-44 text-xs font-bold"
            options={[
              { value: "all", label: "All Categories" },
              { value: "Barista's Choice", label: "Barista's Choice" },
              { value: "App deals", label: "App Deals" },
              { value: "Cold drinks", label: "Cold Drinks" },
            ]}
          />
        </div>
      </div>

      {/* Product Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isAvailable = stockStatus[product.id] ?? true;
          return (
            <div
              key={product.id}
              className={`bg-white rounded-3xl p-5 border shadow-2xs transition-all flex flex-col justify-between space-y-4 ${
                isAvailable ? "border-gray-200" : "border-red-200 bg-red-50/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 rounded-2xl bg-[#fef9f5] overflow-hidden shrink-0 border border-gray-200">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-brand-sage px-2 py-0.5 rounded-full inline-block">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-black text-[#16302b]">{product.name}</h3>
                  <p className="text-xs font-bold text-[#1e3932]">{product.price} SEK</p>
                </div>
              </div>

              {/* Stock Toggle Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-bold">
                <span className={isAvailable ? "text-emerald-700" : "text-red-600 font-extrabold"}>
                  {isAvailable ? "● In Stock (Available)" : "✕ Out of Stock (Disabled)"}
                </span>

                <Switch
                  checked={isAvailable}
                  onChange={() => handleToggleStock(product.id, isAvailable)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Product Modal */}
      <Modal
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        centered
        width={420}
      >
        <div className="p-4 space-y-5">
          <div className="text-center space-y-1">
            <div className="h-12 w-12 rounded-2xl bg-brand-sage text-[#1e3932] flex items-center justify-center mx-auto text-xl mb-1">
              <CoffeeOutlined />
            </div>
            <h3 className="text-lg font-extrabold text-[#16302b]">
              Add New Beverage / Bakery Item
            </h3>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Product Title</label>
              <Input
                placeholder="e.g. Vanilla Cold Brew"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-xl py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Price (SEK)</label>
              <Input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="rounded-xl py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Category</label>
              <Select
                value={newCategory}
                onChange={setNewCategory}
                className="w-full text-sm font-bold"
                options={[
                  { value: "Barista's Choice", label: "Barista's Choice" },
                  { value: "App deals", label: "App Deals" },
                  { value: "Cold drinks", label: "Cold Drinks" },
                  { value: "Hot drinks", label: "Hot Drinks" },
                  { value: "Bakery", label: "Bakery" },
                ]}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-3.5 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              Add to Menu Catalog
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
