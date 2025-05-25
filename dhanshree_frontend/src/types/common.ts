// Common types used across the application
export type Status = "success" | "error" | "loading" | "idle";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  status: Status;
  message?: string;
  pagination?: PaginationParams;
}
