"use client";
import React from "react";
import { LayoutGrid } from "./ui/layout-grid";

export function Category() {
  return (
    
    <div className="h-screen py-20 w-full">
     <div className="text-center mb-10">
  <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
    Browse by the categories
  </h2>
  <p className="mt-4 text-sm md:text-lg text-sky-800 max-w-2xl mx-auto">
    Find properties based on your preference—be it riverside peace, forest
    retreats, hilltop views, or green escapes.
  </p>
</div>
      <LayoutGrid cards={cards} />
    </div>
  );
}

const CardText = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="text-white">
      <p className="font-bold md:text-4xl text-xl">{title}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {description}
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: (
      <CardText
        title="Luxury Flats"
        description="Explore our collection of lavish Flats designed for upscale comfort and elegance."
      />
    ),
    className: "md:col-span-2",
    thumbnail:
      "user/category/category_1.jpg",
  },
  {
    id: 2,
    content: (
      <CardText
        title="Modern Apartments"
        description="Discover chic and smartly designed apartments in the heart of the city."
      />
    ),
    className: "col-span-1",
    thumbnail:
      "user/category/category_1.jpg",
  },
  {
    id: 3,
    content: (
      <CardText
        title=" Homes"
        description="Live in harmony with nature with our sustainable and eco-friendly homes."
      />
    ),
    className: "col-span-1",
    thumbnail:
      "user/category/category_2.jpg",
  },
  {
    id: 4,
    content: (
      <CardText
        title="Lands"
        description="Buy a land at suitable price and see it grow the money"
      />
    ),
    className: "md:col-span-2",
    thumbnail:
      "user/category/category_3.jpg",
  },
];
