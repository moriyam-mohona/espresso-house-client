"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CloseOutlined,
  LeftOutlined,
  SearchOutlined,
  CompassOutlined,
  InfoCircleOutlined,
  RightOutlined,
  PlusOutlined,
  ShoppingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { App, Input } from "antd";
import { ROUTES } from "@/constants/routes";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  distance: string;
  hours: string;
  lat: number;
  lng: number;
  amenities: string[];
}

const mockBranches: Branch[] = [
  {
    id: "br-1",
    name: "Isomyy",
    address: "Shopping centre Iso Myy, Kauppakatu 26",
    city: "80100 Joensuu",
    country: "Finland",
    distance: "1.2 km",
    hours: "09:00 - 19:00",
    lat: 62.601,
    lng: 29.763,
    amenities: ["Wifi", "Child-Friendly", "Express Checkout"],
  },
  {
    id: "br-2",
    name: "Iso Kristiina",
    address: "Kaivokatu 5 B",
    city: "53100 Lappeenranta",
    country: "Finland",
    distance: "3.5 km",
    hours: "08:00 - 19:30",
    lat: 61.058,
    lng: 28.188,
    amenities: ["Wifi", "Outdoor Seating", "Express Checkout"],
  },
  {
    id: "br-3",
    name: "Pasaati",
    address: "Keskuskatu 10",
    city: "48100 Kotka",
    country: "Finland",
    distance: "5.8 km",
    hours: "09:00 - 20:00",
    lat: 60.466,
    lng: 26.946,
    amenities: ["Wifi", "Child-Friendly"],
  },
  {
    id: "br-4",
    name: "Espresso Club Sergelstorg",
    address: "Sergelstorg 14",
    city: "111 57 Stockholm",
    country: "Sweden",
    distance: "0.8 km",
    hours: "07:00 - 21:00",
    lat: 59.332,
    lng: 18.064,
    amenities: ["Wifi", "Child-Friendly", "Express Checkout"],
  },
  {
    id: "br-5",
    name: "Espresso Club Drottninggatan",
    address: "Drottninggatan 71",
    city: "111 36 Stockholm",
    country: "Sweden",
    distance: "1.4 km",
    hours: "07:30 - 20:30",
    lat: 59.336,
    lng: 18.059,
    amenities: ["Wifi", "Express Checkout"],
  },
];

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  imageSrc: string;
}

const mockProducts: ProductItem[] = [
  {
    id: "p1",
    name: "Peach Please Frapino",
    price: 78,
    category: "Barista's Choice",
    subCategory: "Seasonal Favourites",
    imageSrc: "/frapino_passion.png",
  },
  {
    id: "p2",
    name: "Iced Salted Caramel Cold Brew",
    price: 65,
    category: "Barista's Choice",
    subCategory: "Seasonal Favourites",
    imageSrc: "/iced_offer.png",
  },
  {
    id: "p3",
    name: "Peach Please Frapino & Cinnamon Roll",
    price: 95,
    category: "App deals",
    subCategory: "Combos",
    imageSrc: "/frapino_passion.png",
  },
  {
    id: "p4",
    name: "Double Espresso Shot & Croissant",
    price: 58,
    category: "App deals",
    subCategory: "Combos",
    imageSrc: "/espresso_shot.png",
  },
  {
    id: "p5",
    name: "Peach Please Frapino",
    price: 78,
    category: "Cold drinks",
    subCategory: "Drink Of The Month",
    imageSrc: "/frapino_passion.png",
  },
  {
    id: "p6",
    name: "Passion Fruit Refresher",
    price: 68,
    category: "Cold drinks",
    subCategory: "Drink Of The Month",
    imageSrc: "/iced_offer.png",
  },
];

export default function OrderPage() {
  const router = useRouter();
  const { message } = App.useApp();

  // Page Step: "map-select" | "branch-detail" | "menu"
  const [step, setStep] = useState<"map-select" | "branch-detail" | "menu">("map-select");
  const [branchTab, setBranchTab] = useState<"nearby" | "latest">("nearby");
  const [selectedBranch, setSelectedBranch] = useState<Branch>(mockBranches[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Menu Screen State
  const [activeCategory, setActiveCategory] = useState<string>("Barista's Choice");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredBranches = mockBranches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGetLocation = () => {
    setIsLocating(true);
    message.loading({ content: "Getting your current location...", key: "loc" });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          message.success({ content: "📍 Location found! Showing nearest coffee shops.", key: "loc" });
        },
        () => {
          setIsLocating(false);
          message.success({ content: "📍 Located: Stockholm Center (Mock Coordinates).", key: "loc" });
        }
      );
    } else {
      setIsLocating(false);
      message.success({ content: "📍 Located: Stockholm Center.", key: "loc" });
    }
  };

  const handleSelectBranch = (branch: Branch, targetStep: "branch-detail" | "menu") => {
    setSelectedBranch(branch);
    setStep(targetStep);
  };

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    message.success("Added item to order!");
  };

  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = mockProducts.find((item) => item.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* ==============================================================================
          SCREEN 1: Select Coffee Shop (Map + Location Drawer matching Screenshot 1)
         ============================================================================== */}
      {step === "map-select" && (
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Consistent Top Header Bar matching other pages */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 shadow-2xs">
            <div className="mx-auto max-w-md md:max-w-7xl px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => router.push(ROUTES.HOME)}
                className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer border border-gray-200/80"
              >
                <CloseOutlined className="text-sm" />
              </button>

              <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
                Select coffee shop
              </h1>

              <div className="w-9" />
            </div>
          </header>

          {/* Main Layout Container matching max-w-7xl margin alignments */}
          <main className="flex-1 max-w-md md:max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 pb-12">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-gray-200 h-[calc(100vh-140px)] min-h-[560px] flex flex-col">
              {/* Interactive SVG Map Area */}
              <div className="relative flex-1 bg-[#d0e3ec] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85"
                  style={{
                    backgroundImage: "radial-gradient(#b8d4e3 2px, transparent 2px)",
                    backgroundSize: "32px 32px",
                  }}
                >
                  <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,200 Q 150,120 300,220 T 600,180 T 900,300 L 900,600 L 0,600 Z" fill="#a5cadc" />
                    <path d="M 50,0 Q 200,300 400,200 T 800,500" stroke="#ffffff" strokeWidth="12" fill="none" />
                    <path d="M 0,100 Q 300,100 500,400 T 900,100" stroke="#fcd34d" strokeWidth="8" fill="none" />
                  </svg>
                </div>

                {/* Map Branch Pin Markers */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div
                    className="absolute top-[25%] left-[48%] -translate-x-1/2 pointer-events-auto cursor-pointer"
                    onClick={() => handleSelectBranch(mockBranches[0], "branch-detail")}
                  >
                    <div className="h-9 w-9 rounded-full bg-red-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      C
                    </div>
                  </div>

                  <div
                    className="absolute top-[35%] left-[28%] -translate-x-1/2 pointer-events-auto cursor-pointer"
                    onClick={() => handleSelectBranch(mockBranches[1], "branch-detail")}
                  >
                    <div className="h-9 w-9 rounded-full bg-lime-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      G
                    </div>
                  </div>

                  <div
                    className="absolute top-[50%] left-[22%] -translate-x-1/2 pointer-events-auto cursor-pointer"
                    onClick={() => handleSelectBranch(mockBranches[2], "branch-detail")}
                  >
                    <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      S
                    </div>
                  </div>
                </div>

                {/* Location Compass Target Button */}
                <button
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="absolute bottom-6 border-2 border-white top-auto right-5 z-20 h-12 w-12 rounded-full bg-[#1e3932] text-white flex items-center justify-center text-xl shadow-xl hover:bg-[#2d5349] transition-all cursor-pointer active:scale-95"
                >
                  <CompassOutlined className={isLocating ? "animate-spin" : ""} />
                </button>
              </div>

              {/* Bottom Sheet Location Drawer */}
              <div className="bg-white rounded-t-3xl shadow-2xl p-5 flex flex-col border-t border-gray-200 max-h-[50%] z-20">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 shrink-0" />

                {/* Tab Switcher: Nearby vs Latest */}
                <div className="bg-gray-100 p-1 rounded-full flex items-center mb-3 shrink-0">
                  <button
                    onClick={() => setBranchTab("nearby")}
                    className={`flex-1 py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                      branchTab === "nearby"
                        ? "bg-brand-sage text-[#1e3932] shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Nearby
                  </button>
                  <button
                    onClick={() => setBranchTab("latest")}
                    className={`flex-1 py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                      branchTab === "latest"
                        ? "bg-brand-sage text-[#1e3932] shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Latest
                  </button>
                </div>

                {/* Branch Items Scroll List */}
                <div className="overflow-y-auto space-y-3 flex-1 pr-1 pb-2">
                  {filteredBranches.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/80 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1 pr-2">
                        <h3 className="text-sm font-extrabold text-[#16302b]">
                          {b.name}, {b.address.split(",")[1] || b.address}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {b.distance} {b.hours}
                        </p>
                        <button
                          onClick={() => handleSelectBranch(b, "branch-detail")}
                          className="text-xs font-semibold text-gray-500 hover:text-[#1e3932] flex items-center gap-1 cursor-pointer pt-0.5"
                        >
                          <span>info</span>
                          <InfoCircleOutlined className="text-xs" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleSelectBranch(b, "branch-detail")}
                        className="bg-[#1e3932] hover:bg-primary-hover text-white px-5 py-2 rounded-full font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>

                {/* Search Bar Input */}
                <div className="pt-2 shrink-0">
                  <Input
                    prefix={<SearchOutlined className="text-gray-400 mr-1" />}
                    placeholder="Search for Coffee Shop"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-full py-2.5 px-4 bg-gray-100 border-none text-sm"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ==============================================================================
          SCREEN 2: Coffee Shop Branch Detail View (Exact Match to Screenshot 2)
         ============================================================================== */}
      {step === "branch-detail" && (
        <div className="flex-1 flex flex-col justify-between">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 shadow-2xs">
            <div className="mx-auto max-w-md md:max-w-7xl px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setStep("map-select")}
                className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer border border-gray-200/80"
              >
                <CloseOutlined className="text-sm" />
              </button>

              <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
                {selectedBranch.name}
              </h1>

              <div className="w-9" />
            </div>
          </header>

          {/* Main Layout Container matching max-w-7xl */}
          <main className="flex-1 max-w-md md:max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 pb-28">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs">
              {/* Header Map Graphic Preview */}
              <div className="relative h-48 sm:h-64 w-full bg-[#d0e3ec] overflow-hidden flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-base shadow-xl border-2 border-white animate-bounce">
                  C
                </div>
              </div>

              {/* Address & Hours Details Area */}
              <div className="p-6 md:p-8 space-y-6 max-w-3xl">
                {/* Branch Title & Full Address */}
                <div className="space-y-2 border-b border-gray-200 pb-5">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b]">
                    {selectedBranch.name}
                  </h2>
                  <div className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    <p>{selectedBranch.address}</p>
                    <p>{selectedBranch.city}</p>
                    <p>{selectedBranch.country}</p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://maps.apple.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      <span>Open in Apple Maps</span>
                      <RightOutlined className="text-[10px]" />
                    </a>
                  </div>
                </div>

                {/* Opening Hours Table */}
                <div className="space-y-3 border-b border-gray-200 pb-5">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#16302b]">
                    Opening Hours
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    <div className="flex justify-between max-w-md">
                      <span>Monday - Friday</span>
                      <span className="font-bold">{selectedBranch.hours}</span>
                    </div>
                    <div className="flex justify-between max-w-md">
                      <span>Saturday</span>
                      <span className="font-bold">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between max-w-md">
                      <span>Sunday</span>
                      <span className="font-bold">11:00 - 17:00</span>
                    </div>
                  </div>
                </div>

                {/* Information / Amenities */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#16302b]">
                    Information
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    {selectedBranch.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircleOutlined className="text-emerald-700 text-xs" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom Fixed CTA Button Container aligned with max-w-7xl */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 border-t border-gray-200 z-30">
            <div className="max-w-md md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setStep("menu")}
                className="w-full max-w-md md:max-w-xl mx-auto block bg-[#1e3932] hover:bg-primary-hover text-white py-4 rounded-full font-bold text-base transition-all shadow-md active:scale-98 cursor-pointer text-center"
              >
                Order Here
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================================
          SCREEN 3: Product List Menu Page (Exact Match to Screenshot 3)
         ============================================================================== */}
      {step === "menu" && (
        <div className="flex-1 flex flex-col justify-between">
          {/* Sticky Header Bar matching Screenshot 3 */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-2xs">
            <div className="mx-auto max-w-md md:max-w-7xl px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setStep("branch-detail")}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-all border border-gray-200/60 cursor-pointer"
              >
                <LeftOutlined className="text-xs" />
                <span>Back</span>
              </button>

              <div className="text-center">
                <h1 className="text-sm sm:text-base font-extrabold text-[#16302b] leading-tight">
                  {selectedBranch.name}
                </h1>
                <p className="text-[11px] text-gray-500 font-medium">
                  Open {selectedBranch.hours}
                </p>
              </div>

              <div className="w-16" />
            </div>

            {/* Horizontal Scroll Category Navigation Tabs */}
            <div className="mx-auto max-w-md md:max-w-7xl px-4 flex items-center gap-4 overflow-x-auto pt-3 border-t border-gray-100 mt-1 no-scrollbar">
              <button className="text-gray-500 hover:text-gray-800 px-1 cursor-pointer">
                <SearchOutlined className="text-base" />
              </button>

              {["Barista's Choice", "App deals", "Cold drinks", "Hot drinks", "Bakery"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs sm:text-sm font-extrabold pb-2 whitespace-nowrap transition-all cursor-pointer border-b-2 ${
                    activeCategory === cat
                      ? "text-[#1e3932] border-[#1e3932]"
                      : "text-gray-500 border-transparent hover:text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          {/* Menu Catalog Body Content aligned with max-w-7xl responsive grid */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-md md:max-w-7xl mx-auto w-full pb-28 space-y-8">
            {/* Section 1: Barista's Choice */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#16302b]">
                  Barista&apos;s Choice
                </h2>
                <RightOutlined className="text-xs text-gray-400" />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-brand-sage text-[#1e3932] text-xs font-extrabold px-3.5 py-1 rounded-full">
                  All
                </span>
                <span className="text-xs font-semibold text-gray-600 px-3 py-1">
                  Seasonal Favourites
                </span>
              </div>

              {/* Product Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mockProducts
                  .filter((p) => p.category === "Barista's Choice")
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md transition-all p-3 flex flex-col justify-between group"
                    >
                      <div className="relative h-32 sm:h-36 w-full bg-[#fef9f5] rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-3">
                        <Image
                          src={product.imageSrc}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 200px, 300px"
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs sm:text-sm font-extrabold text-[#16302b] line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-gray-700">
                            {product.price} SEK
                          </span>
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-[#1e3932] hover:bg-primary-hover text-white h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            <PlusOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Section 2: App Deals */}
            <div className="space-y-4 pt-4 border-t border-gray-200/70">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#16302b]">
                  App Deals
                </h2>
                <RightOutlined className="text-xs text-gray-400" />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-brand-sage text-[#1e3932] text-xs font-extrabold px-3.5 py-1 rounded-full">
                  All
                </span>
                <span className="text-xs font-semibold text-gray-600 px-3 py-1">
                  Combos
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mockProducts
                  .filter((p) => p.category === "App deals")
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md transition-all p-3 flex flex-col justify-between group"
                    >
                      <div className="relative h-32 sm:h-36 w-full bg-[#fef9f5] rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-3">
                        <Image
                          src={product.imageSrc}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 200px, 300px"
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs sm:text-sm font-extrabold text-[#16302b] line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-gray-700">
                            {product.price} SEK
                          </span>
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-[#1e3932] hover:bg-primary-hover text-white h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            <PlusOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Section 3: Cold Drinks */}
            <div className="space-y-4 pt-4 border-t border-gray-200/70">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#16302b]">
                  Cold Drinks
                </h2>
                <RightOutlined className="text-xs text-gray-400" />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-brand-sage text-[#1e3932] text-xs font-extrabold px-3.5 py-1 rounded-full">
                  All
                </span>
                <span className="text-xs font-semibold text-gray-600 px-3 py-1">
                  Drink Of The Month
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mockProducts
                  .filter((p) => p.category === "Cold drinks")
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md transition-all p-3 flex flex-col justify-between group"
                    >
                      <div className="relative h-32 sm:h-36 w-full bg-[#eaf4fb] rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-3">
                        <Image
                          src={product.imageSrc}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 200px, 300px"
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs sm:text-sm font-extrabold text-[#16302b] line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-gray-700">
                            {product.price} SEK
                          </span>
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-[#1e3932] hover:bg-primary-hover text-white h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
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

          {/* Floating Cart Bar at Bottom when Items Added */}
          {totalCartCount > 0 && (
            <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md md:max-w-7xl mx-auto px-4">
              <div className="bg-[#1e3932] text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-emerald-700 max-w-xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center text-lg font-bold">
                    <ShoppingOutlined />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold">
                      {totalCartCount} {totalCartCount === 1 ? "Item" : "Items"}
                    </h4>
                    <p className="text-xs text-amber-300 font-bold">
                      Total: {totalCartPrice} SEK
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => message.success("🎉 Pre-order sent to barista! Ready for pickup in 10 mins.")}
                  className="bg-white hover:bg-gray-100 text-[#1e3932] px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <span>Checkout</span>
                  <RightOutlined className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
