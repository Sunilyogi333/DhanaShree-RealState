import Cardfm from "@/components/Card";
import { Category } from "@/components/Category";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
<>
      <Hero/>
      <Feature/>
     
      <div className="mx-auto max-w-2xl  text-center">
          <h2 className="text-base font-semibold text-sky-600">View the featured properties</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Featured Properties
          </p>
   

        </div>
        <div className="p-20">

    <Cardfm/>
        </div>
    <Category/>
</>
  );
}
