import { env } from "@/config/env";
import { logger } from "./logger";
import type { ApiResponse } from "@/types/common";

export class ApiClientError extends Error {
  public status: number;
  public data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.data = data;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  token?: string;
}

/**
 * Production-ready API Client wrapper around native Fetch.
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = env.NEXT_PUBLIC_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const fullUrl = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    if (!params) return fullUrl;

    const url = new URL(fullUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  public async request<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, token, headers, ...customConfig } = options;

    const url = this.buildUrl(endpoint, params);

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...customConfig,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    };

    try {
      logger.debug(`[ApiClient] ${config.method || "GET"} -> ${url}`);

      const response = await fetch(url, config);

      let data: unknown;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage =
          (data as { message?: string })?.message ||
          `HTTP Error ${response.status}: ${response.statusText}`;

        throw new ApiClientError(errorMessage, response.status, data);
      }

      return data as ApiResponse<T>;
    } catch (error) {
      if (error instanceof ApiClientError) {
        logger.error(`[ApiClient Error ${error.status}]: ${error.message}`);
        throw error;
      }
      logger.error(`[ApiClient Request Failed]:`, error);
      throw new ApiClientError(
        (error as Error).message || "An unexpected network error occurred",
        500
      );
    }
  }

  public get<T = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  public patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  public delete<T = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
