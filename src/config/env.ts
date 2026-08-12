/**
 * Type-safe environment variables helper.
 * Centralizes environment access and provides sensible defaults for development.
 */

export const env = {
  /**
   * Node execution environment
   */
  NODE_ENV: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  /**
   * Application Frontend URL
   */
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  /**
   * Application API Base URL
   */
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",

  /**
   * Application Title / Prefix
   */
  NEXT_PUBLIC_APP_TITLE:
    process.env.NEXT_PUBLIC_APP_TITLE || "Espresso Club",

  /**
   * API Timeout in milliseconds
   */
  NEXT_PUBLIC_API_TIMEOUT: Number(
    process.env.NEXT_PUBLIC_API_TIMEOUT || 30000
  ),
} as const;

export type Env = typeof env;
