"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance"; 
import { useTranslation } from "react-i18next";
type BookingFormValues = {
  fullName: string;
  email: string;  
  phone: string;
  date: string;
  message: string;
  propertyId: string; 
};

function Innerform({propertyId}: {propertyId: string}) {
console.log("Property ID:", propertyId); 
  const form = useForm<BookingFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: "",
      message: "",
      propertyId: propertyId, 
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      const response = await $axios.post("/booking", data);
      
      return response.data; 
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Booking successful!");
      console.log("Booking response:", data);
      form.reset();
    },
    onError: (error: any) => {
      console.log("Booking error:", error);
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking data:", data);
    bookingMutation.mutate(data);
  };
  const { t } = useTranslation();
  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow ">
      <h3 className="text-xl font-semibold mb-4 text-sky-500">{t("bookThisProperty")}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col pt-10  items-start gap-10 text-sky-400 ">
          <FormField
            control={form.control}
            name="fullName"
            
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel>{t("yourName")}</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel>{t("yourEmail")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel>{t("phoneNumber")}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem  className="w-4/5" >
                <FormLabel>{t("bookingDate") }</FormLabel>
                <FormControl >
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel>{t("message")}</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your message here..." rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex justify-center items-center w-full mt-6">
          <Button type="submit" disabled={bookingMutation.isPending} className="bg-sky-600 cursor-pointer hover:bg-sky-800">
            {bookingMutation.isPending ? "Submitting..." : "Submit Booking"}
          </Button>

        </div>
        </form>
      </Form>
    </div>
  );
}

export default Innerform;
