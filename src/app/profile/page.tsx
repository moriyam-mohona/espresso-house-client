"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LeftOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  LockOutlined,
  BellOutlined,
  FileTextOutlined,
  QrcodeOutlined,
  StarFilled,
  RightOutlined,
  LogoutOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { App, Input, Switch, Modal, Checkbox } from "antd";
import { ROUTES } from "@/constants/routes";

export default function ProfilePage() {
  const router = useRouter();
  const { message } = App.useApp();

  // Profile Form State
  const [fullName, setFullName] = useState<string>("Sofia Lindqvist");
  const [email, setEmail] = useState<string>("sofia.lindqvist@example.com");
  const [phone, setPhone] = useState<string>("+46 70 123 4567");
  const [preferredShop, setPreferredShop] = useState<string>("Espresso Club Sergelstorg");
  const [birthday, setBirthday] = useState<string>("14 June");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Preference Toggles
  const [emailReceipts, setEmailReceipts] = useState<boolean>(true);
  const [pushOffers, setPushOffers] = useState<boolean>(true);
  const [newsletter, setNewsletter] = useState<boolean>(false);

  // Change Password Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Delete Account Modal State
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState<boolean>(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
    message.success("Profile details updated successfully!");
  };

  const handleSignOut = () => {
    message.success("Signed out successfully");
    router.push(ROUTES.HOME);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match!");
      return;
    }

    if (newPassword.length < 6) {
      message.error("New password must be at least 6 characters long");
      return;
    }

    // Log the password values to console
    console.log("🔐 Change Password Submitted:", {
      oldPassword,
      newPassword,
      confirmPassword,
    });

    message.success("🔑 Password changed successfully!");

    // Reset fields & close modal
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangePasswordOpen(false);
  };

  const handleDeleteAccountSubmit = () => {
    if (!deleteConfirmed) {
      message.error("Please confirm that you understand the terms before proceeding.");
      return;
    }

    console.log("🗑️ Account Deletion Requested for:", email);
    message.success("Your account deactivation request has been submitted to support.");
    setIsDeleteAccountOpen(false);
    setDeleteConfirmed(false);
    router.push(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      {/* Top Header Bar matching site design system */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-1.5 rounded-full shadow-2xs transition-all border border-gray-200/60 cursor-pointer active:scale-95"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
            My Profile & Account
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Responsive Layout Container */}
      <main className="flex-1 max-w-md md:max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
        {/* Profile Hero Header Card */}
        <div className="bg-linear-to-r from-[#1e3932] via-[#24473e] to-[#2c5349] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 z-10">
            {/* Avatar Circle */}
            <div className="relative h-20 w-20 rounded-full bg-brand-sage text-[#1e3932] flex items-center justify-center font-extrabold text-2xl shadow-lg border-4 border-white/20 shrink-0">
              SL
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-black">{fullName}</h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">{email}</p>
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold px-3 py-1 rounded-full mt-1">
                <StarFilled className="text-amber-300 text-xs" />
                <span>Gold Fika Member</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="z-10 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all border border-white/20 cursor-pointer flex items-center gap-2"
          >
            <EditOutlined />
            <span>{isEditing ? "Done Editing" : "Edit Profile"}</span>
          </button>
        </div>

        {/* Responsive 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==============================================================================
              LEFT COLUMN: Personal Details & Preferences (lg:col-span-7)
             ============================================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Personal Details Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-extrabold text-[#16302b] flex items-center gap-2">
                  <UserOutlined className="text-emerald-700" />
                  <span>Personal Information</span>
                </h3>

                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckOutlined />
                    <span>Save</span>
                  </button>
                )}
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-xl py-2 px-3 text-sm"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-xl text-gray-900 font-semibold border border-gray-200/60">
                      {fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  {isEditing ? (
                    <Input
                      prefix={<MailOutlined className="text-gray-400 mr-1" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl py-2 px-3 text-sm"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-xl text-gray-900 font-semibold border border-gray-200/60 flex items-center gap-2">
                      <MailOutlined className="text-gray-400" />
                      <span>{email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  {isEditing ? (
                    <Input
                      prefix={<PhoneOutlined className="text-gray-400 mr-1" />}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl py-2 px-3 text-sm"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-xl text-gray-900 font-semibold border border-gray-200/60 flex items-center gap-2">
                      <PhoneOutlined className="text-gray-400" />
                      <span>{phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Preferred Coffee Shop</label>
                  {isEditing ? (
                    <Input
                      prefix={<ShopOutlined className="text-gray-400 mr-1" />}
                      value={preferredShop}
                      onChange={(e) => setPreferredShop(e.target.value)}
                      className="rounded-xl py-2 px-3 text-sm"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-xl text-gray-900 font-semibold border border-gray-200/60 flex items-center gap-2">
                      <ShopOutlined className="text-gray-400" />
                      <span>{preferredShop}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Birthday (For Birthday Treat Coupon)</label>
                  {isEditing ? (
                    <Input
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="rounded-xl py-2 px-3 text-sm"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-xl text-gray-900 font-semibold border border-gray-200/60">
                      {birthday}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Notification & Communication Preferences */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-extrabold text-[#16302b] flex items-center gap-2 border-b border-gray-100 pb-3">
                <BellOutlined className="text-emerald-700" />
                <span>Account Preferences</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2">
                  <div>
                    <span className="block font-extrabold text-[#16302b]">Digital Email Receipts</span>
                    <span className="text-xs text-gray-500">Automatically send PDF receipts to your email</span>
                  </div>
                  <Switch checked={emailReceipts} onChange={setEmailReceipts} />
                </div>

                <div className="flex items-center justify-between p-2 border-t border-gray-100">
                  <div>
                    <span className="block font-extrabold text-[#16302b]">Push Notifications for Offers</span>
                    <span className="text-xs text-gray-500 font-medium">Get notified when new Expresso coupons drop</span>
                  </div>
                  <Switch checked={pushOffers} onChange={setPushOffers} />
                </div>

                <div className="flex items-center justify-between p-2 border-t border-gray-100">
                  <div>
                    <span className="block font-extrabold text-[#16302b]">Promotional Newsletter</span>
                    <span className="text-xs text-gray-500 font-medium">Receive seasonal drink updates and news</span>
                  </div>
                  <Switch checked={newsletter} onChange={setNewsletter} />
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================================
              RIGHT COLUMN: Quick Actions & Account Shortcuts (lg:col-span-5)
             ============================================================================== */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* Quick Shortcuts */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
                Quick Shortcuts
              </h3>

              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs p-3 space-y-2">
                <Link
                  href={ROUTES.RECEIPTS}
                  className="p-3.5 rounded-2xl hover:bg-gray-50 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-brand-sage text-[#1e3932] flex items-center justify-center">
                      <FileTextOutlined />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-extrabold text-[#16302b]">Order History & Receipts</span>
                      <span className="text-[11px] text-gray-500">View past orders & invoices</span>
                    </div>
                  </div>
                  <RightOutlined className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href={ROUTES.MY_ID}
                  className="p-3.5 rounded-2xl hover:bg-gray-50 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-brand-sage text-[#1e3932] flex items-center justify-center">
                      <QrcodeOutlined />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-extrabold text-[#16302b]">Member QR ID</span>
                      <span className="text-[11px] text-gray-500">Show code to barista</span>
                    </div>
                  </div>
                  <RightOutlined className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href={ROUTES.REWARDS}
                  className="p-3.5 rounded-2xl hover:bg-gray-50 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                      <StarFilled />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-extrabold text-[#16302b]">Fika Points & Rewards</span>
                      <span className="text-[11px] text-gray-500">142 points available</span>
                    </div>
                  </div>
                  <RightOutlined className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
                Security & Account
              </h3>

              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs p-3 space-y-2">
                <button
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="w-full p-3.5 rounded-2xl hover:bg-gray-50 flex items-center justify-between transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center">
                      <LockOutlined />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-extrabold text-[#16302b]">Change Password</span>
                      <span className="text-[11px] text-gray-500">Update security credential</span>
                    </div>
                  </div>
                  <RightOutlined className="text-xs text-gray-400" />
                </button>

                <button
                  onClick={() => setIsDeleteAccountOpen(true)}
                  className="w-full p-3.5 rounded-2xl hover:bg-red-50 text-red-600 flex items-center justify-between transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                      <DeleteOutlined />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-extrabold">Delete Account</span>
                      <span className="text-[11px] text-red-400">Permanently delete account & data</span>
                    </div>
                  </div>
                  <RightOutlined className="text-xs text-red-400" />
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full p-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 flex items-center justify-between transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-gray-200 text-gray-700 flex items-center justify-center">
                      <LogoutOutlined />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold">Sign Out</span>
                  </div>
                  <RightOutlined className="text-xs text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==============================================================================
          MODAL 1: Change Password Form Modal
         ============================================================================== */}
      <Modal
        open={isChangePasswordOpen}
        onCancel={() => setIsChangePasswordOpen(false)}
        footer={null}
        centered
        width={420}
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="p-4 space-y-5">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto" />

          <div className="text-center space-y-1">
            <h3 className="text-lg font-extrabold text-[#16302b]">
              Change Password
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Enter your current password and choose a new password.
            </p>
          </div>

          <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Old Password</label>
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-1" />}
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="rounded-xl py-2.5 px-3"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">New Password</label>
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-1" />}
                placeholder="Enter new password (min. 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-xl py-2.5 px-3"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-1" />}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-xl py-2.5 px-3"
                required
              />
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-3.5 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-95"
              >
                Update Password
              </button>

              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(false)}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-full font-bold text-xs sm:text-sm border border-gray-300 transition-all cursor-pointer active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ==============================================================================
          MODAL 2: Delete Account Terms & Confirmation Modal
         ============================================================================== */}
      <Modal
        open={isDeleteAccountOpen}
        onCancel={() => setIsDeleteAccountOpen(false)}
        footer={null}
        centered
        width={460}
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-red-100">
            {modalContent}
          </div>
        )}
      >
        <div className="p-4 space-y-5">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto" />

          {/* Modal Header */}
          <div className="text-center space-y-1">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl mb-1">
              <WarningOutlined />
            </div>
            <h3 className="text-lg font-extrabold text-[#16302b]">
              Delete Account
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              Please read the terms below carefully before proceeding.
            </p>
          </div>

          {/* Terms & Conditions Cards */}
          <div className="space-y-3 text-xs leading-relaxed text-gray-700">
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/80 text-amber-900 space-y-1 font-medium">
              <p className="font-bold text-amber-950 flex items-center gap-1.5">
                <WarningOutlined className="text-amber-600" />
                <span>Coffee Card & Subscription Balance Warning</span>
              </p>
              <p>
                Please note that the balance on your coffee card will be lost unless you first contact support to get a physical card. If you have an ongoing subscription when deleting your account, the subscription will be cancelled and you will not get a refund.
              </p>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 text-gray-700 space-y-1 font-medium">
              <p className="font-bold text-gray-900">
                Deactivation & Permanent Removal
              </p>
              <p>
                If you proceed, your account will be deactivated immediately and permanently deleted after a review of our service team. And remember, you are most welcome back if you change your mind!
              </p>
            </div>
          </div>

          {/* Checkbox Confirmation */}
          <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-200/80">
            <Checkbox
              checked={deleteConfirmed}
              onChange={(e) => setDeleteConfirmed(e.target.checked)}
              className="text-xs font-bold text-gray-800 flex items-start"
            >
              <span>I have read and agree to the account deletion terms.</span>
            </Checkbox>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleDeleteAccountSubmit}
              disabled={!deleteConfirmed}
              className={`w-full py-3.5 rounded-full font-extrabold text-sm transition-all cursor-pointer active:scale-95 shadow-md ${
                deleteConfirmed
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Permanently Delete Account
            </button>

            <button
              onClick={() => setIsDeleteAccountOpen(false)}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-full font-bold text-xs sm:text-sm border border-gray-300 transition-all cursor-pointer active:scale-95"
            >
              Keep My Account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
