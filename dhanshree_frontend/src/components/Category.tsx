"use client";
import React from "react";
import Image from "next/image";

type Category = {
  title: string;
  listings: number;
  imageUrl: string;
};

const categories: Category[] = [
  {
    title: "Apartment",
    listings: 120,
    imageUrl: "/user/category/category_1.jpg",
  },
  {
    title: "Spaces",
    listings: 80,
    imageUrl: "/user/category/category_2.jpg",
  },
  {
    title: "House",
    listings: 95,
    imageUrl: "/user/category/category_3.jpg",
  },
  {
    title: "Land",
    listings: 60,
    imageUrl: "/user/category/category_1.jpg",
  },
  {
    title: "Flat",
    listings: 110,
    imageUrl: "/user/category/category_1.jpg",
  },
];

export function Category() {
  return (
    <section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Explore by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md lg:h-80 h-64  w-full cursor-pointer"
          >
        <Image
  src={category.imageUrl}
  alt={category.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-300 z-0" // 👈 Image should be z-0
  priority
/>
<div className="absolute inset-0 bg-black opacity-20 flex flex-col items-center justify-center text-white p-4 transition-opacity duration-300 z-10 group-hover:opacity-70">
  <h3 className="text-xl font-semibold">{category.title}</h3>
  <p className="text-sm mt-2">{category.listings} Listings</p>
</div>
          </div>
        ))}
      </div>
    </section>
  );
}
