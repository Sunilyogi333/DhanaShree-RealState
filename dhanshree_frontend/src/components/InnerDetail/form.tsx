"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance";
import { useTranslation } from "react-i18next";
import {
  resendVerificationEmail,
  setLastBookingResponse,
  setCanResend,
  setResendTimer,
  resetBookingState,
} from "@/store/slices/bookingSlice";
import { Clock, Mail, RefreshCw } from "lucide-react";

type BookingFormValues = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  propertyId: string;
};

function Innerform({ propertyId }: { propertyId: string }) {
  console.log("Property ID:", propertyId);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { lastBookingResponse, isResending, canResend, resendTimer } =
    useSelector((state: RootState) => state.booking);

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
      toast.success(data?.message?.en || "Booking successful!");
      console.log("Booking response:", data);

      // Store the booking response in Redux
      dispatch(setLastBookingResponse(data));

      // Start the 30-second timer
      dispatch(setResendTimer(30));
      startResendTimer();

      form.reset();
    },
    onError: (error: any) => {
      console.log("Booking error:", error);
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const startResendTimer = () => {
    let timeLeft = 30;
    const timer = setInterval(() => {
      timeLeft -= 1;
      dispatch(setResendTimer(timeLeft));

      if (timeLeft <= 0) {
        clearInterval(timer);
        dispatch(setCanResend(true));
      }
    }, 1000);
  };

  const handleResendEmail = () => {
    if (lastBookingResponse && lastBookingResponse.data) {
      const email = lastBookingResponse.data.user.email;
      const propertyId = lastBookingResponse.data.property.id;

      dispatch(resendVerificationEmail({ email, propertyId }))
        .unwrap()
        .then((response) => {
          toast.success(
            response?.message?.en || "Verification email resent successfully!"
          );
          // Start timer again after successful resend
          dispatch(setResendTimer(30));
          startResendTimer();
        })
        .catch((error) => {
          toast.error("Failed to resend verification email");
        });
    }
  };

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking data:", data);
    // Reset booking state before new submission
    dispatch(resetBookingState());
    bookingMutation.mutate(data);
  };

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-sky-500">
        {t("bookThisProperty")}
      </h3>

     

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col pt-10 items-start gap-10 text-sky-400"
        >
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
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
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
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel>{t("bookingDate")}</FormLabel>
                <FormControl>
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
                  <Textarea
                    placeholder="Write your message here..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center w-full mt-6">
            <Button
              type="submit"
              disabled={bookingMutation.isPending}
              className="bg-sky-600 cursor-pointer hover:bg-sky-800"
            >
              {bookingMutation.isPending ? "Submitting..." : "Submit Booking"}
            </Button>
          </div>
        </form>
      </Form>


       {/* Success Message and Resend Section */}
      {lastBookingResponse && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-800">
              Booking Submitted Successfully!
            </h4>
          </div>
          <p className="text-green-700 text-sm mb-4">
            A verification email has been sent to{" "}
            <strong>{lastBookingResponse.data?.user?.email}</strong>. Please
            check your inbox and click the verification link.
          </p>

          {!canResend && resendTimer > 0 && (
            <div className="flex items-center gap-2 text-orange-600 mb-3">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Resend available in: <strong>{formatTime(resendTimer)}</strong>
              </span>
            </div>
          )}

          {canResend && (
            <Button
              onClick={handleResendEmail}
              disabled={isResending}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Innerform;
