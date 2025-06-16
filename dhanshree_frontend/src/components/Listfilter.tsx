"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { formatNumberByLanguage } from "@/utils/formatNumberByLanguage";
import { FilterLocationFields } from "./Filter/FilterLocationFields";

const items = [
  { id: "land", label: "land" },
  { id: "houses", label: "houses" },
  { id: "apartment", label: "apartment" },
  { id: "flats", label: "flats" },
  { id: "spaces", label: "spaces" },
] as const;

// --- First schema: for code filter ---
const CodeFormSchema = z.object({
  propertyCode: z.string().min(2, {
    message: "Property code must be at least 2 characters.",
  }),
});

// --- Second schema: for checkbox and price range ---
const FilterFormSchema = z.object({
  type: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  status: z.string().optional(),
  district: z.number().optional(), // Changed to number
  municipality: z.number().optional(), // Changed to number
  purpose: z.enum(["sale", "rent"]).optional(),
});

interface ListfilterProps {
  onFiltersChange?: (filters: any) => void;
}

function Listfilter({ onFiltersChange }: ListfilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  // Code Form
  const codeForm = useForm<z.infer<typeof CodeFormSchema>>({
    resolver: zodResolver(CodeFormSchema),
    defaultValues: {
      propertyCode: "",
    },
  });

  // Filter Form
  const filterForm = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      type: [],
      minPrice: 1000,
      maxPrice: 100000000,
      status: "all",
      district: undefined, // Use undefined for numbers
      municipality: undefined, // Use undefined for numbers
      purpose: "sale",
    },
  });

  // Initialize form values from URL parameters
  useEffect(() => {
    const urlParams = {
      propertyCode: searchParams.get("propertyCode") || "",
      type: searchParams.get("type")?.split(",") || [],
      minPrice: searchParams.get("minPrice")
        ? parseInt(searchParams.get("minPrice")!)
        : 1000,
      maxPrice: searchParams.get("maxPrice")
        ? parseInt(searchParams.get("maxPrice")!)
        : 100000000,
      status: searchParams.get("status") || "all",
      district: searchParams.get("district")
        ? parseInt(searchParams.get("district")!)
        : undefined,
      municipality: searchParams.get("municipality")
        ? parseInt(searchParams.get("municipality")!)
        : undefined,
      purpose: (searchParams.get("purpose") as "sale" | "rent") || "sale",
    };

    // Set form values
    codeForm.setValue("propertyCode", urlParams.propertyCode);
    filterForm.reset({
      type: urlParams.type,
      minPrice: urlParams.minPrice,
      maxPrice: urlParams.maxPrice,
      status: urlParams.status,
      district: urlParams.district,
      municipality: urlParams.municipality,
      purpose: urlParams.purpose,
    });
  }, [searchParams, codeForm, filterForm]);

  const onCodeSubmit = (data: z.infer<typeof CodeFormSchema>) => {
    console.log("Code search data:", data);

    // Build query parameters for property code search
    const queryParams = new URLSearchParams();
    if (data.propertyCode) {
      queryParams.append("propertyCode", data.propertyCode);
    }

    // Navigate to list page with property code
    router.push(`/List?${queryParams.toString()}`);
  };

  const onFilterSubmit = (data: z.infer<typeof FilterFormSchema>) => {
    console.log("Filter data:", data);

    // Build query parameters
    const queryParams = new URLSearchParams();

    // Add filter parameters
    if (data.type && data.type.length > 0) {
      queryParams.append("type", data.type.join(","));
    }

    // Handle minPrice and maxPrice separately - only add if not default values
    if (data.minPrice && data.minPrice > 1000) {
      queryParams.append("minPrice", data.minPrice.toString());
    }
    if (data.maxPrice && data.maxPrice < 100000000) {
      queryParams.append("maxPrice", data.maxPrice.toString());
    }

    if (data.status && data.status !== "all") {
      queryParams.append("status", data.status);
    }

    // Handle district and municipality as numbers
    if (data.district && data.district !== undefined) {
      queryParams.append("district", data.district.toString());
    }
    if (data.municipality && data.municipality !== undefined) {
      queryParams.append("municipality", data.municipality.toString());
    }

    if (data.purpose && data.purpose !== "") {
      queryParams.append("purpose", data.purpose);
    }

    console.log("Navigating with params:", queryParams.toString());

    // Navigate to list page with filters
    router.push(`/List?${queryParams.toString()}`);
  };

  const clearFilters = () => {
    codeForm.reset();
    filterForm.reset({
      type: [],
      minPrice: 1000,
      maxPrice: 100000000,
      status: "all",
      district: undefined,
      municipality: undefined,
      purpose: "sale",
    });

    // Navigate to clean list page
    router.push("/List");
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  // Helper function to format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} L`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return formatNumberByLanguage(price, i18n.language);
  };

  const FilterContent = () => (
    <Form {...filterForm}>
      <form
        onSubmit={filterForm.handleSubmit(onFilterSubmit)}
        className="space-y-6"
      >
        {/* Purpose Selection */}
        <FormField
          control={filterForm.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("purpose")}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectPurpose")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sale">{t("sale")}</SelectItem>
                  <SelectItem value="rent">{t("rent")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Property Type Checkboxes */}
        <FormField
          control={filterForm.control}
          name="type"
          render={() => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("propertyType")}
              </FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={filterForm.control}
                    name="type"
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
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (val) => val !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-semibold text-sky-700">
                            {t(item.id)}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Range Slider - Using separate fields but single slider component */}
        <div className="space-y-4">
          <FormLabel className="text-md font-semibold text-green-700">
            {t("priceRange")}
          </FormLabel>

          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              {t("rs")} {formatPrice(filterForm.watch("minPrice") || 1000)}
            </span>
            <span>
              {t("rs")} {formatPrice(filterForm.watch("maxPrice") || 100000000)}
            </span>
          </div>

          <Slider
            min={1000}
            max={100000000}
            step={100000}
            value={[
              filterForm.watch("minPrice") || 1000,
              filterForm.watch("maxPrice") || 100000000,
            ]}
            onValueChange={(value) => {
              filterForm.setValue("minPrice", value[0]);
              filterForm.setValue("maxPrice", value[1]);
            }}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-gray-500 px-1 pt-1">
            <span>{t("rs")} 1K</span>
            <span>{t("rs")} 10Cr</span>
          </div>
        </div>

        {/* Property Status */}
        <FormField
          control={filterForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-green-700">
                {t("propertyStatus")}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectPropertyStatus")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="featured">{t("featured")}</SelectItem>
                  <SelectItem value="exclusive">{t("exclusive")}</SelectItem>
                  <SelectItem value="latest">{t("latest")}</SelectItem>
                  <SelectItem value="emerging">{t("emerging")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Fields - Using FilterLocationFields component with number type */}
        <div className="space-y-4">
          <FilterLocationFields form={filterForm} fieldType="number" />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="bg-green-600 flex-1">
            {t("applyFilters")}
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters}>
            {t("clear")}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="flex flex-col space-y-8 relative">
      {/* Code Filter */}
      <div className="p-6 w-full shadow-lg rounded-xl bg-white">
        <h1 className="text-lg font-bold text-sky-700 mb-4">
          {t("searchByCode")}
        </h1>
        <Form {...codeForm}>
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className="space-y-4"
          >
            <div className="flex gap-2">
              <FormField
                control={codeForm.control}
                name="propertyCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={t("enterPropertyCode")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <FontAwesomeIcon
                        icon={faFilter}
                        className="text-sky-600"
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-scroll">
                    <SheetHeader>
                      <SheetTitle className="text-lg font-bold text-sky-700">
                        {t("filters")}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <Button type="submit" className="w-full bg-sky-600">
              {t("search")}
            </Button>
          </form>
        </Form>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block p-6 w-full shadow-lg rounded-xl bg-white">
        <h1 className="text-lg font-bold text-sky-700 mb-4">{t("filters")}</h1>
        <FilterContent />
      </div>
    </div>
  );
}

export default Listfilter;
