"use client";

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ROUTES } from "@/constants/routes";

export interface AuthUser {
  phone: string;
  name: string;
  role: "customer" | "storeManager" | "superAdmin";
  points?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "espresso_auth_user";
const AUTH_COOKIE_NAME = "espresso_auth";

function getInitialUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  return null;
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);
  const isClient = useIsClient();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = typeof pathname === "string" && (pathname === "/login" || pathname.startsWith("/login"));

  // Route protection guard
  useEffect(() => {
    if (!isClient) return;

    const isCurrentAuthPage = typeof pathname === "string" && (pathname === "/login" || pathname.startsWith("/login"));

    if (!user && !isCurrentAuthPage) {
      // User is not logged in -> redirect to login immediately
      router.replace(ROUTES.LOGIN);
    } else if (user && isCurrentAuthPage) {
      // User is already logged in and on login page -> redirect to home
      router.replace(ROUTES.HOME);
    }
  }, [user, isClient, pathname, router]);

  const login = (userData: AuthUser) => {
    setUser(userData);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=2592000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch {
      // Ignore storage errors
    }
    router.replace(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: !isClient,
        login,
        logout,
      }}
    >
      {/* If on a protected route and not yet authenticated on client, show quick loader while redirecting to /login */}
      {isClient && !user && !isAuthPage ? (
        <div className="min-h-screen bg-[#1c1a17] flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-linear-to-b from-[#d4a373] to-[#a06d40] p-1 shadow-2xl flex items-center justify-center border border-white/20">
            <div className="h-full w-full rounded-full bg-[#1c1a17] flex items-center justify-center">
              <span className="font-serif italic text-2xl font-black text-[#d4a373]">eH</span>
            </div>
          </div>
          <LoadingSpinner tip="Redirecting to login..." />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
