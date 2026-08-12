"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "antd";
import { QrcodeOutlined, BarcodeOutlined, SafetyCertificateOutlined, CloseOutlined } from "@ant-design/icons";

interface MyIdModalProps {
  open: boolean;
  onClose: () => void;
  userPoints?: number;
  walletBalance?: number;
}

export const MyIdModal: React.FC<MyIdModalProps> = ({
  open,
  onClose,
  userPoints = 142,
  walletBalance = 24.5,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={<CloseOutlined className="text-white text-base" />}
      modalRender={(modalContent) => (
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#1e3932] text-white max-w-sm mx-auto">
          {modalContent}
        </div>
      )}
    >
      <div className="p-6 text-center text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-primary pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-[#d4a373] relative shrink-0">
              <Image src="/logo.png" alt="Espresso House Logo" fill sizes="32px" className="object-cover" />
            </div>
            <span className="font-extrabold text-lg text-white">My ID & Membership</span>
          </div>
          <span className="bg-primary text-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <SafetyCertificateOutlined className="text-xs" />
            <span>Gold Member</span>
          </span>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-5 rounded-2xl shadow-inner my-4 flex flex-col items-center">
          <div className="relative p-2 bg-white rounded-xl border-2 border-[#1e3932]">
            <QrcodeOutlined className="text-9xl text-[#1e3932]" />
          </div>

          <div className="mt-3 w-full border-t border-dashed border-gray-300 pt-3 flex flex-col items-center">
            <BarcodeOutlined className="text-5xl text-gray-800 tracking-widest" />
            <span className="font-mono text-xs font-bold text-gray-700 tracking-widest mt-1">
              EH-9402-8814-9920
            </span>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-primary/80 p-3 rounded-xl text-center border border-emerald-600/30">
            <span className="text-[11px] text-emerald-200/80 block uppercase tracking-wider font-semibold">
              Loyalty Points
            </span>
            <span className="text-xl font-black text-amber-300 mt-0.5 block">
              {userPoints} pts
            </span>
          </div>

          <div className="bg-primary/80 p-3 rounded-xl text-center border border-emerald-600/30">
            <span className="text-[11px] text-emerald-200/80 block uppercase tracking-wider font-semibold">
              Digital Wallet
            </span>
            <span className="text-xl font-black text-white mt-0.5 block">
              ${walletBalance.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Scanning Instructions */}
        <p className="text-xs text-emerald-100/70 leading-normal">
          Scan this QR code at any Espresso House counter or POS scanner to earn points and redeem active vouchers.
        </p>
      </div>
    </Modal>
  );
};
