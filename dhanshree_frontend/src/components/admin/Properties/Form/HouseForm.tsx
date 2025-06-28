"use client";
import React, { useState,useRef } from "react";
import { FieldErrors, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { houseFormSchema, HouseFormValues } from "@/types/forms";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import {
  generalFields,
  detailFields,
  imageFields,
  descriptionField,
  checkboxFields,
} from "@/config/englishFields";
import {
  houseNepaliFields,
  nepaliDescriptionField,
} from "@/config/nepaliFields";
import { PropertyType, PropertyStatus } from "@/types/property";
import { PropertyFormTabs } from "./PropertyFormTabs";
import { PropertyFormFields } from "./PropertyFormFields";
import { PropertyImageUpload } from "./PropertyImageUpload";
import { Form } from "@/components/ui/form";
import { generalNepaliFields, detailNepaliFields } from "@/config/nepaliFields";
import { PropertyLocationFields } from "./PropertyLocationFields";
import { transformHouseForm } from "@/utils/transformHouseForm ";
import { Button } from "@/components/ui/button";
import { uploadImages } from "@/utils/uploadImages ";
import { toast } from "sonner";
import { z } from "zod";
import PropertyImageUpdate from "./PropertyImageUpdate";
import { editHouseFormSchema, EditHouseFormValues } from "@/types/forms";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";



const defaultValues: Partial<HouseFormValues> = {
  propertyCode: "",
  type: "house",

  askingPrice: 0,
  askingPriceNep: "",

  frontage: 0,
  frontageUnit: "",
  frontageNep: "",

  facing: "",
  furnished: "",

  description: "",
  descriptionNp: "",

  status: PropertyStatus.EMERGING,
  builtYear: 1990,
  builtYearNep: "",

  images: [] as unknown as File[],
  thumbnail: new File([""], "placeholder.png", { type: "image/png" }),

  facilities: ["parking"],

  bedrooms: 0,
  bedroomsNep: "",

  kitchens: 0,
  kitchensNep: "",

  floors: 0,
  floorsNep: "",

  livingRooms: 0,
  livingRoomsNep: "",

  parkingSpaces: 0,
  parkingSpacesNep: "",

  builtArea: 0,
  builtAreaUnit: "",
  builtAreaNep: "",

  landArea: 0,
  landAreaUnit: "",
  landAreaNep: "",

  propertyPurpose: "sale",

  province: 1,
  district: 0,
  municipality: 0,
  wardNo: 0,
};

export default function HouseForm({
  values,
  edit,
  initialImages,
  propertyId,
}: {
  values?: Partial<HouseFormValues>;
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

  console.log("merged default values in the house form ", mergedDefaultValues);

  // const thumbnail = initialImages?.find((img) => img.type === "thumbnail")?.url || "";
  // const normalImages = initialImages
  //   ?.filter((img) => img.type === "normal")
  //   .map((img) => img.url);

  const form = useForm<HouseFormValues | EditHouseFormValues>({
    resolver: zodResolver(edit ? editHouseFormSchema : houseFormSchema),
    defaultValues: mergedDefaultValues,
  });

  const canSubmitRef = useRef<() => boolean>(() => true);
  const { createProperty, isLoading } = useCreateProperty();
  const { updateProperty, isUpdating } = useUpdateProperty();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onInvalid = (errors: FieldErrors<HouseFormValues>) => {
    console.log("errors are ", errors);
    toast.error("please Fix all errors and try again ");
  };

  const onSubmit = async (values: HouseFormValues | EditHouseFormValues) => {
    try {
      
      const canSubmit = canSubmitRef.current();
      if (!canSubmit) return;

      setIsSubmitting(true);
      let imageIds: string[] = [];
      let thumbnailIds: string | null = null;

      if (!edit) {
        const thumbnailFile = (values as HouseFormValues).thumbnail;
        const imageFiles = (values as HouseFormValues).images;

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

      const payload = transformHouseForm(
        values as HouseFormValues,
        imageIds,
        thumbnailIds,
        edit
      );
      if (!edit) {
        console.log("Creating property with payload:", payload);
        createProperty(payload);
      } else if (propertyId) {
        updateProperty(propertyId, payload);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log("Submit failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* paxi auto tranlsate ko box  */}
      {/* <div className="flex items-center gap-2 mb-4 justify-end">
        <input
          type="checkbox"
          id="autoTranslate"
          onChange={(e) => {
            if (e.target.checked) {
              handleAutoTranslate();
              setRealTimeTranslation(true);
            } else {
              setRealTimeTranslation(false);
            }
          }}
          className="w-4 h-4 text-green-600 border-gray-300 rounded"
        />
        <label
          htmlFor="autoTranslate"
          className="text-sm font-medium text-gray-700"
        >
          Auto Translate to Nepali
        </label>
      </div> */}

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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10  my-10">
                <PropertyFormFields
                  form={form}
                  fields={generalFields}
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                <PropertyFormFields form={form} fields={generalNepaliFields} />
              </div>
            </div>

            <div className="space-y-4 tab2">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Additional Details
              </h3>
              <h2 className="text-sm font-semibold text-sky-600 mb-6">
                Additional Details (English)
              </h2>
              <div className="grid grid-cols-1  gap-4 my-10">
                <PropertyFormFields form={form} fields={descriptionField} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
                <PropertyFormFields form={form} fields={detailFields} />
              </div>

              <div className="grid grid-cols-1  gap-4 my-10">
                <PropertyFormFields form={form} fields={checkboxFields} />
              </div>

              <div className="text py-4 mt-3">
                <h2 className="text-sm font-semibold text-green-500">
                  Additional Details (Nepali)
                </h2>
                <hr className="border my-4" />
              </div>
              <div className="grid grid-cols-1  gap-4 my-10">
                <PropertyFormFields
                  form={form}
                  fields={nepaliDescriptionField}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 my-10">
                <PropertyFormFields form={form} fields={detailNepaliFields} />
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
                  className={`w-1/3 hover:bg-blue-500 border  border-blue-500 hover:text-white text-blue-500 bg-transparent cursor-pointer ${
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
