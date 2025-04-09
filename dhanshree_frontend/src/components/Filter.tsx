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
 


 
const FormSchema = z.object({
    email: z.string({
      })
      .email(),
  })

function Filter() {
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
    <TabsTrigger value="Sale">For Sale</TabsTrigger>
    <TabsTrigger value="Rent">For Rent</TabsTrigger>
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
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                    <SelectValue placeholder="price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-sky-700 '>Submit</Button>
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
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                    <SelectValue placeholder="price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-999">
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-sky-700 '>Submit</Button>
      </form>
    </Form>
  </TabsContent>
</Tabs>
        </div>
  )
}

export default Filter