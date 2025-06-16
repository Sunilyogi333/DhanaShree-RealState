"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import { faFilter, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { houseDefaultValues } from "@/config/defaultValues";
import { useTranslation } from "react-i18next";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "House", value: "house" },
    { name: "Land", value: "land" },
    { name: "Apartment", value: "apartment" },
    { name: "Flat", value: "flat" },
    { name: "Space", value: "space" },
  ];

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
  };

  console.log("houseDefaultValues", houseDefaultValues);

  const renderForm = () => {
    switch (selectedCategory) {
      case "house":
        return <HouseForm/>;
      case "land":
        return <LandForm />;
      case "apartment":
        return <ApartmentForm />;
      case "flat":
        return <FlatForm />;
      case "space":
        return <SpaceForm />;
      default:
        return null;
    }
  };

  const goBack = () => {
    setSelectedCategory(null);
  };
  const { t } = useTranslation();
  return (

    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 sm:p-8 md:p-10">
    {/* Header with back arrow */}
    <div className="flex items-center gap-3 mb-8">
      <Link href="/admin/listings">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-sky-600 hover:text-sky-800 transition-colors"
          size="lg"
        />
      </Link>
      <h1 className="text-2xl font-bold text-gray-800">{t("addProperty")}</h1>
    </div>
  
    {/* Form or Category Selection */}
    {selectedCategory ? (
      <>
        <button
          onClick={goBack}
          className="mb-6 flex items-center text-sky-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Categories
        </button>
  
        {/* Property Form */}
        {renderForm()}
      </>
    ) : (
      <>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
         {t("selectPropertyType")}
        </h2>
        <p className="text-gray-600 mb-8">
         {t("selectTypeToProceed")}
        </p>
  
        {/* Category Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleSelect(category.value)}
              className={`w-full px-5 py-4 rounded-lg border text-lg font-medium transition-all duration-200
                ${
                  selectedCategory === category.value
                    ? "border-sky-500 text-sky-600 bg-sky-50"
                    : "border-gray-200 text-gray-700 hover:border-sky-400 hover:text-sky-600 hover:shadow"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
  
  );
}

export default page;
