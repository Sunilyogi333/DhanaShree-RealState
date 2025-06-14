import { SpaceFormValues } from "../types/forms";

export interface TransformedSpaceFormData {
  propertyCode: string;
  price: number;
  type: string;
  status: string;
  purpose: string;
  province: number | null;
  district: number | null;
  municipality: number | null;
  ward: number | null;
  imageIds?: string[] | null;
  details: {
    totalFloors: number;  
    floors: number;
    parking: number;
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
    furnishing: string;
    zoning?: string; 
  };
}

export const transformSpaceForm = (
  data: SpaceFormValues,
  uploadedImageIds: string[] = [],
  edit: boolean = false
): TransformedSpaceFormData => {
  const baseData: TransformedSpaceFormData = {
    propertyCode: data.propertyCode,
    price: Number(data.askingPrice),
    type: "space",
    status: data.status,
    purpose: data.propertyPurpose,
    province: data.province ?? null,
    district: data.district ?? null,
    municipality: data.municipality ?? null,
    ward: data.wardNo ?? null,
    details: {
      totalFloors: Number(data.floors ?? 0),
      floors: Number(data.floorNumber ?? 0),
      parking: Number(data.parkingSpaces ?? 0),
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
      furnishing: data.furnished,
      zoning: data.zoning, // Optional field, can be undefined
      // ceilingHeight: Number(data.ceilingHeight),
    },
  };
  if (!edit) {
      baseData.imageIds = uploadedImageIds ?? []; 
  }
  return baseData;
};
