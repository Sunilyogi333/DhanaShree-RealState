"use client";
import Cardfm from "@/components/Card";
import { Category } from "@/components/Category";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import PostCarousel from "@/components/PostCarausel";
import PropertyRequest from "@/components/PropertyRequest/PropertyRequest";
import Image from "next/image";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      {/* muni ko content chai paxi about us ma rakhni 
      <Feature/> */}
      <Category />
      <div className="flex flex-col items-center justify-center gap-10 px-20  ">
        <PostCarousel
          title={t("featuredProperties")}
          description={t("viewTheFeaturedProperties")}
          status="featured"
        />
        <PostCarousel
          title={t("exclusiveProperties")}
          description={t("viewTheExclusiveProperties")}
          status="exclusive"
        />
        <PostCarousel
          title={t("latestProperties")}
          description={t("viewTheLatestProperties")}
          status="latest"
        />
      </div>

      {/* Property Request Section */}
      <PropertyRequest />
    </>
  );
}
