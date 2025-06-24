import { useMutation } from "@tanstack/react-query";
import { createProperty, updateProperty } from "../api/propertyApi";
import { TransformedHouseFormData } from "@/utils/transformHouseForm ";
import { TransformedLandFormData } from "@/utils/transformLandForm";
import { TransformedApartmentFormData } from "@/utils/transformApartmentForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TransformedFlatFormData } from "@/utils/transformFlatForm";
import { TransformedSpaceFormData } from "@/utils/transformSpaceForm";

type UpdatePropertyData =
  | TransformedHouseFormData
  | TransformedLandFormData
  | TransformedApartmentFormData
  | TransformedFlatFormData
  |TransformedSpaceFormData;

export const useUpdateProperty = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePropertyData }) =>
      updateProperty(id, data),
    onError: (error: any) => {
      toast.error("Error updating property", {
        description: error.response?.data.message?.en || "An error occurred while updating the property.",
      });
    },
    onSuccess: (data) => {
      console.log("Property Updatded successfully:", data);
      toast.success("Property Updated successfully");
      router.push(`/admin/listings`);
    },
    onMutate: (data) => {
      console.log("Mutating property:", data);
    },
  });

  return {
    updateProperty: (id: string, data: UpdatePropertyData) =>
      mutation.mutate({ id, data }),
    isUpdating: mutation.isPending,
  };
};
