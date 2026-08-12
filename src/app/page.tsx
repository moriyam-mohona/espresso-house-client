"use client";

import { useState } from "react";
import {
  Header,
  RewardsBanner,
  ExpressoFun,
  HeroCarousel,
  ExpressoOffers,
  StoreSpotlight,
  MyIdModal,
  BottomNav,
} from "@/components/landing";
import { siteConfig } from "@/config/site";
import { App } from "antd";
import { HeartFilled } from "@ant-design/icons";

export default function LandingPage() {
  const { message } = App.useApp();
  const [myIdOpen, setMyIdOpen] = useState<boolean>(false);
  const userPoints = 142;
  const walletBalance = 24.5;

  const handleOpenMyId = () => {
    setMyIdOpen(true);
  };

  const handleCloseMyId = () => {
    setMyIdOpen(false);
  };

  const handlePreOrder = () => {
    message.success("Opening Espresso House Pre-Order Menu...");
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Top Header */}
      <Header onOpenMyId={handleOpenMyId} userPoints={userPoints} />

      {/* Main Container */}
      <main className="flex-1 pb-16 md:pb-12">
        {/* Section 1: Loyalty/Rewards Banner matching Screenshot 1 */}
        <RewardsBanner />

        {/* Section 2: Expresso Fun (Fika Fun) Challenges matching Screenshot 1 */}
        <ExpressoFun />

        {/* Section 3: Hero Banner Carousel ("Made with passion") matching Screenshot 2 */}
        <HeroCarousel onTryHereClick={handlePreOrder} />

        {/* Section 4: Expresso Offers matching Screenshot 2 */}
        <ExpressoOffers />

        {/* Section 5: Store Spotlight featuring coffee-shop.jpg */}
        <StoreSpotlight onPreOrderClick={handlePreOrder} />
      </main>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-[#16302b] text-emerald-100/80 border-t border-primary-hover py-8 px-6 text-xs">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-brand-sage text-[#1e3932] font-black flex items-center justify-center text-xs">
              EH
            </div>
            <span className="font-bold text-white text-sm">{siteConfig.name}</span>
            <span className="text-emerald-300/60">• Coffee Commerce Platform</span>
          </div>

          <p className="text-center md:text-right">
            © {new Date().getFullYear()} {siteConfig.company.name}. Made with <HeartFilled className="text-red-400" /> for coffee lovers.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation matching Screenshot 2 */}
      <BottomNav onOpenMyId={handleOpenMyId} walletBalance={walletBalance} />

      {/* My ID QR Code Modal */}
      <MyIdModal
        open={myIdOpen}
        onClose={handleCloseMyId}
        userPoints={userPoints}
        walletBalance={walletBalance}
      />
    </div>
  );
}
