import { HouseFormValues } from "../types/forms";


export interface TransformedHouseFormData {
  price: number;
  propertyCode: string;
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
    bedrooms: number;
    kitchens: number;
    floors: number;
    livingRooms: number;
    parking: number;
    totalFloors: number;
    builtYear: number | null;
    facilities: string[];
    facing: string;
    furnishing: string;
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
    description: {
      en: string;
      np: string;
    };
  };
}

export const transformHouseForm = (
  data: HouseFormValues,
  uploadedImageIds?: string[],
  thumbnailImageId?: string | null,
  edit = false
): TransformedHouseFormData => {
  const baseData: TransformedHouseFormData = {
    price: Number(data.askingPrice),
    propertyCode: data.propertyCode,
    type: "house",
    status: data.status,
    purpose: data.propertyPurpose,
    province: data.province ?? null,
    district: data.district ?? null,
    municipality: data.municipality ?? null,
    ward: data.wardNo ?? null,
    details: {
      bedrooms: data.bedrooms,
      kitchens: data.kitchens,
      floors: data.floors,
      livingRooms: data.livingRooms,
      parking: data.parkingSpaces,
      totalFloors: data.floors,
      builtYear: data.builtYear ? Number(data.builtYear) : null,
      facilities: data.facilities ?? [],
      facing: data.facing,
      furnishing: data.furnished,
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
      description: {
        en: data.description,
        np: data.descriptionNp ?? "",
      },
    },
  };

  if (!edit) {
    baseData.normalImageIds = uploadedImageIds ?? [];
    baseData.thumbnailImageId = thumbnailImageId ?? null;
  }

  return baseData;
};

