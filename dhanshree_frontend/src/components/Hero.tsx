import React from "react";
import Image from "next/image";
import Filter from "@/components/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong} from "@fortawesome/free-solid-svg-icons"

const images = [
    { src: '/user/hero/hero_1.jpg', shape: 'rounded-full' },
    { src: '/user/hero/hero_1.jpg', shape: 'rounded-lg' },
    { src: '/user/hero/hero_1.jpg', shape: 'rounded-md' },
    { src: '/user/hero/hero_1.jpg', shape: 'rounded-xl' },
  ];
function Hero() {
  return (
    <div className="flex h-[80vh] relative">
    {/* Left Content */}
    <div className="lg:w-2/3 bg-gradient-to-r from-sky-200 to-white flex flex-col justify-center  container">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
        Find Your Dream Home
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Explore the best properties in your area with us. Trusted by thousands of happy homeowners.
      </p>
      
      <a className="bg-blue-600 text-white px-3 py-2 rounded-xl shadow hover:bg-blue-700 transition w-[200px] text-center" href="/List">
        Get Started <FontAwesomeIcon icon={faArrowRightLong} style={{color: "#FFFFFF",}} />
      </a>
    </div>

    {/* Right Image */}
    <div className="relative lg:w-1/2 h-full  ">
      {/* Gradient overlay for blending */}
      <div className=" hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pe-20" />
      <Image
        src="/user/hero/hero_1.jpg"
        alt="Hero"
        fill
        className="object-cover"
        priority
      />
    </div>
<Filter/>
    </div>
  );
}

export default Hero;
