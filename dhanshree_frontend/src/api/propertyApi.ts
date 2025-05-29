import { HouseFormValues } from "@/types/forms";
import { TransformedHouseFormData } from "@/utils/transformHouseForm ";
import { TransformedLandFormData } from "@/utils/transformLandForm";
import { TransformedApartmentFormData } from "@/utils/transformApartmentForm";
import { TransformedFlatFormData } from "@/utils/transformFlatForm";
import { TransformedSpaceFormData } from "@/utils/transformSpaceForm";
import $axios from "@/lib/axios.instance";

type CreatePropertyData =
  | TransformedHouseFormData
  | TransformedLandFormData
  | TransformedApartmentFormData
  | TransformedFlatFormData
  | TransformedSpaceFormData;

export const createProperty = async (data: CreatePropertyData) => {
  try {
    console.log("final data before sending to the backend ", data);
    const response = await $axios.post("/property", data);
    return response.data;
  } catch (error) {
    console.log("error in the create property ", error);
    throw new Error((error as string) || "Failed to create property");
  }
};

export const updateProperty = async (id: string, data: CreatePropertyData) => {
  try {
    console.log("final data before sending to the backend ", data);
    const response = await $axios.patch(`/property/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("error in the update property ", error);
    throw new Error((error as string) || "Failed to update property");
  }
}
