"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LeftOutlined,
  InfoCircleOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Modal, message } from "antd";
import { ROUTES } from "@/constants/routes";
import {
  DUMMY_REWARDS,
  DUMMY_POINTS_HISTORY,
  RewardItem,
  PointsHistoryItem,
} from "@/constants/rewards-data";

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [showEarnInfoModal, setShowEarnInfoModal] = useState<boolean>(false);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [history, setHistory] = useState<PointsHistoryItem[]>(DUMMY_POINTS_HISTORY);

  // Toggle user points between 0 and 142 for testing both states easily
  const handleTogglePointsDemo = () => {
    const newPoints = userPoints === 0 ? 142 : 0;
    setUserPoints(newPoints);
    message.info(`Demo Points set to ${newPoints} pts`);
  };

  const handleRedeemReward = (reward: RewardItem) => {
    if (userPoints < reward.pointsCost) {
      message.error(`You need ${reward.pointsCost - userPoints} more Fika Point(s) to redeem this reward.`);
      return;
    }

    const nextPoints = userPoints - reward.pointsCost;
    setUserPoints(nextPoints);

    const newHistoryItem: PointsHistoryItem = {
      id: `hist-${Date.now()}`,
      title: `Redeemed: ${reward.title}`,
      date: "Just now",
      points: -reward.pointsCost,
      type: "redeemed",
    };

    setHistory([newHistoryItem, ...history]);
    setSelectedReward(null);
    message.success(`🎉 Success! Redeemed "${reward.title}" for ${reward.pointsCost} Fika Point(s).`);
  };

  return (
    <div className="min-h-screen bg-[#e8efe6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Top Header Bar matching Screenshot 1 */}
      <header className="sticky top-0 z-30 bg-[#e8efe6] px-4 py-3 border-b border-[#d6e3d3]/80">
        <div className="mx-auto max-w-md md:max-w-4xl flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1e3932] bg-white/70 hover:bg-white px-3 py-1.5 rounded-full transition-all border border-[#d6e3d3]"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-bold text-[#16302b]">
            Expresso House
          </h1>

          <Link
            href={ROUTES.REWARDS_HISTORY}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1e3932] bg-white/70 hover:bg-white px-3 py-1.5 rounded-full transition-all border border-[#d6e3d3]"
          >
            <HistoryOutlined />
            <span>History</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pb-12">
        <div className="mx-auto max-w-md md:max-w-4xl">
          {/* Top Expresso Points Banner matching Screenshot 1 & 2 */}
          <div className="px-5 pt-4 pb-6 flex items-start justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold text-[#16302b] leading-none">
                  {userPoints}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#16302b]">
                  Expresso Points
                </span>
              </div>

              {/* More info link */}
              <button
                onClick={() => setShowEarnInfoModal(true)}
                className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1e3932]/80 hover:text-[#1e3932] transition-colors"
              >
                <span>More info</span>
                <InfoCircleOutlined className="text-xs" />
              </button>
            </div>

            {/* Quick Points Switcher Button for Demo Testing */}
            <button
              onClick={handleTogglePointsDemo}
              className="text-[11px] font-bold bg-[#1e3932] text-white px-3 py-1.5 rounded-full hover:bg-[#2d5349] transition-colors shadow-2xs flex items-center gap-1"
              title="Click to toggle demo points balance"
            >
              <PlusCircleOutlined />
              <span>{userPoints === 0 ? "Set 142 pts" : "Set 0 pts"}</span>
            </button>
          </div>

          {/* Catalog Section Card Container matching Screenshot 1 */}
          <div className="bg-white rounded-t-3xl min-h-[500px] p-5 sm:p-8 shadow-md border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] mb-5 tracking-tight">
              Expresso for you
            </h2>

            {/* Grid of Reward Items matching Screenshot 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {DUMMY_REWARDS.map((reward) => (
                <div
                  key={reward.id}
                  onClick={() => setSelectedReward(reward)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-[#1e3932] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                >
                  {/* Image Container matching Screenshot 1 */}
                  <div className="relative h-36 sm:h-44 w-full bg-[#f4f6f0] overflow-hidden">
                    <Image
                      src={reward.imageSrc}
                      alt={reward.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details matching Screenshot 1 */}
                  <div className="p-3 sm:p-4 bg-white flex-1 flex flex-col justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-[#16302b] leading-snug group-hover:text-[#1e3932] transition-colors">
                      {reward.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#1e3932] mt-1.5">
                      {reward.pointsCost} Fika Point{reward.pointsCost > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ==============================================================================
          MODAL 1: Points Info Bottom Sheet matching Screenshot 2
         ============================================================================== */}
      <Modal
        open={showEarnInfoModal}
        onCancel={() => setShowEarnInfoModal(false)}
        footer={null}
        centered
        closeIcon={null}
        className="rounded-3xl overflow-hidden max-w-md"
      >
        <div className="p-2 sm:p-4 text-[#16302b]">
          {/* Top handle visual */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#16302b] leading-tight mb-5">
            How to earn and redeem Fika Points
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p>
              <strong className="text-black">Shop</strong> For every 50 kr spent on the same receipt, you will get 1 Fika Point.
            </p>

            <p>
              <strong className="text-black">Top up</strong> You will receive points every time you top up money using our in-app service!
            </p>

            <div className="pl-3 border-l-2 border-[#1e3932] text-xs font-semibold text-[#1e3932] space-y-1 my-2">
              <div>300 kr = 6 Fika Points</div>
              <div>500 kr = 10 Fika Points</div>
            </div>

            <p>
              <strong className="text-black">Complete Fika Fun Challenges</strong> You earn Fika points when you complete challenges in the app. Check out our Fika Fun universe on the front page of the app now!
            </p>

            <p>
              <strong className="text-black">Redeem your Fika Points</strong> and claim rewards anytime, anywhere, directly from the app in Fika House.
            </p>

            <p className="text-xs text-gray-500 pt-1 border-t border-gray-100">
              Collected Fika Points are valid for 6 months.
            </p>
          </div>

          <div className="mt-6 pt-2">
            <button
              onClick={() => setShowEarnInfoModal(false)}
              className="w-full bg-[#1e3932] hover:bg-[#2d5349] text-white py-3 rounded-full font-bold text-sm shadow-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* ==============================================================================
          MODAL 2: Reward Detail View matching Screenshot 3
         ============================================================================== */}
      {selectedReward && (
        <Modal
          open={!!selectedReward}
          onCancel={() => setSelectedReward(null)}
          footer={null}
          centered
          closeIcon={<CloseOutlined className="text-gray-500 text-base" />}
          className="rounded-3xl overflow-hidden max-w-md"
        >
          <div className="pt-2 text-[#16302b]">
            {/* Top Card Container matching Screenshot 3 */}
            <div className="bg-[#f9faf6] p-6 rounded-2xl border border-gray-100 relative mb-5 flex flex-col items-center">
              {/* Top Left Logo Header */}
              <div className="w-full flex items-center justify-between mb-2">
                <div className="font-serif-italic text-2xl font-bold text-[#1e3932] tracking-tight leading-none">
                  Expresso <span className="block font-sans font-black text-xs tracking-widest text-[#1e3932] uppercase">CLUB</span>
                </div>
              </div>

              {/* Centered Image */}
              <div className="relative h-44 w-44 rounded-2xl overflow-hidden shadow-xs border border-white my-2">
                <Image
                  src={selectedReward.imageSrc}
                  alt={selectedReward.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Right Points Requirement Pill matching Screenshot 3 */}
              <div className="w-full flex justify-end mt-2">
                {userPoints < selectedReward.pointsCost ? (
                  <span className="border border-red-300 bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-lg">
                    You need more points
                  </span>
                ) : (
                  <span className="border border-emerald-300 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                    <CheckCircleOutlined />
                    <span>Points Available</span>
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Content matching Screenshot 3 */}
            <div className="space-y-3 px-1">
              <h3 className="text-xl font-extrabold text-[#16302b]">
                {selectedReward.title}
              </h3>

              <p className="text-sm font-bold text-gray-800 leading-snug">
                {selectedReward.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {selectedReward.description}
              </p>
            </div>

            {/* Action Button matching Screenshot 3 */}
            <div className="mt-6 pt-2">
              <button
                onClick={() => handleRedeemReward(selectedReward)}
                disabled={userPoints < selectedReward.pointsCost}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xs ${
                  userPoints >= selectedReward.pointsCost
                    ? "bg-[#1e3932] hover:bg-[#2d5349] text-white active:scale-98"
                    : "bg-[#9db2a8] text-white cursor-not-allowed"
                }`}
              >
                Redeem for {selectedReward.pointsCost} Fika Point{selectedReward.pointsCost > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ==============================================================================
          MODAL 3: Points History View
         ============================================================================== */}
      <Modal
        open={showHistoryModal}
        onCancel={() => setShowHistoryModal(false)}
        footer={null}
        centered
        title={<span className="font-extrabold text-[#16302b]">Fika Points History</span>}
        className="rounded-3xl overflow-hidden max-w-md"
      >
        <div className="pt-3 space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-[#16302b]">{item.title}</h4>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <span
                className={`font-black text-sm px-2.5 py-1 rounded-full ${
                  item.points > 0
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {item.points > 0 ? `+${item.points}` : item.points} pts
              </span>
            </div>
          ))}

          <div className="mt-4 pt-2">
            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl font-bold text-xs"
            >
              Close History
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
