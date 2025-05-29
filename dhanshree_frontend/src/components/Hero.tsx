"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Filter from "@/components/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [
  { src: "/user/hero/hero_1.jpg", shape: "rounded-full" },
  { src: "/user/hero/hero_1.jpg", shape: "rounded-lg" },
  { src: "/user/hero/hero_1.jpg", shape: "rounded-md" },
  { src: "/user/hero/hero_1.jpg", shape: "rounded-xl" },
];

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const words = `  Explore the best properties in your area with us. Trusted by thousands of happy homeowners.`;



  return (
    <div className="flex h-[80vh] relative">
      {/* Left Content */}
      <div className="lg:w-2/3 bg-gradient-to-r from-sky-200 to-white flex flex-col justify-center  container">
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4"
          data-aos="zoom-in"
        >
          Find Your Dream Home
        </h1>
        <TextGenerateEffect
          duration={2}
          filter={false}
          words={words}
          className="text-gray-200 text-lg mb-6 font-light"
        />
        
        <a
          className="bg-blue-600 text-white px-3 py-2 rounded-xl shadow hover:bg-blue-700 transition w-[200px] text-center"
          href="/List"
          data-aos="fade-right"
        >
          Get Started{" "}
          <FontAwesomeIcon
            icon={faArrowRightLong}
            style={{ color: "#FFFFFF" }}
          />
        </a>
      </div>

      {/* Right Image */}
      <div className="relative lg:w-1/2 h-full  ">
        {/* Gradient overlay for blending */}
        <div className=" hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pe-20" />
        <Image
          src="/user/hero/hero_2.jpg"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      </div>
      <Filter />
    </div>
  );
}

export default Hero;
