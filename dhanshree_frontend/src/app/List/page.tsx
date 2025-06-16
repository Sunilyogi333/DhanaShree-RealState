"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
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
import { useTranslation } from "react-i18next";
import { formatNumberByLanguage } from "@/utils/formatNumberByLanguage";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import $axios from "@/lib/axios.instance";
import { getLocalizedLabel } from "@/utils/formatAddressByLanguage";
// import { getLocalizedLabel } from "@/lib/getLocalizedLabel";

function Page() {
  const { posts, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.property
  );
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    district: "", // Keep as string for URL handling
    municipality: "", // Keep as string for URL handling
    minPrice: "",
    maxPrice: "",
    purpose: "sale",
    status: "all",
    propertyCode: "",
  });
  const itemsPerPage = 4;

  const { t, i18n } = useTranslation();

  // const [districtFields, setDistrictFields] = useState<
  //   { id: string; districtTitle: string }[]
  // >([]);
  // const [municipalityFields, setMunicipalityFields] = useState<
  //   { id: string; municipalityTitle: string }[]
  // >([]);

  const fetchProperties = useCallback(
    (filtersToUse: typeof filters, pageToUse: number) => {
      const apiParams: Record<string, any> = {
        page: pageToUse,
        size: itemsPerPage,
      };

      // Add filters only if they have values and are not "all"
      if (filtersToUse.type && filtersToUse.type !== "") {
        apiParams.type = filtersToUse.type;
      }

      // Convert district and municipality to numbers for backend
      if (
        filtersToUse.district &&
        filtersToUse.district !== "" &&
        filtersToUse.district !== "all"
      ) {
        apiParams.district = parseInt(filtersToUse.district);
      }
      if (
        filtersToUse.municipality &&
        filtersToUse.municipality !== "" &&
        filtersToUse.municipality !== "all"
      ) {
        apiParams.municipality = parseInt(filtersToUse.municipality);
      }

      // Pass minPrice and maxPrice as separate parameters
      if (filtersToUse.minPrice && filtersToUse.minPrice !== "") {
        apiParams.minPrice = filtersToUse.minPrice;
      }
      if (filtersToUse.maxPrice && filtersToUse.maxPrice !== "") {
        apiParams.maxPrice = filtersToUse.maxPrice;
      }
      if (filtersToUse.purpose && filtersToUse.purpose !== "") {
        apiParams.purpose = filtersToUse.purpose;
      }
      if (filtersToUse.status && filtersToUse.status !== "all") {
        apiParams.status = filtersToUse.status;
      }
      if (filtersToUse.propertyCode && filtersToUse.propertyCode !== "") {
        apiParams.propertyCode = filtersToUse.propertyCode;
      }

      console.log("API Parameters being sent:", apiParams);
      dispatch(fetchProperty(apiParams));
    },
    [dispatch, itemsPerPage]
  );

 

  // Handle URL changes and initial load
  useEffect(() => {
    const urlFilters = {  
      type: searchParams.get("type") || "",
      district: searchParams.get("district") || "",
      municipality: searchParams.get("municipality") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      purpose: searchParams.get("purpose") || "sale",
      status: searchParams.get("status") || "all",
      propertyCode: searchParams.get("propertyCode") || "",
    };

    console.log("URL changed, new filters:", urlFilters);

    // Always start from page 1 when filters come from URL
    setFilters(urlFilters);
    setCurrentPage(1);

    // Fetch with new filters and page 1
    fetchProperties(urlFilters, 1);
  }, [searchParams, fetchProperties]);

  // Handle pagination changes (only when not from URL)
  useEffect(() => {
    // Only fetch if we're not on page 1 (to avoid double fetch on initial load)
    if (currentPage > 1) {
      console.log("Page changed to:", currentPage);
      fetchProperties(filters, currentPage);
    }

  }, [currentPage, filters, fetchProperties]);

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
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
  };

  // Helper function to format price range for display
  const formatPriceRange = (minPrice: string, maxPrice: string) => {
    if (!minPrice && !maxPrice) return "";

    const formatPrice = (price: string) => {
      const num = parseInt(price);
      if (num >= 10000000) {
        return `${(num / 10000000).toFixed(1)} Crore`;
      } else if (num >= 100000) {
        return `${(num / 100000).toFixed(1)} Lakh`;
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}K`;
      }
      return num.toString();
    };

    if (minPrice && maxPrice) {
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    } else if (minPrice) {
      return `Above ${formatPrice(minPrice)}`;
    } else if (maxPrice) {
      return `Below ${formatPrice(maxPrice)}`;
    }
    return "";
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "purpose") return value && value !== "sale";
    if (key === "status") return value && value !== "all";
    if (key === "district") return value && value !== "" && value !== "all";
    if (key === "municipality") return value && value !== "" && value !== "all";
    return value && value !== "";
  });

  // // Helper function to get location name by ID
  // const getLocationName = (id: string, type: "district" | "municipality") => {
  //   const data = type === "district" ? districtFields : municipalityFields;
  //   const field = data.find((item) => item.id.toString() === id);
  //   return field ? getLocalizedLabel(field, i18n.language) : id;
  // };

  // Remove a specific filter
  const removeFilter = (filterKey: keyof typeof filters) => {
    const newFilters = { ...filters };
    if (filterKey === "purpose") {
      newFilters[filterKey] = "sale"; // Reset to default
    } else if (
      filterKey === "status" ||
      filterKey === "district" ||
      filterKey === "municipality"
    ) {
      newFilters[filterKey] = "all"; // Reset to default
    } else {
      newFilters[filterKey] = "";
    }

    // Update URL
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (
        value &&
        value !== "" &&
        !(key === "purpose" && value === "sale") &&
        !(
          (key === "status" || key === "district" || key === "municipality") &&
          value === "all"
        )
      ) {
        queryParams.append(key, value);
      }
    });

    window.history.pushState({}, "", `/List?${queryParams.toString()}`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    window.history.pushState({}, "", "/List");
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

          {/* Display active filters */}
          {/* {hasActiveFilters && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-gray-700">
                  {t("activeFilters")}:
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {t("clearAll")}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.propertyCode && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    <span>
                      {t("code")}: {filters.propertyCode}
                    </span>
                    <button
                      onClick={() => removeFilter("propertyCode")}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {filters.type && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <span>
                      {t("type")}:{" "}
                      {filters.type
                        .split(",")
                        .map((type) => t(type))
                        .join(", ")}
                    </span>
                    <button
                      onClick={() => removeFilter("type")}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {filters.status && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    <span>
                      {t("status")}: {t(filters.status)}
                    </span>
                    <button
                      onClick={() => removeFilter("status")}
                      className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {filters.district && filters.district !== "all" && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <span>
                      {t("district")}:{" "}
                      {(filters.district, "district")}
                    </span>
                    <button
                      onClick={() => removeFilter("district")}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {filters.municipality && filters.municipality !== "all" && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                    <span>
                      {t("municipality")}:{" "}
                      {(filters.municipality, "municipality")}
                    </span>
                    <button
                      onClick={() => removeFilter("municipality")}
                      className="ml-1 hover:bg-teal-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    <span>
                      {t("price")}:{" "}
                      {formatPriceRange(filters.minPrice, filters.maxPrice)}
                    </span>
                    <button
                      onClick={() => {
                        removeFilter("minPrice");
                        removeFilter("maxPrice");
                      }}
                      className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {filters.purpose && filters.purpose !== "sale" && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    <span>
                      {t("purpose")}: {t(filters.purpose)}
                    </span>
                    <button
                      onClick={() => removeFilter("purpose")}
                      className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )} */}

          <h1 className="text-3xl font-bold">{t("availableProperties")}</h1>
          <div className="flex justify-between py-12">
            {isLoading ? (
              <Skeleton className="w-50 h-5" />
            ) : (
              <p>
                {formatNumberByLanguage(pagination.total, i18n.language)}{" "}
                {t("properties")}
              </p>
            )}
            <div className="flex gap-2 items-center">
              <p>{t("sortBy")}</p>
              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("defaultOrder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="highToLow">
                      {t("priceHighToLow")}
                    </SelectItem>
                    <SelectItem value="lowToHigh">
                      {t("priceLowToHigh")}
                    </SelectItem>
                    <SelectItem value="newToOld">
                      {t("dateNewToOld")}
                    </SelectItem>
                    <SelectItem value="oldToNew">
                      {t("dateOldToNew")}
                    </SelectItem>
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

          {!isLoading && sortedPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t("noPropertiesFound")}</p>
              <p className="text-gray-400 text-sm mt-2">
                {t("tryAdjustingFilters")}
              </p>
            </div>
          )}

          {pagination.totalPages > 0 && (
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
                {t("previous")}
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
                  {formatNumberByLanguage(index + 1, i18n.language)}
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
                {t("next")}
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
