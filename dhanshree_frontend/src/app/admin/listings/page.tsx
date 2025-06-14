"use client";

import AdminCard from "@/components/admin/aCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Cardfm from "@/components/Card";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProperty } from "@/store/slices/propertyDetailsSlice";
import { fetchPropertyDetails } from "@/types/property";

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
  status: string;
};

export default function AddProperty() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const itemsPerPage = 4;

  const [deletingId, setDeletingId] = useState<string | null>(null);


  const { posts, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.property
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProperty({ page: currentPage, size: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  

  const properties: fetchPropertyDetails[] = posts || [];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
    const res= await $axios.delete(`/property/${id}`);
    console.log(res)
    return res.data.data
    },
    onSuccess: () => {
      toast.success("Property deleted successfully!");
      dispatch(fetchProperty({ page: currentPage, size: itemsPerPage }));
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Failed to delete property.";
      toast.error(msg);
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    console.log("Delete property:", id);
    setDeletingId(id);
    deleteMutation.mutate(id);
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
                onDelete={handleDelete}
                isDeleting={deletingId === property.id}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No properties found</div>
          )}
        </div>
      
        {isLoading ? (
            <Skeleton className="w-50 h-5" />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border transition cursor-pointer ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white border-gray-300"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded border transition cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded border transition cursor-pointer ${
                currentPage === pagination.totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white border-gray-300"
              }`}
            >
              Next
            </button>
          </div>
          )}
      </div>
      
    </>
  );
}
