import { PropertyStatus, PropertyType } from "./property";
import { z } from "zod";
import { ReactNode } from "react";

// Base form schema that all property forms will extend
export const basePropertySchema = z.object({
  propertyCode: z.string().min(1, "Property code is required"),

  askingPrice: z
    .number({
      required_error: "Asking price is required",
      invalid_type_error: "Asking price must be a number",
    })
    .min(2, "Asking price must be at least 2"),
  type: z.string().min(1, "Property Category is required"),
  frontage: z.number().min(0, "Frontage must be 0 or more"),
  frontageUnit: z.string().min(1, "Frontage unit is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
  builtYear: z.number().min(1900, "Built year is required"),
  facilities: z.array(z.string()).optional(),
  province: z.number().optional(),
  district: z.number().optional(),
  municipality: z.number().optional(),
  wardNo: z.number().optional(),
  images: z.array(z.instanceof(File)).min(4, "At least 4 images are required"),
  thumbnail: z.instanceof(File, { message: "Thumbnail is required" }),
  landArea: z.number().min(1, "Land area is required"),
  landAreaUnit: z.string().min(1, "Land area unit is required"),
  facing: z.string().min(1, "Facing is required"),
  propertyPurpose: z.string().min(1, "Property purpose is required"),
  // Nepali fields
  landAreaNep: z.string().optional(),
  frontageNep: z.string().optional(),
  askingPriceNep: z.string().optional(),
  descriptionNp: z.string().optional(),
  builtYearNep: z.string().optional(),
});

export type BasePropertyFormValues = z.infer<typeof basePropertySchema>;

// House form schema
export const houseFormSchema = basePropertySchema.extend({
  bedrooms: z.number().min(0, "Bedrooms must be 0 or more"),
  kitchens: z.number().min(0, "Kitchens must be 0 or more"),
  floors: z.number().min(0, "Floors must be 0 or more"),
  livingRooms: z.number().min(0, "Living rooms must be 0 or more"),
  parkingSpaces: z.number().min(0, "Parking spaces must be 0 or more"),
  builtArea: z.number().min(1, "Built area is required"),
  builtAreaUnit: z.string().min(1, "Built area unit is required"),
  furnished: z.string().min(1, "Furnished is required"),
  // Nepali fields
  bedroomsNep: z.string().optional(),
  kitchensNep: z.string().optional(),
  floorsNep: z.string().optional(),
  livingRoomsNep: z.string().optional(),
  parkingSpacesNep: z.string().optional(),
  builtAreaNep: z.string().optional(),
});

export type HouseFormValues = z.infer<typeof houseFormSchema>;
// Land form schema
export const landFormSchema = basePropertySchema.extend({
  // type: z.literal(PropertyType.LAND),
  zoning: z.enum(["residential", "commercial", "agricultural", "mixed"]),
});

export type LandFormValues = z.infer<typeof landFormSchema>;

export const apartmentFormSchema = basePropertySchema.extend({
  apartmentType: z.string().min(1, "Type is required"),
  floorNumber: z.number().min(0, "Floor number must be 0 or more"),
  floors: z.number().min(0, "Floors must be 0 or more"),
  bedrooms: z.number().min(0, "Bedrooms must be 0 or more"),
  bathrooms: z.number().min(0, "Bathrooms must be 0 or more"),
  kitchens: z.number().min(0, "Kitchens must be 0 or more"),
  livingRooms: z.number().min(0, "Living rooms must be 0 or more"),
  parkingSpaces: z.number().min(0, "Parking spaces must be 0 or more"),
  builtArea: z.number().min(1, "Built area is required"),
  builtAreaUnit: z.string().min(1, "Built area unit is required"),
  furnished: z.string().min(1, "Furnished is required"),
  // Nepali fields
  bedroomsNep: z.string().optional(),
  bathroomsNep: z.string().optional(),
  kitchensNep: z.string().optional(),
  livingRoomsNep: z.string().optional(),
  parkingSpacesNep: z.string().optional(),
  builtAreaNep: z.string().optional(),
  floorNumberNep: z.string().optional(),

  floorsNep: z.string().optional(),
});

export type ApartmentFormValues = z.infer<typeof apartmentFormSchema>;

export const flatFormSchema = apartmentFormSchema


export type FlatFormValues = z.infer<typeof flatFormSchema>;


export const spaceFormSchema = basePropertySchema.extend({
  type: z.string().min(1, "Type is required"),

  floorNumber: z.number().min(0, "Floor number must be 0 or more").optional(),
  floorNumberNep: z.string().optional(),

  floors: z.number().min(0, "Floors must be 0 or more").optional(),
  floorsNep: z.string().optional(),

  parkingSpaces: z.number().min(0, "Parking spaces must be 0 or more").optional(),
  parkingSpacesNep: z.string().optional(),


  furnished: z.string().min(1, "Furnished is required"),
  zoning: z.enum(["residential", "commercial", "mixed"]).optional(),
  ceilingHeight: z.number().min(1, "Ceiling height must be at least 1 foot"),
});

export type SpaceFormValues = z.infer<typeof spaceFormSchema>;

// Form field configuration
export interface FormFieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "select"
    | "file"
    | "textarea"
    | "unitArea"
    | "checkboxGroup";
  placeholder?: string;
  validation?: {
    required?: boolean;
    min?: number;
  };
  options?: { label: string; value: string }[];
  toNepali?: boolean;
  icon?: ReactNode;
}
