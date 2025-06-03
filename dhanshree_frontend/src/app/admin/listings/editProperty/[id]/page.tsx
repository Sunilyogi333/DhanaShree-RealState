"use client";
import { fetchPropertyDetails, PropertyStatus } from "@/types/property";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPropertyById } from "@/store/slices/propertyDetailsSlice";
const ApartmentForm = dynamic(
  () => import("@/components/admin/Properties/Form/ApartmentForm"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const FlatForm = dynamic(
  () => import("@/components/admin/Properties/Form/FlatForm")
);
const HouseForm = dynamic(
  () => import("@/components/admin/Properties/Form/HouseForm")
);
const LandForm = dynamic(
  () => import("@/components/admin/Properties/Form/LandForm")
);
const SpaceForm = dynamic(
  () => import("@/components/admin/Properties/Form/SpaceForm")
);

function page() {
  const params = useParams();
  const { type, id } = params;

  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost, isLoading, error } = useSelector(
    (state: RootState) => state.propertyDetails
  );

  console.log("id is", id);
  useEffect(() => {
    dispatch(fetchPropertyById(id as string));
  }, [dispatch, id]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log("error is", error);
    return <div>Error: {error}</div>;
  }

  console.log("property in edit page ", selectedPost);

  const defaultValues = {
    propertyCode: selectedPost?.propertyCode || "",
    type: "house",
    askingPrice: selectedPost?.price,
    askingPriceNep: "",
    frontage: selectedPost?.details?.frontage?.value || 0,
    frontageUnit: selectedPost?.details?.frontage?.unit || "m",
    frontageNep: "",

    facing: selectedPost?.details.facing,
    furnished: selectedPost?.details.furnishing || "semi",

    description: selectedPost?.details?.description?.en || "",
    descriptionNp: selectedPost?.details?.description?.np || "",

    status: selectedPost?.status || PropertyStatus.EMERGING,
    builtYear: selectedPost?.details?.builtYear || 1990,
    builtYearNep: "",

    images: [] as unknown as File[],

    thumbnail: {} as File,

    facilities: selectedPost?.details?.facilities || ["parking"],

    bedrooms: selectedPost?.details?.bedrooms || 1,
    bedroomsNep: "",

    kitchens: selectedPost?.details?.kitchens || 1,
    kitchensNep: "",

    floors: selectedPost?.details?.floors || 1,
    floorsNep: "",

    livingRooms: selectedPost?.details?.livingRooms || 1,
    livingRoomsNep: "",

    parkingSpaces: selectedPost?.details?.parking || 1,
    parkingSpacesNep: "",

    builtArea: selectedPost?.details?.builtInArea?.value || 10,
    builtAreaUnit: selectedPost?.details?.builtInArea?.unit || "sqm",
    builtAreaNep: "",

    landArea: selectedPost?.details?.landArea?.value || 10,
    landAreaUnit: selectedPost?.details?.landArea?.unit || "sqm",
    landAreaNep: "",

    propertyPurpose: selectedPost?.purpose || "sale",

    province: Number(selectedPost?.address?.province?.id) || 1,
    district: Number(selectedPost?.address?.district?.id) || 0,
    municipality: Number(selectedPost?.address?.municipality?.id) || 1,
    wardNo: Number(selectedPost?.address?.ward?.id) || 1,
    // zoiningg: selectedPost?.details?.zoning || "residential",
  };

  const renderForm = () => {
    switch (selectedPost?.type) {
      case "house":
        return (
          <HouseForm
            values={defaultValues}
            edit={true}
            initialImages={selectedPost?.images
              ?.filter((img) => img.id)
              .map((img) => ({
                ...img,
                type: img.type === "thumbnail" ? "thumbnail" : "normal",
                id: img.id as string,
              }))}
            propertyId={id as string}
          />
        );

      case "land":
        return (<LandForm    values={defaultValues}
        edit={true}
        initialImages={selectedPost?.images
          ?.filter((img) => img.id)
          .map((img) => ({
            ...img,
            type: img.type === "thumbnail" ? "thumbnail" : "normal",
            id: img.id as string,
          }))}
        propertyId={id as string} />
        );
      case "apartment":
        return (
          <ApartmentForm
            values={defaultValues}
            edit={true}
        initialImages={selectedPost?.images
          ?.filter((img) => img.id)
          .map((img) => ({
            ...img,
            type: img.type === "thumbnail" ? "thumbnail" : "normal",
            id: img.id as string,
          }))}
        propertyId={id as string} />
        );
      case "flat":
        return (<FlatForm
        values={defaultValues}
        edit={true}
        initialImages={selectedPost?.images
          ?.filter((img) => img.id)
          .map((img) => ({
            ...img,
            type: img.type === "thumbnail" ? "thumbnail" : "normal",
            id: img.id as string,
          }))}
        propertyId={id as string} />)
      case "space":
        return (
          <SpaceForm
            values={defaultValues}
            edit={true}
        initialImages={selectedPost?.images
          ?.filter((img) => img.id)
          .map((img) => ({
            ...img,
            type: img.type === "thumbnail" ? "thumbnail" : "normal",
            id: img.id as string,
          }))}
          propertyId={id as string} />);
      default:
        return null;
    }
  };
  return <>{renderForm()}</>;
}

export default page;
