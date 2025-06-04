"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/FormInput";
import { toast } from "sonner";
import Cookies from "js-cookie";

// import { loginSchema, type LoginFormValues } from "@/validation/authSchema";
// import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { loginSchema, type LoginFormValues } from "@/validation/authSchema";
import Image from "next/image";
import $axios from "@/lib/axios.instance";
import Link from "next/link";
import { useTranslation } from "react-i18next";
export default function LoginPage() {
  const [cooldown, setCooldown] = useState(0);

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { t } = useTranslation();
  // Watch form values for debouncing
  const formValues = form.watch();
  const debouncedValues = useDebounce(formValues, 500);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await $axios.post("/auth/login", data);
      console.log("response in the login mutation", response.data);
      return response.data;
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data) => {
      // Store the token

      Cookies.set("accessToken", data.data.tokens.accessToken);
      Cookies.set("refreshToken", data.data.tokens.refreshToken);

      toast.success("Login successful", {
        classNames: {
          toast: "bg-green-600 text-white",
          title: "text-white",
          description: "text-white",
        },
      });
      router.push("/admin/dashboard");
    },
    onError: (error: any) => {
      console.log("error", error);
      toast.error("Login failed", {
        description: error.response.data.message,
        classNames: {
          toast: "bg-red-600 text-white",
          title: "text-white",
          description: "text-white",
        },
      });
    },

    onSettled: () => {
      console.log("done");
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Only submit if the debounced values match the current form values
    if (JSON.stringify(data) === JSON.stringify(debouncedValues)) {
      loginMutation.mutate(data);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-3/5 h-3/4 space-y-8 bg-white rounded-lg shadow-lg flex gap-6">
        {/* Left Image Section */}
        <div className="w-1/2 relative rounded-lg overflow-hidden h-full">
          <Image
            className="object-cover"
            src="/user/hero/hero_1.jpg"
            alt="login"
            fill
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/30 to-transparent"></div>
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 flex flex-col items-start gap-10 py-20 pe-7">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{t("loginAsAdmin")}</h2>
            <p className="mt-2 text-sm text-gray-600">
             {t("enterCredentials")}
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  icon={Mail}
                />
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={Lock}
                />

                <div className="flex justify-between">
                  <Link
                    href="/forgotPassword"
                    className="text-blue-500 hover:cursor-pointer"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-1/2 text-white bg-sky-500 hover:bg-sky-700 hover:cursor-pointer"
                    disabled={ loginMutation.isPending}
                  >
                    {/* {isSubmitting || */}
                    { loginMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      `${t("signIn")}`
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
