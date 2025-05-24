"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React ,{useEffect, useRef} from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import $axios from "@/lib/axios.instance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Link } from "lucide-react";
import { FormInput } from "@/components/FormInput";
import { Form } from "@/components/ui/form";
const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

function page() {


  const [timer, setTimer] = useState(0);
  const [hasSentLinkOnce, setHasSentLinkOnce] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [wait, setWait] = useState(false);

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await $axios.post("/auth/reset/password-reset-email", { email });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset link sent!", {
        classNames: {
          toast: "bg-green-600 text-white",
          title: "text-white",
          description: "text-white",
        },
      });
      setHasSentLinkOnce(true); // Mark that the link was sent once
    },
    onError: (error: Error) => {
      setHasSentLinkOnce(true); // Mark that the link was sent once
      toast.error("Failed to send reset email", {
        description: error.message,
        classNames: {
          toast: "bg-red-600 text-white",
          title: "text-white",
          description: "text-white",
        },
      });
    },
    onMutate: () => {
      setHasSentLinkOnce(true);
      setWait(true);
      setTimer(30);
    
      if (intervalRef.current) clearInterval(intervalRef.current);
    
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setWait(false);
            clearInterval(interval);
            intervalRef.current = null;
            return 0; 
          }
          return prev - 1;
        });
      }, 1000);
    
      intervalRef.current = interval;
    }
,
  });

  
 

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(data.email);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-xl w-1/3 h-1/2 flex  items-center justify-center gap-6 p-10">

      <div className="w-1/2 flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Did You Forget Your Password?</h1  >
          <h2 className="text-sm text-gray-500">Enter your email to reset your password</h2>
      </div>
      
      <div className="w-1/2 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <Form {...forgotPasswordForm}>
          <form
            onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormInput
              form={forgotPasswordForm}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={Mail}
            />

          

            <div className="flex flex-col justify-center gap-3">

              <Button
                type="submit"
                className="w-full text-white bg-sky-500 hover:bg-sky-700 hover:cursor-pointer px-7"
                disabled={forgotPasswordMutation.isPending || wait}
              >
                {forgotPasswordMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Sending reset link</span>
                  </div>
                ) : (
                  <>
                  {hasSentLinkOnce ? "Resend Link" : "Send Link"}
                  </>
                )}
              </Button>
              
              {wait && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium text-sm">Resend the link in ({timer}s)</span>
                </div>
              )}
            </div>
          </form>
        </Form> 
      </div>

      </div>
    </div>
  );
}

export default page;
