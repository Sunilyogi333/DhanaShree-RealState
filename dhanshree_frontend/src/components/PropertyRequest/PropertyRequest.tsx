"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  submitRequest,
  resendRequestVerification,
  setLastRequestResponse,
  setCanResend,
  setResendTimer,
  resetRequestState,
} from "@/store/slices/requestSlice";
import {
  Clock,
  Mail,
  RefreshCw,
  Home,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

type RequestFormValues = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  address: string;
};

export default function PropertyRequest() {
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const {
    isLoading,
    lastRequestResponse,
    isResending,
    canResend,
    resendTimer,
    error,
  } = useSelector((state: RootState) => state.request);

  const form = useForm<RequestFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: "",
      message: "",
      address: "",
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
    if (lastRequestResponse && lastRequestResponse.data) {
      const requestId = lastRequestResponse.data.id;

      dispatch(resendRequestVerification(requestId))
        .unwrap()
        .then((response) => {
          toast.success(
            response?.message?.en || "Verification email resent successfully!"
          );
          dispatch(setResendTimer(30));
          startResendTimer();
        })
        .catch((error) => {
          toast.error("Failed to resend verification email");
        });
    }
  };

  const onSubmit = (data: RequestFormValues) => {
    // Reset request state before new submission
    dispatch(resetRequestState());

    // Convert date to ISO string format
    const requestData = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    dispatch(submitRequest(requestData))
      .unwrap()
      .then((response) => {
        toast.success(
          response?.message?.en || "Request submitted successfully!"
        );
        console.log("Request response:", response);

        // Store the request response in Redux
        dispatch(setLastRequestResponse(response));

        // Start the 30-second timer
        dispatch(setResendTimer(30));
        startResendTimer();

        form.reset();
      })
      .catch((error) => {
        console.log("Request error:", error);
        toast.error(error?.message || "Failed to submit request");
      });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Image */}
          <div className="flex-1 lg:w-1/2">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/user/card/card_4.png"
                alt="List your property with us"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">List Your Property</h3>
                <p className="text-lg opacity-90">
                  Join thousands of satisfied property owners
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Tabs */}
          <div className="flex-1 lg:w-1/2 w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Information
                </TabsTrigger>
                <TabsTrigger value="form" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Request Form
                </TabsTrigger>
              </TabsList>

              {/* Information Tab */}
              <TabsContent value="info" className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Ready to List Your Property?
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Get your property in front of thousands of potential buyers
                    and renters. Our professional team will help you every step
                    of the way.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Professional Photography
                      </h4>
                      <p className="text-gray-600 text-sm">
                        High-quality photos to showcase your property
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Market Analysis
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Competitive pricing based on market data
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Wide Exposure
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Listed on multiple platforms and networks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Expert Support
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Dedicated agent to handle all inquiries
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setActiveTab("form")}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    Request Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              {/* Form Tab */}
              <TabsContent value="form" className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Submit Your Request
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </p>
                </div>

                {/* Success Message and Resend Section */}
                {lastRequestResponse && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">
                        Request Submitted Successfully!
                      </h4>
                    </div>
                    <p className="text-green-700 text-sm mb-4">
                      A verification email has been sent to{" "}
                      <strong>{lastRequestResponse.data?.email}</strong>. Please
                      check your inbox and click the verification link.
                    </p>

                    {!canResend && resendTimer > 0 && (
                      <div className="flex items-center gap-2 text-orange-600 mb-3">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">
                          Resend available in:{" "}
                          <strong>{formatTime(resendTimer)}</strong>
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

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        rules={{ required: "Full name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        rules={{ required: "Phone number is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
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
                        rules={{ required: "Preferred date is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Property address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Address *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Baneshwor, Kathmandu, near XYZ School"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your property or any specific requirements..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-center pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Submit Request
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
