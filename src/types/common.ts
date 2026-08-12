/**
 * Common TypeScript interface definitions for SaaS frontend.
 */

/**
 * Standard API Response envelope
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
  meta?: ResponseMetadata;
}

/**
 * Metadata for paginated responses
 */
export interface ResponseMetadata {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Standard Paginated Response
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: ResponseMetadata;
}

/**
 * Standard Query Parameters for search/pagination
 */
export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
}

/**
 * Generic Async State container
 */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Base Entity with common audit timestamps
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Basic User role enum/type placeholder for future RBAC setup
 */
export type UserRole = "super_admin" | "admin" | "member" | "guest";
