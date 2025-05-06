'use client';

import React, { useState,useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Gallery from "@/components/Gallery";
import { Tabs } from "@radix-ui/react-tabs";
import InnerTab from "@/components/InnerDetail/Tabs";
import Innerform from "@/components/InnerDetail/form";
import { useParams } from 'next/navigation';  // Correct way to get dynamic params



function page() {
  const params = useParams();
  const { type, id } = params;  // Get type and id from params

  // If the params are missing, show a loading message
  if (!type || !id) return <div>Loading...</div>;

  console.log("type and id is",type,id);

  return (
    <>

      <section className="bg-gray-50 p-20">
        <Breadcrumb className="pb-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="flex gap-2 items-center">
            
                <FontAwesomeIcon icon={faHouse }  />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                {/* <Link href="/components"> */}
                List
                {/* </Link> */}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-3">

        <div className="flex gap-2 items-center ">
          <button className=" bg-green-700 text-white text-sm rounded-lg px-2 py-1">
            Featured
          </button>
          <button className="text-sm bg-sky-300 text-white rounded-lg px-2 py-1">
            House
          </button>
        </div>
        <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium">Property Code:[012233]</h1>
            <div className="flex justify-start items-center gap-2 text-sm">
                </div>

        </div>
          <h1 className="text-3xl font-bold text-sky-700">Rs 2,12,12,123</h1>
        </div>
        </div>
        <div className="flex justify-start items-center gap-2 text-gray-500">
           <FontAwesomeIcon icon={faLocationDot} /> Location: Imadol,lalitpur
           </div>
            <Gallery/>
          
            <div className="flex flex-col lg:flex-row gap-8  py-20 px-4">
      {/* Left Section - Property Details */}
<InnerTab propertyType={type}/>

      {/* Right Section - Booking Form */}
  <Innerform/>
    </div>

        </section>

    </>
  );
}

export default page;
