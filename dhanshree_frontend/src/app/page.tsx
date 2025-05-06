import Cardfm from "@/components/Card";
import { Category } from "@/components/Category";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
<>
      <Hero/>
    {/* muni ko content chai paxi about us ma rakhni 
      <Feature/> */}
     
      <div className="mx-auto max-w-2xl  text-center p-20 ">
          <h2 className="text-base font-semibold text-sky-600">View the featured properties</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Featured Properties
          </p>
   

        </div>
        <div className="p-20">

        <Cardfm
  property={{
    id: "01123",
    type: "house",
    code: "[01123]",
    category: "House",
    title: "House for",
    price: "6000",
    location: "Imadol, Lalitpur",
    road: "22ft",
    area: "3Ana",
    image: "/user/card/card_1.jpg",
  }}
/>        </div>
    <Category/>
</>
  );
}
