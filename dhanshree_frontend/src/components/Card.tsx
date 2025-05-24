"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  faLocationDot,
  faRoad,
  faHouse,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";

function Cardfm({ property }: { property: fetchPropertyDetails }) {
  return (
    <Link href={`/List/${property.type}/${property.id}`}>
      <Card className="lg:w-[400px] h-[550px] w-full shadow-xl relative pt-0 group cursor-pointer gap-4">
        <div className="group h-2/3 relative">
          <img
            src={property.images[0].url}
            alt={property.type}
            className="rounded-tl-lg rounded-tr-lg h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-20"></div>
        </div>

        <button className="absolute bg-green-700 text-white text-sm rounded-lg p-3 top-1 start-1">
          {property.status}
        </button>

        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center mb-1">
              <h1 className="font-bold text-sm text-green-500">
                {property.propertyCode}
              </h1>
              <span className="text-sm bg-sky-300 text-white rounded-lg px-2 py-1">
                {property.type}
              </span>
            </div>
            <h1 className="font-semibold text-lg">
              {property.type} for {property.purpose} in{" "}
              <span className="text-sky-500">Rs {property.price}</span>
            </h1>
          </CardTitle>
          <CardDescription className="flex flex-col space-y-2 mt-2 ">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} />
              Location: {property.address?.municipality?.municipalityTitle},
              {property.address?.district?.districtTitle},
              {property.address?.province?.provinceTitle}
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faRoad} style={{ color: "#74C0FC" }} />
              Road: {property.details.frontage.value}{" "}
              {property.details.frontage.unit}
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHouse} style={{ color: "#74C0FC" }} />
              Area: {property.details.landArea.value}{" "}
              {property.details.landArea.unit}
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent />
      </Card>
    </Link>
  );
}

export default Cardfm;
