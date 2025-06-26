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
  fetchLatestProperties ,
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

  const { emergingPosts,featuredPosts, exclusivePosts, latestPosts, isLoading, error } = useSelector(
    (state: RootState) => state.property
  );

 const getPosts = () => {
    switch (status) {
      case 'featured':
        return featuredPosts;
      case 'exclusive':
        return exclusivePosts;
      case 'latest':
        return latestPosts;
      case 'emerging':
        return emergingPosts;
      default:
        return [];
    }
  };

  const posts = getPosts() ?? [];

  useEffect(() => {
    // Dispatch the appropriate thunk based on status
    switch (status) {
      case 'featured':
        dispatch(fetchFeaturedProperties({ page: 1, size: 10 }));
        break;
      case 'exclusive':
        dispatch(fetchExclusiveProperties({ page: 1, size: 10 }));
        break;
      case 'latest':
        dispatch(fetchLatestProperties({ page: 1, size: 10 }));
        break;
      case 'emerging':
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

  // Group posts into chunks of 3 for carousel display
  const chunkedPosts = [];
  for (let i = 0; i < posts.length; i += 3) {
    chunkedPosts.push(posts.slice(i, i + 3));
  }
  const totalSections = chunkedPosts.length;

  return (
    <div className="w-full flex flex-col gap-4 items-end">
      {error ? (
        <p className="text-red-500 text-center w-full mt-10">
          {t("errorFetchingPosts")}
        </p>
      ) : (
        <>
          <div className="w-full flex justify-between mt-4 gap-2 pe-10">
            <div
              className="mx-auto max-w-2xl  text-center p-20 "
              data-aos="fade-up"
            >
              <h2 className="text-base font-semibold text-sky-600">
                {t(description)}
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {t(title)}
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex justify-between mt-4 gap-2 pe-10">
            {Array.from({ length: totalSections }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-1 transition-all rounded-lg duration-300 ${
                  i === current ? "bg-sky-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:p-10 p-10 lg:gap-64 justify-center  ">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex flex-col space-y-3" key={index}>
                      <Skeleton className="h-[225px] w-[350px] rounded-xl" />
                      <div className="space-y-2 ">
                        <Skeleton className="h-[100px] w-[350px]" />
                        <Skeleton className="h-[100px] w-[350px]" />
                      </div>
                    </div>
                  ))}
                </div>
                ) : chunkedPosts.length == 0 ?(
                  <>
                  <p className="text-shadow-gray-400 text-sm text-center mx-auto">Sorry there are no currenly any posts here :(</p>
                  </>
                ): (
                  chunkedPosts.map((section, index) => (
                    <CarouselItem key={index}>
                      <div className="grid grid-cols-2 md:grid-cols-3  lg:p-4 p-10 lg:gap-10 gap-5 space-y-10">
                        {section.map((post: any) => (
                          <Cardfm key={post.id} property={post} />
                        ))}
                      </div>
                    </CarouselItem>
                  ))
                )}
            </CarouselContent>

            {/* Controls */}
            <div className="flex w-full justify-end gap-3 pe-5">
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </div>
          </Carousel>

          {!isLoading && posts.length > 0 && (
          <Link href="/List" className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="bg-sky-700 text-white  px-2 py-3 hover:bg-sky-800 hover:text-white cursor-pointer"
            >
                <>
                  {t("viewAll")} <FontAwesomeIcon icon={faArrowRightLong} />
                </>
            </Button>
          </Link>
              )}
        </>
      )}
    </div>
  );
}
