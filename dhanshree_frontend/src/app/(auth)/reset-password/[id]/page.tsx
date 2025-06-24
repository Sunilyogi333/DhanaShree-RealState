"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";

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
import { useParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";

const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    }),
  token: z.string().min(8),
  email: z.string().email(),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      token: "",
      email: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordFormValues) => {
      console.log("data for the mutation", data);
      const response = await $axios.patch("/auth/reset/password-reset", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully!", {
        classNames: {
          toast: "bg-green-600 text-white",
          title: "text-white",
          description: "text-white",
        },
      });
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: { en: string } }>) => {
      console.log("error in the reset password", error);
      toast.error("Failed to reset password", {
        description: error.response?.data?.message?.en || "Something went wrong",
        classNames: {
          toast: "bg-red-600 text-white",
          title: "text-white",
          description: "text-white",
        },
      });
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { id } = useParams();
  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log("data in the submit", data);
    resetPasswordMutation.mutate(data);
  };

  useEffect(() => {
    resetPasswordForm.setValue("token", id as string);
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-xl w-1/3 h-1/2 flex  items-center justify-center gap-6 p-10">
        <div className="w-1/2 flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <h2 className="text-sm text-gray-500">Enter your new password</h2>
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormInput
                form={resetPasswordForm}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
              />

              <FormInput
                form={resetPasswordForm}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
              />
              <div className="hidden">
                <FormInput
                  form={resetPasswordForm}
                  name="token"
                  label="Token"
                  type="text"
                  placeholder="Enter your token"
                  icon={Lock}
                />
              </div>

              <div className="flex flex-col justify-center gap-3">
                <Button
                  type="submit"
                  className="w-full text-white bg-sky-500 hover:bg-sky-700 hover:cursor-pointer px-7"
                  disabled={resetPasswordMutation.isPending || loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default page;
