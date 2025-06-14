"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRoad,
  faHouse,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchPropertyDetails } from "@/types/property";


export default function AdminCard({
  property,
  onDelete,
  isDeleting
}: {
  property: fetchPropertyDetails ;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}) {
  function formatDateString(dateStr: string | undefined) {
    if (!dateStr) return "Invalid date";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date";

    return format(date, "dd MMM yyyy"); // or your preferred format
  }

  return (
    <>
      {/* Large Screen Layout - Horizontal */}
      <Card className="   hidden md:flex w-full flex-row items-stretch  rounded-xl border-none overflow-hidden p-3 sm:p-4 gap-3 sm:gap-4 bg-white  transition hover:cursor-pointer">
        <CardContent className="w-full flex flex-row items-stretch gap-3 sm:gap-4 p-0 border-none border-0">
          {/* Image Container */}
          <div className="w-1/3 md:w-1/3 h-full md:h-full relative rounded-md overflow-hidden bg-gray-100">
            {property.images[0].url ? (
              <Image
                src={property.images[0].url}
                alt={"Property image"}
                fill
                className="object-cover"
                // sizes="(max-width: 768px) 128px, 160px"
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="flex-1 flex flex-col gap-1 sm:gap-2 text-sm min-w-0 border-none">
            <CardHeader className="p-0  border-none ">
              <CardTitle className="flex items-center justify-start gap-2">
                <span className="font-bold text-green-600 truncate text-sm sm:text-base">
                  [{property.propertyCode} ]
                </span>
                <span className="text-xs bg-sky-300 text-white rounded px-2 py-1 whitespace-nowrap">
                  {property.type}
                </span>
              </CardTitle>
            </CardHeader>

            <CardDescription className="flex flex-col gap-1 sm:gap-2 border-none ">
              <h2 className="font-semibold text-sm sm:text-base truncate">
                {property.type} for {property.purpose} in
              </h2>
              <p className="text-sky-500 font-bold text-sm sm:text-base">
                Rs {property.price}
              </p>

              <div className="flex flex-col gap-x-3 gap-y-1 mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm">
                <span className="flex items-center gap-1 min-w-0 truncate">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="flex-shrink-0"
                  />
                  <span className="truncate">
                    {property.address?.municipality?.municipalityTitle},
                    {property.address?.district?.districtTitle},
                    {property.address?.province?.provinceTitle}
                  </span>
                </span>
                <span className="flex items-center gap-1 min-w-0 truncate">
                  <FontAwesomeIcon icon={faRoad} className="flex-shrink-0" />
                  <span className="">
                    {property.details.frontage.value}{" "}
                    {property.details.frontage.unit}
                  </span>
                </span>
                <span className="flex items-center gap-1 min-w-0 truncate">
                  <FontAwesomeIcon icon={faHouse} className="flex-shrink-0" />
                  <span className="truncate">
                    {property.details.landArea.value}{" "}
                    {property.details.landArea.unit}
                  </span>
                </span>
              </div>
            </CardDescription>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-end gap-2 ml-4">
            <h1 className="text-sm font-semibold">
              published on :{formatDateString(property.createdAt)}
            </h1>

            <div className="flex gap-3 items-start">
              <Link href={`/admin/listings/editProperty/${property.id}`}>
                <button
                  className="text-sky-600 hover:text-blue-800 p-1 sm:p-1.5 flex gap-2 items-center cursor-pointer"
                  title="Edit"
                  aria-label="Edit property"
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-base sm:text-lg"
                  />
                  Edit
                </button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger
                  className="text-red-400 hover:text-red-800 p-1 sm:p-1.5 flex gap-2 items-center cursor-pointer"
                  title="Delete"
                  aria-label="Delete property"
                  disabled={isDeleting}

                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-base sm:text-lg"
                  />
                   {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the current post and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={() => onDelete(property.id)} className="bg-red-600 text-white hover:bg-red-700">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Small Screen Layout - Vertical */}
      <Card className="md:hidden w-full h-[500px] shadow-xl relative pt-0 group cursor-pointer">
        <div className="group h-2/3 relative">
          {property.images[0].url ? (
            <Image
              src={property.images[0].url}
              alt={ "Property image"}
              className="rounded-tl-lg rounded-tr-lg h-full w-full object-cover"
              fill
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 rounded-tl-lg rounded-tr-lg">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-20"></div>
        </div>

        <button className="absolute bg-green-700 text-white text-sm rounded-lg p-3 top-1 start-1">
          Featured
        </button>

        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center mb-1">
              <h1 className="font-bold text-sm text-green-500">
                [{property.propertyCode} ]
              </h1>
              <span className="text-sm bg-sky-300 text-white rounded-lg px-2 py-1">
                {property.type}
              </span>
            </div>
            <h1 className="font-semibold text-lg">
              {property.type} for {property.purpose} in
              <span className="text-sky-500">Rs {property.price}</span>
            </h1>
          </CardTitle>
          <CardDescription className="flex flex-col space-y-2 mt-2">
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
        <CardFooter className="flex justify-between gap-3">
          <Link href={`/admin/listings/editproperty/${property.id}`}>
            <button
              className="text-sky-600 hover:text-blue-800 p-1 sm:p-1.5 flex gap-2 items-center"
              title="Edit"
              aria-label="Edit property"
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-base sm:text-lg"
              />
              Edit
            </button>
          </Link>
          <button
            onClick={() => onDelete(property.id)}
            className="text-red-300 hover:text-red-700 p-1 sm:p-1.5 flex gap-2 items-center curosor-pointer"
            title="Delete"
            aria-label="Delete property"
          >
            <FontAwesomeIcon icon={faTrash} className="text-base sm:text-lg" />
            Delete
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
