import { BaseEntity } from "./common";

// Property Types Enum
export enum PropertyType {
  HOUSE = "house",
  LAND = "land",
  APARTMENT = "apartment",
  FLAT = "flat",
  SPACE = "space",
}

// Property Status Enum
export enum PropertyStatus {
  EMERGING = "emerging",
  FEATURED = "featured",
  EXCLUSIVE = "exclusive",
  LATEST = "latest",
}

// Base Property Interface
export interface BaseProperty extends BaseEntity {
  type: PropertyType;
  code: string;
  category: string;
  title: string;
  price: string;
  location: string;
  road: string;
  area: string;
  image: string;
  description: string;
  status: PropertyStatus;
  builtYear?: string;
  images: string[];
}

// Specific Property Types
export interface HouseProperty extends BaseProperty {
  type: PropertyType.HOUSE;
  bedrooms: number;
  kitchens: number;
  floors: number;
  livingRooms: number;
  parkingSpaces: number;
  builtArea: string;
  landArea: string;
}

export interface LandProperty extends BaseProperty {
  type: PropertyType.LAND;
  landArea: string;
  landType: string;
}

export interface ApartmentProperty extends BaseProperty {
  type: PropertyType.APARTMENT;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  totalFloors: number;
  builtArea: string;
}

export interface FlatProperty extends BaseProperty {
  type: PropertyType.FLAT;
  bedrooms: number;
  bathrooms: number;
  floorNo: number;
  totalFloors: number;
  builtArea: string;
  parking: boolean;
}

export interface SpaceProperty extends BaseProperty {
  type: PropertyType.SPACE;
  spaceType: string;
  builtArea: string;
}

// Union type for all property types
export type Property =
  | HouseProperty
  | LandProperty
  | ApartmentProperty
  | FlatProperty
  | SpaceProperty;

// Property Filter Types
export interface PropertyFilter {
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
}

// Property Sort Options
export type PropertySortOption =
  | "price_asc"
  | "price_desc"
  | "date_desc"
  | "date_asc"
  | "area_asc"
  | "area_desc";

  export interface fetchPropertyDetails {
    id: string;
    createdAt: string;
    propertyCode: string;
    price: number;
    type: string;
    status: string;
    purpose: string;
  
    address?: {
      province: { provinceTitle: string ,id?:string} | null;
      district: { districtTitle: string ,id?:string} | null;
      municipality: { municipalityTitle: string ,id?:string} | null;
      ward: { wardTitle: string,id?:string } | null;
    };
  
    images: {
      id?: string; 
      url: string;
      type?: 'thumbnail' | 'normal' | string;
    }[];
  
    details: {
      facing: string;
      floors: number;
      parking: number;
      frontage: {
        unit: string;
        value: number;
      };
      landArea: {
        unit: string;
        value: number;
      };
      builtInArea?: {
        unit: string;
        value: number;
      };

      builtYear: number | null;
      facilities: string[];
      furnishing: string;
      description: {
        en: string;
        np: string;
      };
      totalFloors: number;
  
      // Optional fields based on response
    
      bathrooms?: number;
      bedrooms?: number;
      kitchens?: number;
      livingRooms?: number;
    
      zoning?: string;
      apartmentType?: string;
    };
  }
  