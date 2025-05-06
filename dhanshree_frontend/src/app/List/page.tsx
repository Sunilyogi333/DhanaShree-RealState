'use client';
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cardfm from '@/components/Card';
import Listfilter from '@/components/Listfilter';

function Page() {
  // Demo property data
  const propertyList = [
    {
      id: "001",
      type: "house",
      code: "[001]",
      category: "House",
      title: "Spacious Villa",
      price: "12000",
      location: "Bhaisepati, Lalitpur",
      road: "20ft",
      area: "5Ana",
      image: "/user/card/card_1.jpg",
    },
    {
      id: "002",
      type: "apartment",
      code: "[002]",
      category: "Apartment",
      title: "Modern Apartment",
      price: "8000",
      location: "Baneshwor, Kathmandu",
      road: "18ft",
      area: "3BHK",
      image: "/user/card/card_2.jpg",
    },
    {
      id: "003",
      type: "land",
      code: "[003]",
      category: "Land",
      title: "Residential Plot",
      price: "6000",
      location: "Imadol, Lalitpur",
      road: "16ft",
      area: "4Ana",
      image: "/user/card/card_3.jpg",
    },
    {
      id: "004",
      type: "house",
      code: "[004]",
      category: "House",
      title: "Cozy Family House",
      price: "10000",
      location: "Tokha, Kathmandu",
      road: "22ft",
      area: "4.5Ana",
      image: "/user/card/card_1.jpg",
    },
    {
      id: "004",
      type: "flat",
      code: "[004]",
      category: "Flat",
      title: "Cozy Family House",
      price: "10000",
      location: "Tokha, Kathmandu",
      road: "22ft",
      area: "4.5Ana",
      image: "/user/card/card_1.jpg",
    },
  ];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(propertyList.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = propertyList.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className='p-10 lg:p-20 flex flex-col lg:flex-row bg-gray-50 gap-8'>
        <div className="block lg:hidden w-full">
          <Listfilter />
        </div>

        <div className="w-full lg:w-2/3">
          <Breadcrumb className='pb-10'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={faHouse} style={{ color: "#74C0FC" }} />
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

          <div className="flex justify-between py-8">
            <p>{propertyList.length} properties</p>
            <div className="flex gap-2 items-center">
              <Select>
                <p>Sort By:</p>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Default order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="highToLow">Price - High to Low</SelectItem>
                    <SelectItem value="lowToHigh">Price - Low to High</SelectItem>
                    <SelectItem value="newToOld">Date - New to Old</SelectItem>
                    <SelectItem value="oldToNew">Date - Old to New</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-12">
          {paginatedProperties.map((property) => (
              <Cardfm key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/3 w-full">
          <Listfilter />
        </div>
      </div>
    </>
  );
}

export default Page;
