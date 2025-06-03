"use client";
import React, { useState, useRef } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apartmentFormSchema, ApartmentFormValues, EditApartmentFormValues, FormFieldConfig, editApartmentFormSchema } from "@/types/forms";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import {
  apartmentGeneralFields,
  apartmentDetailFields,
  apartmentImageFields,
  descriptionField,
  checkboxFields,
} from "@/config/englishFields";
import {
  generalApartmentNepaliFields,
  detailApartmentNepaliFields,
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
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import PropertyImageUpdate from "./PropertyImageUpdate";

const defaultValues: Partial<ApartmentFormValues> = {
  propertyCode: "",
  type: "apartment",
  askingPrice: 0,
  askingPriceNep: "",
  frontage: 0,
  frontageUnit: "",
  frontageNep: "",
  facing: "",
  description: "",
  descriptionNp: "",
  status: PropertyStatus.EMERGING,
  builtYear: 1990,
  builtYearNep: "",
  images: [] as unknown as File[],
  thumbnail: new File([""], "placeholder.png", { type: "image/png" }),
  facilities: ["parking"],
  landArea: 10,
  landAreaUnit: "",
  landAreaNep: "",
  propertyPurpose: "sale",
  province: 1,
  district: 1,
  municipality: 1,
  wardNo: 1,
  floorNumber:1,
  apartmentType: "1 bhk",

  builtArea: 10,
  builtAreaUnit: "",
  builtAreaNep: "",

  bedrooms: 1,
  bathrooms: 1,
  kitchens: 1,
  livingRooms: 1,
  parkingSpaces: 1,
  furnished: "",
  bedroomsNep: "",
  bathroomsNep: "",
  kitchensNep: "",
  livingRoomsNep: "",
  parkingSpacesNep: "",
  floorNumberNep: "",

  floors: 1,
  floorsNep: "",

};

export default function ApartmentForm({
  values,
  edit,
  initialImages,
  propertyId,
}: {
  values?: Partial<ApartmentFormValues>;
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

  const form = useForm<ApartmentFormValues | EditApartmentFormValues>({
    resolver: zodResolver(edit ? editApartmentFormSchema : apartmentFormSchema),
    defaultValues: mergedDefaultValues,
  });


  const { createProperty, isLoading } = useCreateProperty();
  const { updateProperty, isUpdating } = useUpdateProperty();
  const canSubmitRef = useRef<() => boolean>(() => true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onInvalid = (errors: FieldErrors<ApartmentFormValues>) => {
    console.log("errors are ", errors);
    toast.error("please Fix all errors and try again ");
  };

  const onSubmit = async (values: ApartmentFormValues | EditApartmentFormValues) => {
    try {
      
      const canSubmit = canSubmitRef.current();
      if (!canSubmit) return;
      setIsSubmitting(true);
      let imageIds: string[] = [];

      if (!edit) {
        const thumbnailFile = (values as ApartmentFormValues).thumbnail;
        const imageFiles = (values as ApartmentFormValues).images;

      const formData = new FormData();
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      imageFiles?.forEach((img: File) => formData.append("images", img));

      const imageRes = await uploadImages(formData);
      if (!imageRes.success) {
        throw new Error("Image upload failed");
      }

      imageIds = imageRes.images.map((img: { id: string }) => img.id);
      }

      const payload = transformApartmentForm(values as ApartmentFormValues, imageIds, edit);
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
                  fields={apartmentGeneralFields}
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
                  fields={generalApartmentNepaliFields}
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
                <PropertyFormFields
                  form={form}
                  fields={apartmentDetailFields}
                />
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
                  fields={detailApartmentNepaliFields as FormFieldConfig[]}
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
                    isSubmitting || isUpdating ? "bg-blue-500 text-white" : ""
                  }`}
                  disabled={isSubmitting || isUpdating || isLoading}
                >
                  {isSubmitting || isUpdating ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>{edit ? "Updating..." : "Submitting..."}</span>
                      </div>
                    </>
                  ) : (
                    edit ? "Update" : "Submit"
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
