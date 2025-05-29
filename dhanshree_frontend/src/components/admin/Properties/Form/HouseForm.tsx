"use client";
import React, { useState } from "react";
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

  bedrooms: 1,
  bedroomsNep: "",

  kitchens: 1,
  kitchensNep: "",

  floors: 1,
  floorsNep: "",

  livingRooms: 1,
  livingRoomsNep: "",

  parkingSpaces: 1,
  parkingSpacesNep: "",

  builtArea: 10,
  builtAreaUnit: "",
  builtAreaNep: "",

  landArea: 10,
  landAreaUnit: "",
  landAreaNep: "",

  propertyPurpose: "sale",

  province: 1,
  district: 0,
  municipality: 1,
  wardNo: 1,
};

export default function HouseForm ( { values ,initialImages}: { values?: Partial<HouseFormValues>,initialImages?: {url?:string,type:string,id:string}[] }) {
  console.log("values in the house form ", values,initialImages);
  
  const mergedDefaultValues = {
    ...defaultValues,
    ...values, 
  };

console.log("merged default values in the house form ", mergedDefaultValues);

const thumbnail = initialImages?.find((img) => img.type === "thumbnail")?.url || "";
const normalImages = initialImages
  ?.filter((img) => img.type === "normal")
  .map((img) => img.url);

  const form = useForm<HouseFormValues>({
    resolver: zodResolver(houseFormSchema),
    defaultValues:mergedDefaultValues,
  });

  const { createProperty, isLoading } = useCreateProperty();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onInvalid = (errors: FieldErrors<HouseFormValues>) => {
    console.log("errors are ", errors);
    toast.error("please Fix all errors and try again ");
  };

  const onSubmit = async (values: HouseFormValues) => {
    try {
      setIsSubmitting(true);
      const thumbnailFile = values.thumbnail;
      const imageFiles = values.images;

      const formData = new FormData();
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      imageFiles?.forEach((img) => formData.append("images", img));

      const imageRes = await uploadImages(formData);
      if (!imageRes.success) {
        throw new Error("Image upload failed");
      }

      const imageIds = imageRes.images.map((img: any) => img.id);
      const payload = transformHouseForm(values);
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
              <PropertyImageUpload form={form} 
                // initialImageUrls={normalImages}
               initialThumbnailUrl={thumbnail}/>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className={`w-1/3 hover:bg-blue-500 border  border-blue-500 hover:text-white text-blue-500 bg-transparent cursor-pointer ${
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
