import { useMutation } from "@tanstack/react-query";
import { createProperty } from "../api/propertyApi";
import { TransformedHouseFormData } from "@/utils/transformHouseForm ";
import { TransformedLandFormData } from "@/utils/transformLandForm";
import { TransformedApartmentFormData } from "@/utils/transformApartmentForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TransformedFlatFormData } from "@/utils/transformFlatForm";
import { TransformedSpaceFormData } from "@/utils/transformSpaceForm";

type CreatePropertyData =
  | TransformedHouseFormData
  | TransformedLandFormData
  | TransformedApartmentFormData
  | TransformedFlatFormData
  |TransformedSpaceFormData;

export const useCreateProperty = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data: CreatePropertyData) => createProperty(data),
    onError: (error: any) => {
      toast.error("Error creating property", {
        description: error.response?.data.message,
      });
    },
    onSuccess: (data) => {
      console.log("Property created successfully:", data);
      toast.success("Property created successfully");
      router.push(`/admin/listings`);
    },
    onMutate: (data) => {
      console.log("Mutating property:", data);
    },
  });

  return {
    createProperty: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
