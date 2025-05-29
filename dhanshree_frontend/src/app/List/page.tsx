"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cardfm from "@/components/Card";
import Listfilter from "@/components/Listfilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProperty } from "@/store/slices/propertyDetailsSlice";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const { posts, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.property
  );
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProperty({ page: currentPage, size: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    console.log("Updated posts:", posts);
  }, [posts]);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "highToLow") return Number(b.price) - Number(a.price);
    if (sortOrder === "lowToHigh") return Number(a.price) - Number(b.price);
    if (sortOrder === "newToOld")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === "oldToNew")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="p-10 lg:p-20 flex flex-col lg:flex-row bg-gray-50 gap-8">
        <div className="block lg:hidden w-full">
          <Listfilter />
        </div>

        <div className="w-full lg:w-2/3">
          <Breadcrumb className="pb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ color: "#74C0FC" }}
                  />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>List</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl font-bold">Available Properties</h1>

          <div className="flex justify-between py-12">
            {isLoading ? (
              <Skeleton className="w-50 h-5" />
            ) : (
              <p> {pagination.total} properties</p>
            )}
            <div className="flex gap-2 items-center">
              <p>Sort By:</p>
              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Default order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="highToLow">
                      Price - High to Low
                    </SelectItem>
                    <SelectItem value="lowToHigh">
                      Price - Low to High
                    </SelectItem>
                    <SelectItem value="newToOld">Date - New to Old</SelectItem>
                    <SelectItem value="oldToNew">Date - Old to New</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-red-500">Error: {error}</p>}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-28">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="lg:w-[350px] h-[550px] w-full shadow-xl relative pt-0 group cursor-pointer gap-4"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-20 py-10">
              {sortedPosts.map((property) => (
                <Cardfm key={property.id} property={property} />
              ))}
            </div>
          )}

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

        <div className="hidden lg:block lg:w-1/3 w-full">
          <Listfilter />
        </div>
      </div>
    </>
  );
}

export default Page;
