import { FlatFormValues } from "../types/forms";

export interface TransformedFlatFormData {
  propertyCode: string;
  price: number;
  type: string;
  status: string;
  purpose: string;
  province: number | null;
  district: number | null;
  municipality: number | null;
  ward: number | null;
 thumbnailImageId?: string | null;
  normalImageIds?: string[] | null; 
   details: {
    bathrooms: number;
    bedrooms: number;
    kitchens: number;
    livingRooms: number;
    parking: number;
    builtInArea: {
      unit: string;
      value: number;
    };
    landArea: {
      unit: string;
      value: number;
    };
    frontage: {
      unit: string;
      value: number;
    };
    builtYear: number | null;
    description: {
      en: string;
      np: string;
    };
    facing: string;
    facilities: string[];
    floors: number;
    totalFloors: number;
    apartmentType: string;
    furnishing: string;
  };
}

export const transformFlatForm = (
  data: FlatFormValues,
  uploadedImageIds: string[] = [],
  edit: boolean = false,
  thumbnailImageId?: string | null,

): TransformedFlatFormData => {
  const baseData: TransformedFlatFormData = {
    propertyCode: data.propertyCode,
    price: Number(data.askingPrice),
    type: "flat", 
    status: data.status,
    purpose: data.propertyPurpose,
    province: data.province ?? null,
    district: data.district ?? null,
    municipality: data.municipality ?? null,
    ward: data.wardNo ?? null,
    details: {
      bathrooms: Number(data.bathrooms ?? 0),
      bedrooms: Number(data.bedrooms ?? 0),
      kitchens: Number(data.kitchens ?? 0),
      livingRooms: Number(data.livingRooms ?? 0),
      parking: Number(data.parkingSpaces ?? 0),
      builtInArea: {
        unit: data.builtAreaUnit,
        value: Number(data.builtArea),
      },
      landArea: {
        unit: data.landAreaUnit,
        value: Number(data.landArea),
      },
      frontage: {
        unit: data.frontageUnit,
        value: Number(data.frontage),
      },
      builtYear: data.builtYear ? Number(data.builtYear) : null,
      description: {
        en: data.description,
        np: data.descriptionNp ?? "",
      },
      facing: data.facing,
      facilities: data.facilities ?? [],
      floors: Number(data.floorNumber ?? 1),
      totalFloors: Number(data.floors ?? 1),
      apartmentType: data.type,
      furnishing: data.furnished,
    },
  };
  if (!edit) {
    baseData.normalImageIds = uploadedImageIds ?? [];
    baseData.thumbnailImageId = thumbnailImageId ?? null;
  }
  return baseData;
};
