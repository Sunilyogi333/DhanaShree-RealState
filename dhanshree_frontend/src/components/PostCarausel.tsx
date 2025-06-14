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


export default function PostCarousel({title,description}: {title: string,description: string}) {
  
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.property
  );

  useEffect(() => {
    dispatch(fetchProperty({page:1,size:10}));
    console.log("posts",posts)  
  }, [dispatch]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const totalSections = 2;
  console.log("totalSections",totalSections)
  const chunkedPosts = Array.from({ length: totalSections }, (_, i) =>
    posts.slice(i * 3, i * 3 + 3)
  );

  return (
    <div className="w-full flex flex-col gap-4 items-end">

      {error? <p className="text-red-500 text-center w-full mt-10">{t('errorFetchingPosts')}</p> :
      (
        <>
      <div className="w-full flex justify-between mt-4 gap-2 pe-10">
      <div className="mx-auto max-w-2xl  text-center p-20 " data-aos="fade-up" >
          <h2 className="text-base font-semibold text-sky-600">{t(description)}</h2>
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
          ) : (
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

      <Link href="/List" className="flex justify-end gap-3"> 
          <Button variant="outline" className="bg-sky-700 text-white  px-2 py-3 hover:bg-sky-800 hover:text-white cursor-pointer">{t('viewAll')} <FontAwesomeIcon icon={faArrowRightLong} /></Button>
      </Link>
      </>
      )}
    </div>
  );
}
