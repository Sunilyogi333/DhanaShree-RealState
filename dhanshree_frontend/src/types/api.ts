import { Property, PropertyFilter, PropertySortOption } from "./property";
import { ApiResponse, PaginationParams } from "./common";
import { TransformedHouseFormData } from "@/utils/transformHouseForm ";

// API request types
export interface GetPropertiesRequest {
  filters?: PropertyFilter;
  sort?: PropertySortOption;
  pagination?: PaginationParams;
}

export interface CreatePropertyRequest {
  property: TransformedHouseFormData;
}

export interface UpdatePropertyRequest {
  id: string;
  property: Partial<Property>;
}

// API response types
export type GetPropertiesResponse = ApiResponse<{
  properties: Property[];
  pagination: PaginationParams;
}>;

export type GetPropertyResponse = ApiResponse<Property>;

export type CreatePropertyResponse = ApiResponse<Property>;

export type UpdatePropertyResponse = ApiResponse<Property>;

export type DeletePropertyResponse = ApiResponse<{ id: string }>;
