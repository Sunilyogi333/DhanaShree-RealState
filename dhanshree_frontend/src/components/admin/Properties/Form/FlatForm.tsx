"use client";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { flatFormSchema, FlatFormValues, FormFieldConfig } from "@/types/forms";
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
  builtYear: 1990,
  builtYearNep: "",
  images: [], 
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
  floorNumber: 1,
  apartmentType: "1bhk",
  bedrooms: 1,
  bathrooms: 1,
  kitchens: 1,
  floors: 1,
  livingRooms: 1,
  parkingSpaces: 1,
  builtArea: 100,
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

export default function FlatForm() {
  const form = useForm<FlatFormValues>({
    resolver: zodResolver(flatFormSchema),
    defaultValues,
  });

  const { createProperty, isLoading } = useCreateProperty();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onInvalid = (errors: FieldErrors<FlatFormValues>) => {
    console.log("errors are ", errors);
    toast.error("please Fix all errors and try again ");
  };

  const onSubmit = async (values: FlatFormValues) => {
    try {
      setIsSubmitting(true);
      const thumbnailFile = values.thumbnail;
      const imageFiles = values.images;

      const formData = new FormData();
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      imageFiles?.forEach((img: File) => formData.append("images", img));

      const imageRes = await uploadImages(formData);
      if (!imageRes.success) {
        throw new Error("Image upload failed");
      }

      const imageIds = imageRes.images.map((img: { id: string }) => img.id);
      const payload = transformFlatForm(values);
      payload.imageIds = imageIds;
      console.log("payload for the create property ", payload);
      createProperty(payload);
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
              <PropertyImageUpload form={form} />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className={`w-1/3 hover:bg-blue-500 border border-blue-500 hover:text-white text-blue-500 bg-transparent cursor-pointer ${
                    isSubmitting ? "bg-blue-500 text-white" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Submitting...</span>
                      </div>
                    </>
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
