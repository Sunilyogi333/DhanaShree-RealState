import { ApartmentFormValues } from "@/types/forms";

export interface TransformedApartmentFormData {
  price: number;
  propertyCode: string;
  type: string;
  status: string;
  purpose: string;
  province: number | null;
  district: number | null;
  municipality: number | null;
  ward: number | null;
  imageIds: string[];
  details: {
    floors: number;
    apartmentType: string;
    builtYear: number | null;
    facilities: string[];
    facing: string;
    totalFloors: number;
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

export const transformApartmentForm = (
  data: ApartmentFormValues,
  uploadedImageIds: string[] = []
): TransformedApartmentFormData => {
  return {
    price: Number(data.askingPrice),
    propertyCode: data.propertyCode,
    type: "apartment",
    status: data.status,
    purpose: data.propertyPurpose,
    province: data.province ?? null,
    district: data.district ?? null,
    municipality: data.municipality ?? null,
    ward: data.wardNo ?? null,
    imageIds: uploadedImageIds,
    details: {
      floors: data.floorNumber,
      apartmentType: data.apartmentType,
      builtYear: data.builtYear ? Number(data.builtYear) : null,
      facilities: data.facilities ?? [],
      facing: data.facing,
      totalFloors: data.floors,
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
};
