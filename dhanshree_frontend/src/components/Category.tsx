"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";
import Link from "next/link";
// Fix the Category type definition
type Category = {
  title: string;
  listings: number;
  imageUrl: string;
  filterBy: string; 
};

// Define the API response type
type DashboardResponse = {
  data: {
    propertyByType: {
      land: number;
      house: number;
      apartment: number;
      flat: number;
      space: number;
    };
  };

};

export function Category() {
  const { t } = useTranslation();

  const response = useAxiosQuery<DashboardResponse>("/overview/dashboard");

//   if (response.isLoading) {
//   return <p>Loading...</p>;
// }

if (response.isError) {
  return <p>Failed to load categories.</p>;
}
  console.log("Response from API:", response.data);
  const categories: Category[] = [
    {
      title: t("apartment"),
      listings: response.data?.data?.propertyByType?.apartment || 0,
      imageUrl: "/user/category/category_1.jpg",
      filterBy:"apartment"
    },
    {
      title: t("spaces"),
      listings: response.data?.data?.propertyByType?.space || 0,
      imageUrl: "/user/category/category_2.jpg",
      filterBy:"space"
    },
    {
      title: t("houses"),
      listings: response?.data?.data?.propertyByType?.house || 0,
      imageUrl: "/user/category/category_3.jpg",
      filterBy:"house"
    },
    {
      title: t("land"),
      listings: response.data?.data?.propertyByType?.land || 0,
      imageUrl: "/user/category/category_1.jpg",
      filterBy:"land"
    },
    {
      title: t("flats"),
      listings: response.data?.data?.propertyByType?.flat || 0,
      imageUrl: "/user/category/category_1.jpg",
      filterBy:"flat"
    },
  ];

  return (
    <section className="pt-30 px-4 md:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("exploreByCategory")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {categories.map((category, index) => (
          <Link key={index} href={`/List?type=${category.filterBy}`} className="group">
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md lg:h-80 h-64 w-full cursor-pointer"
          >
            <Image
              src={category.imageUrl}
              alt={category.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300 z-0"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-20 flex flex-col items-center justify-center text-white p-4 transition-opacity duration-300 z-10 group-hover:opacity-70">
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <p className="text-sm mt-2">
                {category.listings} {t("listings")}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
