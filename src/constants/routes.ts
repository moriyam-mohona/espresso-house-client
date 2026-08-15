/**
 * Type-safe Application Route definitions.
 * All internal application navigation paths should be referenced from this object.
 */
export const ROUTES = {
  HOME: "/",
  REWARDS: "/rewards",
  REWARDS_HISTORY: "/rewards/history",
  CHALLENGES: "/challenges",
  MY_ID: "/my-id",
  WALLET: "/wallet",
  PAYMENT_CARDS: "/wallet/payment-cards",
  SEND_GIFT: "/wallet/send-gift",
  FIKA_OFFERS: "/wallet/offers",
  RECEIPTS: "/wallet/receipts",
  ORDERS: "/wallet/receipts",
  PROFILE: "/profile",
  ORDER: "/order",
  // Authentication route placeholders
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  // Application Dashboard route placeholders
  DASHBOARD: {
    HOME: "/dashboard",
    SETTINGS: "/dashboard/settings",
    PROFILE: "/dashboard/profile",
  },
} as const;

export type AppRoutes = typeof ROUTES;
