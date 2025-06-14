"use client";

import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import $axios from "@/lib/axios.instance";

interface FilterLocationFieldsProps {
  form: UseFormReturn<any>;
}

export const FilterLocationFields: React.FC<FilterLocationFieldsProps> = ({
  form,
}) => {
  const [districtFields, setDistrictFields] = useState<
    { id: string; districtTitle: string }[]
  >([]);
  const [municipalityFields, setMunicipalityFields] = useState<
    { id: string; municipalityTitle: string }[]
  >([]);

  const selectedDistrict = form.watch("district");

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await $axios.get("/address/district");
        setDistrictFields(res.data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (!selectedDistrict) return;

      try {
        const res = await $axios.get(`/address/municipality/${selectedDistrict}`);
        setMunicipalityFields(res.data.data);
      } catch (error) {
        console.error("Failed to fetch municipalities:", error);
      }
    };

    fetchMunicipalities();
  }, [selectedDistrict]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* District */}
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" />
              District
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  form.setValue("municipality", ""); // reset municipality
                  field.onChange(Number(value));
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districtFields.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.districtTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Municipality */}
      <FormField
        control={form.control}
        name="municipality"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" />
              Municipality
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value}
                disabled={!selectedDistrict}
              >
                <SelectTrigger className="w-full" disabled={!selectedDistrict}>
                  <SelectValue placeholder="Select Municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalityFields.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.municipalityTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
