"use client";

import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Gallery from "@/components/Gallery";
import InnerTab from "@/components/InnerDetail/Tabs";
import Innerform from "@/components/InnerDetail/form";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPropertyById } from "@/store/slices/propertyDetailsSlice";
import { fetchPropertyDetails } from "@/types/property";


function PropertyDetailsPage() {
  const params = useParams();
  const { type, id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost, isLoading, error } = useSelector((state: RootState) => state.propertyDetails);

  console.log("id is",id);
 
  useEffect(() => {
    dispatch(fetchPropertyById(id as string));
  }, [dispatch, id]);
if(isLoading){
  return <div>Loading...</div>
}
if(error){
  console.log("error is",error);
  return <div>Error: {error}</div>
}

  console.log("posts are",selectedPost);

  if(!selectedPost){
    return <div>No post found</div>
  }

  const images = selectedPost?.images.map((image) => image.url) || [];

  return (
    <>
        <section className="bg-gray-50 p-20">
            <Breadcrumb className="pb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faHouse} />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>List</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <button className="bg-green-700 text-white text-sm rounded-lg px-2 py-1">
              {selectedPost?.status}
            </button>
            <button className="text-sm bg-sky-300 text-white rounded-lg px-2 py-1">
              {selectedPost?.type}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-medium">
                Property Code: [{selectedPost?.propertyCode}]
              </h1>
            </div>
            <h1 className="text-3xl font-bold text-sky-700">
              Rs{" "}
              {selectedPost?.price}
            </h1>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 text-gray-500 my-10">
          <FontAwesomeIcon icon={faLocationDot} />
          Location:
          {selectedPost?.address?.municipality?.municipalityTitle},
          {selectedPost?.address?.district?.districtTitle},
          {selectedPost?.address?.province?.provinceTitle}
        </div>
        <Gallery images={images} />

        <div className="flex flex-col lg:flex-row gap-8 py-20 px-4">
          <InnerTab property={selectedPost as fetchPropertyDetails} isLoading={isLoading} error={error} />
          <Innerform  propertyId={selectedPost.id}/>
        </div>
      </section>
    </> 
  );
}

export default PropertyDetailsPage;
