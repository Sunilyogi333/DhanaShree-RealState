"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Cardfm from "./Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty } from "@/store/slices/propertyDetailsSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  fetchFeaturedProperties,
  fetchExclusiveProperties,
  fetchLatestProperties,
  fetchEmergingProperties,
} from "@/store/slices/propertyDetailsSlice";

export default function PostCarousel({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    emergingPosts,
    featuredPosts,
    exclusivePosts,
    latestPosts,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.property);

  const getPosts = () => {
    switch (status) {
      case "featured":
        return featuredPosts;
      case "exclusive":
        return exclusivePosts;
      case "latest":
        return latestPosts;
      case "emerging":
        return emergingPosts;
      default:
        return [];
    }
  };

  const posts = getPosts() ?? [];

  useEffect(() => {
    // Dispatch the appropriate thunk based on status
    switch (status) {
      case "featured":
        dispatch(fetchFeaturedProperties({ page: 1, size: 10 }));
        break;
      case "exclusive":
        dispatch(fetchExclusiveProperties({ page: 1, size: 10 }));
        break;
      case "latest":
        dispatch(fetchLatestProperties({ page: 1, size: 10 }));
        break;
      case "emerging":
        dispatch(fetchEmergingProperties({ page: 1, size: 10 }));
        break;
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Group posts into chunks based on screen size
  // Mobile: 1 item, Tablet: 2 items, Desktop: 3 items
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3; // Default
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    // Set initial value
    setItemsPerSlide(getItemsPerSlide());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkedPosts = [];
  for (let i = 0; i < posts.length; i += itemsPerSlide) {
    chunkedPosts.push(posts.slice(i, i + itemsPerSlide));
  }
  const totalSections = chunkedPosts.length;

  return (
    <div className="w-full flex flex-col gap-4  items-end">
      {error ? (
        <p className="text-red-500 text-center w-full mt-10">
          {t("errorFetchingPosts")}
        </p>
      ) : (
        <>
          <div className="w-full flex justify-between mt-4 gap-2 px-4 sm:px-6 lg:px-10">
            <div
              className="lg:mx-auto max-w-2xl text-center py-8 sm:py-12 lg:py-20"
              data-aos="fade-up"
            >
              <h2 className="text-sm sm:text-base font-semibold text-sky-600">
                {t(description)}
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-gray-900">
                {t(title)}
              </p>
            </div>
          </div>

          {/* Carousel Progress Indicators */}
          <div className=" flex justify-center mt-4 gap-2 px-0 sm:px-0 lg:px-10">
            {Array.from({ length: totalSections }).map((_, i) => (
              <div
                key={i}
                className={`w-6 sm:w-8 lg:w-10 h-1 transition-all rounded-lg duration-300 ${
                  i === current ? "bg-sky-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Carousel setApi={setApi} className=" w-full px-0 sm:px-6 lg:px-10">
            <CarouselContent>
              {isLoading ? (
                <CarouselItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                    {Array.from({ length: itemsPerSlide }).map((_, index) => (
                      <div className="flex flex-col space-y-3" key={index}>
                        <Skeleton className="h-[200px] sm:h-[225px] lg:h-[250px] w-full rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-[60px] sm:h-[80px] lg:h-[100px] w-full" />
                          <Skeleton className="h-[60px] sm:h-[80px] lg:h-[100px] w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ) : chunkedPosts.length == 0 ? (
                <CarouselItem>
                  <div className="flex items-center justify-center min-h-[300px] px-4">
                    <p className="text-gray-400 text-sm sm:text-base text-center">
                      Sorry there are no currently any posts here :(
                    </p>
                  </div>
                </CarouselItem>
              ) : (
                chunkedPosts.map((section, index) => (
                  <CarouselItem key={index}>
                    <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-0 sm:p-6 lg:p-8">
                      {section.map((post: any) => (
                        <div key={post.id} className="w-full">
                          <Cardfm property={post} />
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>

            {/* Controls - Hide on mobile if not enough content */}
            {totalSections > 1 && (
              <div className="flex w-full justify-center sm:justify-end gap-3 px-4 sm:px-6 lg:px-10 mt-4">
                <CarouselPrevious className="cursor-pointer relative left-0 translate-y-0" />
                <CarouselNext className="cursor-pointer relative right-0 translate-y-0" />
              </div>
            )}
          </Carousel>

          {!isLoading && posts.length > 0 && (
            <div className="flex justify-center sm:justify-end gap-3 px-4 sm:px-6 lg:px-10">
              <Link href="/List">
                <Button
                  variant="outline"
                  className="bg-sky-700 text-white px-4 py-2 sm:px-6 sm:py-3 hover:bg-sky-800 hover:text-white cursor-pointer text-sm sm:text-base"
                >
                  {t("viewAll")}{" "}
                  <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
