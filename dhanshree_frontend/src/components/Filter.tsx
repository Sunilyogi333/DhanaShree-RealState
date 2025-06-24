"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import $axios from "@/lib/axios.instance";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { getLocalizedLabel } from "@/utils/formatAddressByLanguage";

const FormSchema = z.object({
  type: z.string().optional(),
  district: z.string().optional(),
  priceRange: z.string().optional(),
  purpose: z.enum(["sale", "rent"]),
});

function Filter() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [districtFields, setDistrictFields] = useState<
    { id: string; districtTitle: string }[]
  >([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      district: "",
      priceRange: "",
      purpose: "sale",
    },
  });

  // Fetch districts on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await $axios.get("/address/district");
        console.log("district data", res.data.data);
        setDistrictFields(res.data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Filter data:", data);

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (data.type && data.type !== "") queryParams.append("type", data.type);
    if (data.district && data.district !== "")
      queryParams.append("district", data.district);
    if (data.priceRange && data.priceRange !== "") {
      const [minPrice, maxPrice] = data.priceRange.split("-");
      queryParams.append("minPrice", minPrice);
      queryParams.append("maxPrice", maxPrice);
    }
    if (data.purpose) queryParams.append("purpose", data.purpose);

    // Navigate to list page with query parameters
    router.push(`/List?${queryParams.toString()}`);
  }

  const handleTabChange = (value: string) => {
    form.setValue("purpose", value as "sale" | "rent");
    // Reset other fields when switching tabs
    form.setValue("type", "");
    form.setValue("district", "");
    form.setValue("priceRange", "");
  };

  return (
    <div className="shadow-2xl lg:-bottom-8 -bottom-40 lg:start-80 start-30 absolute z-99 rounded-2xl">
      <Tabs
        defaultValue="sale"
        className="lg:w-[800px] bg-white rounded-2xl px-10 py-5"
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="sale">{t("forSale")}</TabsTrigger>
          <TabsTrigger value="rent">{t("forRent")}</TabsTrigger>
        </TabsList>

        <TabsContent
          value="sale"
          className="flex flex-col space-x-2 lg:flex-row"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:w-2/3 flex relative lg:flex-row flex-col space-y-3"
            >
              {/* Property Type Field */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value === "" ? undefined : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border border-white lg:w-[200px] w-full rounded-none">
                          <SelectValue placeholder={t("type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-999">
                        <SelectItem value="apartment">
                          {t("apartment")}
                        </SelectItem>
                        <SelectItem value="space">{t("spaces")}</SelectItem>
                        <SelectItem value="house">{t("houses")}</SelectItem>
                        <SelectItem value="land">{t("land")}</SelectItem>
                        <SelectItem value="flat">{t("flats")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District Field */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value === "" ? undefined : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border border-white lg:w-[200px] w-full rounded-none">
                          <SelectValue placeholder={t("location")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-999 h-30">
                        {districtFields.map((district) => (
                          <SelectItem
                            key={district.id}
                            value={district.id.toString()}
                          >
                            {getLocalizedLabel(district, i18n.language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Range Field for Sale */}
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value === "" ? undefined : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border border-white lg:w-[200px] w-full rounded-none">
                          <SelectValue placeholder={t("price")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-999">
                        <SelectItem value="0-10000000">
                          {t("lessThan1Crore")}
                        </SelectItem>
                        <SelectItem value="10000000-20000000">
                          {t("1CroreTo2Crores")}
                        </SelectItem>
                        <SelectItem value="20000000-30000000">
                          {t("2CroresTo3Crores")}
                        </SelectItem>
                        <SelectItem value="30000000-40000000">
                          {t("3CroresTo4Crores")}
                        </SelectItem>
                        <SelectItem value="40000000-60000000">
                          {t("4CroresTo6Crores")}
                        </SelectItem>
                        <SelectItem value="60000000-100000000">
                          {t("6CroresTo10Crores")}
                        </SelectItem>
                        <SelectItem value="100000000-999999999">
                          {t("above10Crores")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-sky-700">
                {t("submit")}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="rent">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:w-2/3 flex relative lg:flex-row flex-col space-y-3"
            >
              {/* Property Type Field */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value === "" ? undefined : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border border-white lg:w-[200px] w-full rounded-none">
                          <SelectValue placeholder={t("type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-999">
                        <SelectItem value="apartment">
                          {t("apartment")}
                        </SelectItem>
                        <SelectItem value="spaces">{t("spaces")}</SelectItem>
                        <SelectItem value="houses">{t("houses")}</SelectItem>
                        <SelectItem value="land">{t("land")}</SelectItem>
                        <SelectItem value="flats">{t("flats")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District Field */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value === "" ? undefined : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border border-white lg:w-[200px] w-full rounded-none">
                          <SelectValue placeholder={t("location")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-999 h-30">
                        {districtFields.map((district) => (
                          <SelectItem
                            key={district.id}
                            value={district.id.toString()}
                          >
                            {getLocalizedLabel(district, i18n.language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Range Field for Rent */}
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value === "" ? undefined : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border border-white lg:w-[200px] w-full rounded-none">
                          <SelectValue placeholder={t("price")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-999">
                        <SelectItem value="0-10000">
                          {t("lessThan10k")}
                        </SelectItem>
                        <SelectItem value="10000-25000">
                          {t("10kTo25k")}
                        </SelectItem>
                        <SelectItem value="25000-50000">
                          {t("25kTo50k")}
                        </SelectItem>
                        <SelectItem value="50000-100000">
                          {t("50kTo100k")}
                        </SelectItem>
                        <SelectItem value="100000-999999">
                          {t("above100k")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-sky-700">
                {t("submit")}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Filter;
