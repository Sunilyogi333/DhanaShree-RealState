"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 

const items = [
  { id: "Homes", label: "Homes" },
  { id: "Lands", label: "Lands" },
  { id: "Appartments", label: "Appartments" },
] as const

// --- First schema: for code filter ---
const CodeFormSchema = z.object({
  code: z.string().min(2, {
    message: "Property code must be at least 2 characters.",
  }),
})

// --- Second schema: for checkbox and price range ---
const FilterFormSchema = z.object({
  items: z
    .array(z.string())
    .refine((val) => val.length > 0, {
      message: "Please select at least one property type.",
    }),
  price: z.number().min(1000).max(10000),
  type: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
     location: z.string({
    required_error: "Please select a location.",
  }),
})

function Listfilter() {
  // Code Form
  const codeForm = useForm<z.infer<typeof CodeFormSchema>>({
    resolver: zodResolver(CodeFormSchema),
    defaultValues: {
      code: "",
    },
  })

  // Filter Form
const filterForm = useForm<z.infer<typeof FilterFormSchema>>({
  resolver: zodResolver(FilterFormSchema),
  defaultValues: {
    items: [],
    price: 5000,
    type: "", 
        location: "", 

  },
})

  const onCodeSubmit = (data: z.infer<typeof CodeFormSchema>) => {
    console.log("Code search data:", data)
  }

  const onFilterSubmit = (data: z.infer<typeof FilterFormSchema>) => {
    console.log("Other filters data:", data)
  }

  return (
    <div className="flex flex-col w-1/3 space-y-8">
      {/* Code Filter */}
      <div className="p-10 w-full shadow-2xl rounded-xl">
        <h1 className="text-lg font-bold text-sky-700">Search By Code</h1>
        <Form {...codeForm}>
          <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-6 py-6">
            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter the Property code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-green-600">Search</Button>
          </form>
        </Form>
      </div>

      {/* Other Filters */}
      <div className="p-10 w-full shadow-2xl rounded-xl">
        <h1 className="text-lg font-bold text-sky-700 mb-4">Other Filters</h1>
        <Form {...filterForm}>
          <form onSubmit={filterForm.handleSubmit(onFilterSubmit)} className="space-y-8">
            {/* Checkbox Group */}
            <FormField
              control={filterForm.control}
              name="items"
              render={() => (
                <FormItem>
                  <FormLabel className="text-md font-semibold text-green-700">Property Type</FormLabel>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={filterForm.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                           
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter((val) => val !== item.id)
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-semibold text-sky-700">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slider */}
            <FormField
              control={filterForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold text-green-700">Price Range</FormLabel>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rs {field.value}</span>
                  </div>
                  <Slider
                    min={1000}
                    max={10000}
                    step={500}
                    value={[field.value]}
                    onValueChange={(val) => field.onChange(val[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500 px-1 pt-1">
                    <span>Rs 1000</span>
                    <span>Rs 10000</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

    <FormField
          control={filterForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-md font-semibold text-green-700" >Property Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">Featured</SelectItem>
                  <SelectItem value="m@google.com">Exclusive</SelectItem>
                  <SelectItem value="m@support.com">Free</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
  control={filterForm.control}
  name="location"
  render={({ field }) => (
    <FormItem>
      <FormLabel  className="text-md font-semibold text-green-700">Select location</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a property location" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Kathmandu">Kathmandu</SelectItem>
          <SelectItem value="Lalitpur">Lalitpur</SelectItem>
          <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
            <Button type="submit" className="bg-green-600">Apply Filters</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Listfilter
