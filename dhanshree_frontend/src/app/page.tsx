import Cardfm from "@/components/Card";
import { Category } from "@/components/Category";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import PostCarousel from "@/components/PostCarausel";
import Image from "next/image";

export default function Home() {
  return (
<>
      <Hero/>
    {/* muni ko content chai paxi about us ma rakhni 
      <Feature/> */}
     
    
        <div className="p-20">

        <PostCarousel title="Featured Properties" description="View the featured properties" />

      </div>
    <Category/>
</>
  );
}
