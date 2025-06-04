'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

 
// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslation } from 'react-i18next';


 
const FormSchema = z.object({
    email: z.string({
      })
      .email(),
  })

function Filter() {
  const { t } = useTranslation();
  const districts = [
    "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke",
    "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh",
    "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusha", "Dolakha", "Dolpa",
    "Doti", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla",
    "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu",
    "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur",
    "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot",
    "Okhaldhunga", "Palpa", "Panchthar", "Parasi", "Parbat", "Parsa", "Pyuthan",
    "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rukum East", "Rukum West",
    "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli",
    "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja",
    "Tanahun", "Taplejung", "Terhathum", "Udayapur" 
  ];
  
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })

      
      function onSubmit(data: z.infer<typeof FormSchema>) {
          console.log("submiteed");
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
      }
  return (  
        <div className="shadow-2xl  lg:-bottom-8 -bottom-40 lg:start-80 start-30 absolute z-99  rounded-2xl">
<Tabs defaultValue="Sale" className="lg:w-[800px]  bg-white rounded-2xl
px-10 py-5
">
  <TabsList>
    <TabsTrigger value="Sale">{t('forSale')}</TabsTrigger>
    <TabsTrigger value="Rent">{t('forRent')}</TabsTrigger>
  </TabsList>
  <TabsContent value="Sale" className='flex flex-col space-x-2 lg:flex-row  '>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/3  flex relative lg:flex-row flex-col space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>  
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-white border border-white lg:w-[200px] w-full rounded-none' >
                    <SelectValue placeholder={t('type')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="apartment">{t('apartment')}</SelectItem>
                  <SelectItem value="spaces">{t('spaces')}</SelectItem>
                  <SelectItem value="houses">{t('houses')}</SelectItem>
                  <SelectItem value="land">{t('land')}</SelectItem>
                  <SelectItem value="flats">{t('flats')}</SelectItem>

                </SelectContent>
              </Select>
          
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
  <FormControl>
    <SelectTrigger className='bg-white border border-white lg:w-[200px] w-full rounded-none'>
      <SelectValue placeholder={t('location')} />
    </SelectTrigger>
  </FormControl>
  <SelectContent className="z-999 h-30 ">
    {districts.map((district) => (
      <SelectItem key={district} value={district}>
        {t(district)}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-white border border-white lg:w-[200px] w-full rounded-none'>
                    <SelectValue placeholder={t('price')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">{t('lessThan1Crore')}</SelectItem>
                  <SelectItem value="m@google.com">{t('1CroreTo2Crores')}</SelectItem>
                  <SelectItem value="m@support.com">{t('2CroresTo3Crores')}</SelectItem>
                  <SelectItem value="3cr">{t('3CroresTo4Crores')}</SelectItem>
                  <SelectItem value="4cr">{t('4CroresTo6Crores')}</SelectItem>
                  <SelectItem value="5cr">{t('6CroresTo10Crores')}</SelectItem>
                  <SelectItem value="above">{t('above10Crores')}</SelectItem>
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-sky-700 '>{t('submit')}</Button>
      </form>
    </Form>
    </TabsContent>
  <TabsContent value="Rent">
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/3  flex relative lg:flex-row flex-col space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>  
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-white border border-white lg:w-[200px] w-full rounded-none' >
                    <SelectValue placeholder={t('type')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                <SelectContent className="z-999">
                  <SelectItem value="Apartment">{t('apartment')}</SelectItem>
                  <SelectItem value="Spaces">{t('spaces')}</SelectItem>
                  <SelectItem value="Houses">{t('houses')}</SelectItem>
                  <SelectItem value="Land">{t('land')}</SelectItem>
                  <SelectItem value="Flats">{t('flats')}</SelectItem>

                </SelectContent>
                </SelectContent>
              </Select>
          
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
  <FormControl>
    <SelectTrigger className='bg-white border border-white lg:w-[200px] w-full rounded-none'>
        <SelectValue placeholder={t('location')} />
    </SelectTrigger>
  </FormControl>
  <SelectContent className="z-999 h-30 ">
    {districts.map((district) => (
      <SelectItem key={district} value={district}>
        {district}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-white border border-white lg:w-[200px] w-full rounded-none'>
                    <SelectValue placeholder={t('price')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                <SelectItem value="1cr">{t('lessThan1Crore')}</SelectItem>
                  <SelectItem value="2cr">{t('1CroreTo2Crores')}</SelectItem>
                  <SelectItem value="3cr">{t('2CroresTo3Crores')}</SelectItem>
                  <SelectItem value="4cr">{t('3CroresTo4Crores')}</SelectItem>
                  <SelectItem value="5cr">{t('4CroresTo6Crores')}</SelectItem>
                  <SelectItem value="6cr">{t('6CroresTo10Crores')}</SelectItem>
                  <SelectItem value="above">{t('above10Crores')}</SelectItem>
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-sky-700 '>{t('submit')}</Button>
      </form>
    </Form>
  </TabsContent>
</Tabs>
        </div>
  )
}

export default Filter