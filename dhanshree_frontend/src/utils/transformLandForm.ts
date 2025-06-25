import { LandFormValues } from "@/types/forms";

export interface TransformedLandFormData {
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
    zoning: string;
    builtYear: number | null;
    facilities: string[];
    facing: string;
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

export const transformLandForm = (
  data: LandFormValues,
  uploadedImageIds?: string[],
  edit = false,
  thumbnailImageId?: string | null,
): TransformedLandFormData => {
  const baseData: TransformedLandFormData = {
    price: Number(data.askingPrice),
    propertyCode: data.propertyCode,
    type: "land",
    status: data.status,
    purpose: data.propertyPurpose,
    province: data.province ?? null,
    district: data.district ?? null,
    municipality: data.municipality ?? null,
    ward: data.wardNo ?? null,
    details: {
      zoning: data.zoning,
      builtYear: data.builtYear ? Number(data.builtYear) : null,
      facilities: data.facilities ?? [],
      facing: data.facing,
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
