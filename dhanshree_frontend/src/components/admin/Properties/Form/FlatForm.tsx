"use client";
import React, { useState, useRef } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { flatFormSchema, FlatFormValues, FormFieldConfig, editFlatFormSchema, EditFlatFormValues } from "@/types/forms";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import {
  flatGeneralFields,
  flatDetailFields,
  flatImageFields,
  descriptionField,
  checkboxFields,
} from "@/config/englishFields";
import {
  generalFlatNepaliFields,
  detailFlatNepaliFields,
  nepaliDescriptionField,
} from "@/config/nepaliFields";
import { PropertyType, PropertyStatus } from "@/types/property";
import { PropertyFormTabs } from "./PropertyFormTabs";
import { PropertyFormFields } from "./PropertyFormFields";
import { PropertyImageUpload } from "./PropertyImageUpload";
import { Form } from "@/components/ui/form";
import { PropertyLocationFields } from "./PropertyLocationFields";
import { Button } from "@/components/ui/button";
import { uploadImages } from "@/utils/uploadImages ";
import { toast } from "sonner";
import { transformApartmentForm } from "@/utils/transformApartmentForm";
import { transformFlatForm } from "@/utils/transformFlatForm";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import PropertyImageUpdate from "./PropertyImageUpdate";
const defaultValues: Partial<FlatFormValues> = {
  propertyCode: "",
  type:"flat",
  askingPrice: 0,
  askingPriceNep: "",
  frontage: 0,
  frontageUnit: "",
  frontageNep: "",
  facing: "",
  description: "",
  descriptionNp: "",
  status: PropertyStatus.EMERGING,
  builtYear: 0,
  builtYearNep: "",
  images: [], 
  thumbnail: new File([""], "placeholder.png", { type: "image/png" }),
  facilities: ["parking"],
  landArea:   0,
  landAreaUnit: "",
  landAreaNep: "",
  propertyPurpose: "sale",
  province: 1,
  district: 0,
  municipality: 0,
  wardNo: 0,
  floorNumber: 0,
  apartmentType: "1bhk",
  bedrooms: 0,
  bathrooms: 0,
  kitchens: 0,
  floors: 0,
  livingRooms: 0,
  parkingSpaces:0,
  builtArea: 0,
  builtAreaUnit: "sqm",
  furnished: "semi",
  bedroomsNep: "",
  kitchensNep: "",
  floorsNep: "",
  livingRoomsNep: "",
  parkingSpacesNep: "",
  builtAreaNep: "",
  floorNumberNep: "",

};

export default function FlatForm({
  values,
  edit,
  initialImages,
  propertyId,
}: {
  values?: Partial<FlatFormValues>;
  edit?: boolean;
  initialImages?: {
    url: string;
    type: "thumbnail" | "normal";
    id: string;
    propertyId?: string;
  }[];
  propertyId?: string;
}) {
  const mergedDefaultValues = {
    ...defaultValues,
    ...values,
  };

  const form = useForm<FlatFormValues | EditFlatFormValues>({
    resolver: zodResolver(edit ? editFlatFormSchema : flatFormSchema),
    defaultValues: mergedDefaultValues,
  });
  const { createProperty, isLoading } = useCreateProperty();  
  const { updateProperty, isUpdating } = useUpdateProperty();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmitRef = useRef<() => boolean>(() => true);
  const onInvalid = (errors: FieldErrors<FlatFormValues>) => {
    console.log("errors are ", errors);
    toast.error("please Fix all errors and try again ");
  };

  const onSubmit = async (values: FlatFormValues | EditFlatFormValues) => {
    try {
      const canSubmit = canSubmitRef.current();
      if (!canSubmit) return;
      setIsSubmitting(true);
      let imageIds: string[] = [];
           let thumbnailIds: string | null = null;
     
     
           if (!edit) {
         const thumbnailFile = (values as FlatFormValues).thumbnail;
                 const imageFiles = (values as FlatFormValues).images;

                 const formData = new FormData();
                 const thumbnailData = new FormData();
         
                 if (thumbnailFile){
         
                   console.log("thumbnail file is ", thumbnailFile);
                   thumbnailData.append("thumbnail", thumbnailFile);
         
                 } 
                 imageFiles?.forEach((img) => formData.append("images", img));
                 const thumbnailImage =await uploadImages(thumbnailData);
                 const imageRes = await uploadImages(formData);
                 console.log("imageRes and the thumbnail res is", imageRes,thumbnailImage);
                 if (!imageRes.success || !thumbnailImage.success) {
                   throw new Error("Image upload failed");
                 }
                 imageIds = imageRes.images.map((img: any) => img.id);
                 thumbnailIds = thumbnailImage.images[0]?.id ?? null;
           }

      const payload = transformFlatForm(values as FlatFormValues, imageIds, edit, thumbnailIds);
      console.log("payload for the create or updating property ", payload);

      if (!edit) {
        createProperty(payload);
      } else if (propertyId) {
        updateProperty(propertyId, payload);
      }
      setIsSubmitting(false);
    } catch (error) { 
      console.error("Submit failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <PropertyFormTabs>
            <div className="space-y-4 tab1">
              <h3 className="text-lg font-semibold mb-4 text-center">
                General Information
              </h3>
              <h2 className="text-sm font-semibold text-sky-600 mb-6">
                Property Details (English)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
                <PropertyFormFields
                  form={form}
                  fields={flatGeneralFields}
                  className="w-full"
                />
              </div>

              <PropertyLocationFields form={form} />

              <div className="text py-4 mt-3">
                <h2 className="text-sm font-semibold text-green-500">
                  Property Details (Nepali)
                </h2>
                <hr className="border my-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <PropertyFormFields
                  form={form}
                  fields={generalFlatNepaliFields}
                />
              </div>
            </div>

            <div className="space-y-4 tab2">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Additional Details
              </h3>
              <h2 className="text-sm font-semibold text-sky-600 mb-6">
                Additional Details (English)
              </h2>
              <div className="grid grid-cols-1 gap-4 my-10">
                <PropertyFormFields form={form} fields={descriptionField} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
                <PropertyFormFields form={form} fields={flatDetailFields} />
              </div>

              <div className="grid grid-cols-1 gap-4 my-10">
                <PropertyFormFields form={form} fields={checkboxFields} />
              </div>

              <div className="text py-4 mt-3">
                <h2 className="text-sm font-semibold text-green-500">
                  Additional Details (Nepali)
                </h2>
                <hr className="border my-4" />
              </div>
              <div className="grid grid-cols-1 gap-4 my-10">
                <PropertyFormFields
                  form={form}
                  fields={nepaliDescriptionField}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 my-10">
                <PropertyFormFields
                  form={form}
                  fields={detailFlatNepaliFields as FormFieldConfig[]}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Property Images
              </h3>
              {edit && initialImages && propertyId ? (
                <PropertyImageUpdate
                  initialImages={initialImages}
                  propertyId={propertyId}
                  canSubmitRef={canSubmitRef}
                />
              ) : (
                <PropertyImageUpload form={form} />
              )}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className={`w-1/3 hover:bg-blue-500 border border-blue-500 hover:text-white text-blue-500 bg-transparent cursor-pointer ${
                    isSubmitting ? "bg-blue-500 text-white" : ""
                  }`}
                  disabled={isSubmitting || isUpdating}
                >
                  {isSubmitting || isUpdating ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>{edit ? "Updating..." : "Submitting..."}</span>
                      </div>
                    </>
                  ) : edit ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </PropertyFormTabs>
        </form>
      </Form>
    </div>
  );
}
