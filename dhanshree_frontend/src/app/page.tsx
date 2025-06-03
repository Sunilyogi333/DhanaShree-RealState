'use client';
import Cardfm from "@/components/Card";
import { Category } from "@/components/Category";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import PostCarousel from "@/components/PostCarausel";
import Image from "next/image";
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
<>
      <Hero/>
    {/* muni ko content chai paxi about us ma rakhni 
      <Feature/> */}
        <div className="p-20">

        <PostCarousel title={t('featuredProperties')} description={t('viewTheFeaturedProperties')} />

      </div>
    <Category/>
</>
  );
}
