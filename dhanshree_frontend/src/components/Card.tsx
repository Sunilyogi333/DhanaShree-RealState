'use client';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faRoad,faHouse} from "@fortawesome/free-solid-svg-icons"
import { Button } from '@headlessui/react';

function Cardfm() {
  return (
    <>
<Card className='lg:w-[350px] w-full shadow-xl relative pt-0 group cursor-pointer'>
<div className="group">

<img src="user/card/card_1.jpg" alt=""
 className='rounded-lg '
  />
<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-20"></div>
</div>
<button className="absolute bg-green-700 text-white text-sm rounded-lg p-3 top-1 start-1">Featured</button>
  <CardHeader className=''>
    <CardTitle>
        <div className="flex justify-between">
        <h1 className="text-xl">
            Property Code 
        </h1>
        <button className="text-sm bg-sky-300 text-white rounded-lg px-2 py-1">
            House
        </button>
        </div>
    </CardTitle>
    <CardDescription className='flex flex-col space-y-2'>
    <div className="flex justify-start items-center gap-2">
    <FontAwesomeIcon icon={faLocationDot} /> Location: Imadol,lalitpur
    </div>
    <div className="flex justify-start items-center gap-2">
    <FontAwesomeIcon icon={faRoad} style={{color: "#74C0FC"}} />Road:22ft
</div>
<div className="flex justify-start items-center gap-2">
    <FontAwesomeIcon icon={faHouse} style={{color: "#74C0FC"}} />Area:3Ana
</div>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <h1 className="font-bold text-xl">Asking Price:Rs 6000</h1>
  </CardContent>
  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
</Card>
</>
  )
}

export default Cardfm