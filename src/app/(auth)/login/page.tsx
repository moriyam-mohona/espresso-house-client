"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LeftOutlined,
  LockOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { App, Select } from "antd";
import { useAuth } from "@/components/providers";
import { ROUTES } from "@/constants/routes";

function getInitialCountryCode(): string {
  if (typeof window === "undefined") return "+46";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = navigator.language || "";
    if (tz.includes("Helsinki") || lang.startsWith("fi")) return "+358";
    if (tz.includes("Copenhagen") || lang.startsWith("da")) return "+45";
    if (tz.includes("Oslo") || lang.startsWith("nb") || lang.startsWith("nn")) return "+47";
    if (tz.includes("London") || lang.startsWith("en-GB")) return "+44";
    if (tz.includes("New_York") || tz.includes("America") || lang.startsWith("en-US")) return "+1";
    return "+46";
  } catch {
    return "+46";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const { login } = useAuth();

  // Step 1: "phone" | Step 2: "otp"
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState<string>(getInitialCountryCode);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(300);
  const [canResend, setCanResend] = useState<boolean>(false);

  // OTP Timer Countdown
  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = phoneNumber.replace(/\s+/g, "");
    if (!cleanNumber || cleanNumber.length < 6) {
      message.error("Please enter a valid mobile number!");
      return;
    }

    message.success(`📲 Verification code sent to ${countryCode} ${phoneNumber}`);
    setStep("otp");
    setTimer(300);
    setCanResend(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      const nextOtp = [...otpDigits];
      pasted.forEach((char, i) => {
        if (i < 6) nextOtp[i] = char;
      });
      setOtpDigits(nextOtp);
      return;
    }

    const nextOtp = [...otpDigits];
    nextOtp[index] = value;
    setOtpDigits(nextOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleAutoFillDemoOtp = () => {
    setOtpDigits(["1", "2", "3", "4", "5", "6"]);
    message.info("Auto-filled demo code: 123456");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpDigits.join("");
    if (fullOtp.length < 6) {
      message.error("Please enter the full 6-digit OTP code");
      return;
    }

    login({
      phone: `${countryCode} ${phoneNumber}`,
      name: "Sofia Lindqvist",
      role: "customer",
      points: 142,
    });

    message.success(`🎉 Verified! Welcome to Expresso House.`);
    router.push(ROUTES.HOME);
  };

  const handleResendCode = () => {
    setTimer(300);
    setCanResend(false);
    message.success(`New OTP sent to ${countryCode} ${phoneNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#1c1a17] text-white font-sans flex flex-col justify-between selection:bg-[#d48b85] selection:text-[#1c1a17]">
      {/* Main Split Grid */}
      <div className="flex-1 lg:grid lg:grid-cols-12 min-h-screen">
        {/* ==============================================================================
            LEFT SIDE: Cozy Coffee Shop Atmosphere & Branding Banner (Desktop View)
           ============================================================================== */}
        <div className="hidden lg:flex lg:col-span-7 relative overflow-hidden flex-col justify-between p-12 bg-cover bg-center" style={{ backgroundImage: "url('/frapino_passion.png')" }}>
          {/* Dark Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#141210] via-[#1c1a17]/70 to-[#1c1a17]/50" />

          {/* Top Left Navigation Back to Home */}
          <div className="relative z-10">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/90! px-4 py-2 rounded-full font-semibold backdrop-blur-md border border-white/15 transition-all"
            >
              <LeftOutlined className="text-xs" />
              <span>Back to Expresso House</span>
            </Link>
          </div>

          {/* Center Circular Emblem Monogram Logo */}
          <div className="relative z-10 my-auto text-center space-y-6 max-w-lg mx-auto">
            <div className="h-24 w-24 rounded-full bg-linear-to-b from-[#d4a373] to-[#b07d50] p-1 mx-auto shadow-2xl flex items-center justify-center border-2 border-white/20">
              <div className="h-full w-full rounded-full bg-[#1c1a17] flex items-center justify-center border border-amber-400/40">
                <span className="font-serif italic text-3xl font-extrabold text-[#d4a373]">eH</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="uppercase tracking-widest text-amber-200 font-bold">
                Fika Loyalty Membership
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                The membership programme for everyone who loves Fika
              </h2>
            </div>
          </div>

          {/* Bottom Dots Indicator */}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="h-1.5 w-8 rounded-full bg-[#d48b85]" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>

        {/* ==============================================================================
            RIGHT SIDE: Phone & OTP Authentication Form (Matches Screenshot Aesthetics)
           ============================================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#1e1c19] border-l border-white/5 relative">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between">
            {step === "otp" ? (
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 px-4 py-1.5 rounded-full font-bold shadow-md transition-all cursor-pointer"
              >
                <LeftOutlined className="text-xs" />
                <span>Back</span>
              </button>
            ) : (
              <Link
                href={ROUTES.HOME}
                className="inline-flex lg:hidden items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/90 px-3.5 py-1 rounded-full font-bold border border-white/15"
              >
                <LeftOutlined className="text-xs" />
                <span>Home</span>
              </Link>
            )}

            <span className="text-white/40 font-mono">
              {step === "phone" ? "Step 1 of 2" : "Step 2 of 2"}
            </span>
          </div>

          {/* Form Content Body */}
          <div className="my-auto py-8 max-w-md mx-auto w-full space-y-8">
            {/* Top Monogram Gold Logo */}
            <div className="text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-linear-to-b from-[#d4a373] to-[#a06d40] p-1 mx-auto shadow-xl flex items-center justify-center border border-white/20">
                <div className="h-full w-full rounded-full bg-[#1c1a17] flex items-center justify-center">
                  <span className="font-serif italic text-2xl font-black text-[#d4a373]">eH</span>
                </div>
              </div>

              {step === "phone" ? (
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-white/70">Welcome to</p>
                  <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Expresso House
                  </h1>
                  <p className="sm:text-sm text-white/60 font-normal leading-relaxed pt-1">
                    The membership programme for everyone who loves Fika
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="font-semibold uppercase tracking-wider text-amber-200/80">
                    Verify your number
                  </p>
                  <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Enter Verification Code
                  </h1>
                  <p className="sm:text-sm text-white/60 font-normal leading-relaxed pt-1">
                    We&apos;ve sent a 6-digit verification code to your number
                  </p>
                </div>
              )}
            </div>

            {/* ==============================================================================
                STEP 1: Phone Number Form (Integrated Country Code Prefix)
               ============================================================================== */}
            {step === "phone" && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-3">
                  {/* Combined Integrated Country Code Prefix + Phone Number Input Box */}
                  <div className="flex items-center bg-white rounded-2xl p-1.5 shadow-lg border border-white/20 focus-within:ring-2 focus-within:ring-[#d48b85] transition-all">
                    {/* Country Code Prefix Dropdown */}
                    <div className="shrink-0 border-r border-gray-200 pr-1 pl-2">
                      <Select
                        value={countryCode}
                        onChange={setCountryCode}
                        variant="borderless"
                        popupMatchSelectWidth={false}
                        className="text-gray-900 font-extrabold text-sm sm:text-base cursor-pointer"
                        options={[
                          { value: "+46", label: "🇸🇪 +46" },
                          { value: "+358", label: "🇫🇮 +358" },
                          { value: "+45", label: "🇩🇰 +45" },
                          { value: "+47", label: "🇳🇴 +47" },
                          { value: "+44", label: "🇬🇧 +44" },
                          { value: "+1", label: "🇺🇸 +1" },
                        ]}
                      />
                    </div>

                    {/* Mobile Phone Number Input */}
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 bg-transparent text-gray-900 font-bold text-sm sm:text-base py-3.5 px-3 border-none focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Terracotta / Rose CTA Button */}
                <button
                  type="submit"
                  className="w-full bg-[#d48b85] hover:bg-[#c47a74] text-black py-4 rounded-full font-bold text-base shadow-xl transition-all cursor-pointer active:scale-98"
                >
                  Next
                </button> 
              </form>
            )}

            {/* ==============================================================================
                STEP 2: 6-Digit OTP Verification Form (Matches Screenshot 3)
               ============================================================================== */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* 6 OTP Pin Inputs */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={digit}
                        placeholder="-"
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="h-14 w-11 sm:w-13 text-center text-xl font-black text-gray-900 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d48b85] shadow-lg transition-all"
                      />
                    ))}
                  </div>
                </div>

                {/* Demo Auto-fill Helper */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleAutoFillDemoOtp}
                    className="text-amber-200/90 hover:text-amber-200 font-semibold flex items-center gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all"
                  >
                    <LockOutlined className="text-xs" />
                    <span>Auto-fill Demo OTP (123456)</span>
                  </button>
                </div>

                {/* Terracotta / Rose CTA Button */}
                <button
                  type="submit"
                  className="w-full bg-[#d48b85] hover:bg-[#c47a74] text-[#1c1a17] py-4 rounded-full font-extrabold text-base shadow-xl transition-all cursor-pointer active:scale-98"
                >
                  Verify
                </button>

                {/* Countdown Timer / Resend */}
                <div className="text-center space-y-1 text-white/60 font-medium">
                  <p>Didn&apos;t receive the code?</p>
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-[#d48b85] font-extrabold hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <ReloadOutlined />
                      <span>Resend Code Now</span>
                    </button>
                  ) : (
                    <p className="font-extrabold text-white">
                      Resend in {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
