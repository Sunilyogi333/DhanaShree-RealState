'use client';
import React from 'react'
import Link from "next/link"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
 
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Cardfm from '@/components/Card';
import { ListFilter } from 'lucide-react';
import Listfilter from '@/components/Listfilter';

function page() {
  return (
    <>
        
    <div className='p-20 flex flex-row bg-gray-50 gap-8'>
      
        <div className="w-2/3">
         <Breadcrumb className='pb-10'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className='flex gap-2 items-center'>
            <FontAwesomeIcon icon={faHouse} style={{color: "#74C0FC",}} />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            {/* <Link href="/components"> */}
          List
            {/* </Link> */}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
    <h1 className="text-3xl font-bold">Available Properties</h1>
    <div className="flex justify-between py-8">
    <p>40 properties</p>
    <div className="flex gap-2 items-center">
    <Select>
      <p>Sort By:</p>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Default order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="Date">Price-High to Low</SelectItem>
          <SelectItem value="Ascending">Price-Low to High</SelectItem>
          <SelectItem value="Descending">Date-Old to New</SelectItem>
          <SelectItem value="Descending">Date-New to Old</SelectItem>
          <SelectItem value="Descending">Title-Asc</SelectItem>
          <SelectItem value="Descending">Title-Desc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    </div>
    <Cardfm/>
        </div>
<Listfilter/>
    </div>
    </>

  )
}

export default page