"use client";

import React, { useState } from "react";
import { QrcodeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

interface MemberIdCardProps {
  membershipNo?: string;
  pin?: string;
  timestamp?: string;
}

export const MemberIdCard: React.FC<MemberIdCardProps> = ({
  membershipNo = "6554646546465",
  pin = "9201",
  timestamp = "04 Aug 17:00:26",
}) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <>
      <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs relative">
        {/* Header Row matching Screenshots */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-extrabold text-[#16302b]">
            Member ID
          </span>
          <button
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#1e3932] transition-colors"
          >
            <span>info</span>
            <InfoCircleOutlined className="text-xs" />
          </button>
        </div>

        {/* QR & Barcode Container */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center my-1 shadow-2xs">
          {/* QR Code Icon */}
          <div className="relative p-2 bg-white rounded-xl flex flex-col items-center">
            <QrcodeOutlined className="text-8xl sm:text-9xl text-[#16302b]" />
          </div>

          {/* High-Density Barcode Lines */}
          <div className="w-full max-w-xs h-8 mt-3 flex items-center justify-between gap-0.5 opacity-90">
            {[4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 4, 1, 2, 3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 3, 5, 2, 1, 4].map(
              (w, i) => (
                <div
                  key={i}
                  className="h-full bg-[#16302b]"
                  style={{ width: `${w * 2}px` }}
                />
              )
            )}
          </div>
        </div>

        {/* Footer Details Row */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100 text-xs">
          <div>
            <div className="text-gray-500 font-medium">Membership no:</div>
            <div className="font-mono font-bold text-gray-900 tracking-wide text-xs sm:text-sm mt-0.5">
              {membershipNo}
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-500 font-medium">{timestamp}</div>
            <div className="font-mono font-bold text-gray-900 tracking-wide text-xs sm:text-sm mt-0.5">
              Pin:{pin}
            </div>
          </div>
        </div>
      </div>

      {/* Member ID Info Modal matching Screenshot 3 & 4 */}
      <Modal
        open={showInfoModal}
        onCancel={() => setShowInfoModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="p-6 text-center text-[#16302b]">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-extrabold text-[#16302b] text-left mb-2">
            Member ID
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed">
            Scan in our coffee shops to pay with your coffee card, redeem coupons, and collect Fika Points.
          </p>

          <div className="mt-6">
            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full bg-[#1e3932] hover:bg-[#2d5349] text-white py-3 rounded-full font-bold text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
