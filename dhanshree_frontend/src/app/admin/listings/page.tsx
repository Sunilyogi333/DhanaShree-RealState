"use client";

import AdminCard from "@/components/admin/aCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Cardfm from "@/components/Card";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";
import { Skeleton } from "@/components/ui/skeleton";

type Property = {
  propertyCode: string;
  price: string;
  // thumbnail: string;
  images: [];
  createdAt: string;
  purpose: string;
  type: string;
  details: {
    frontage: {
      value: string;
      unit: string;
    };
    landArea: {
      value: string;
      unit: string;
    };
  };
  address: {
    municipality: {
      municipalityTitle: string;
    };
    district: {
      districtTitle: string;
    };
    province: {
      provinceTitle: string;
    };
  };
  id: string;
  category: string;
};

export default function AddProperty() {
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const { data, isLoading, error } = useAxiosQuery<{
    data: { properties: Property[] };
  }>("/property", {
    axiosConfig: {
      params: {
        page,
        size: pageSize,
      },
    },
  });

  const properties: Property[] = data?.data?.properties || [];

  const handleEdit = (id: string) => {
    console.log("Edit property:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete property:", id);
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl lg:shadow-md p-6">
        <div className="text-center text-red-500">
          Error loading properties. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl lg:shadow-md p-6 sm:p-5 md:p-10">
        <div className="flex lg:flex-row flex-col justify-between lg:px-10 py-10 ">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            My Listing
          </h1>
          <div className="flex gap-2  items-start  justify-end lg:items-center   ">
            <Button className="border text-white bg-sky-600 hover:bg-sky-600 hover:cursor-pointer hover:shadow-lg">
              <Link href="/admin/listings/addproperty">Add Property</Link>
            </Button>
            <Button className="bg-transparent border border-sky-200 text-sky-600 hover:bg-white hover:shadow-lg hover:cursor-pointer">
              Filter
              <FontAwesomeIcon icon={faFilter} style={{ color: "#74C0FC" }} />
            </Button>
          </div>
        </div>
        <hr />
        <div className="lg:p-10 max-w-4xl lg:space-y-10 space-y-20 mx-auto">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className=" rounded-lg">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : properties && properties.length > 0 ? (
            properties.map((property) => (
              <AdminCard
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No properties found</div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!properties || properties.length < pageSize}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
