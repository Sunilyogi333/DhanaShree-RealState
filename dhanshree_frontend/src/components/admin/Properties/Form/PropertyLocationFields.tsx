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
import { string } from "zod";

interface PropertyFormFieldsProps {
  form: UseFormReturn<any>;
}

export const PropertyLocationFields: React.FC<PropertyFormFieldsProps> = ({
  form,
}) => {
  const [provinceFields, setProvinceFields] = useState<
    { id: string; provinceTitle: string }[]
  >([]);
  const [districtFields, setDistrictFields] = useState<
    { id: string; districtTitle: string }[]
  >([]);
  const [municipalityFields, setMunicipalityFields] = useState<
    { id: string; municipalityTitle: string }[]
    >([]);

  const [disable, setDisable] = useState(true);
  const selectedProvince = form.watch("province");
  const selectedDistrict = form.watch("district");
  const selectedMunicipality = form.watch("municipality");
  const [wards, setWards] = useState<{ id: string; wardNumber: string }[]>([]);
  // const [provinceFields, setProvinceFields] = useState<{ label: string; value: string }[]>([]);


  useEffect(() => {
    const fetchAllLocationData = async () => {

      const fetchProvinces = async () => {
            try {
              const res = await $axios.get("/address/province");
              console.log("province are ", res);
              setProvinceFields(res.data.data.data);
            } catch (error) {
              console.error("Failed to fetch provinces:", error);
            } finally {
              setDisable(false);
            } 
          };
          fetchProvinces();

      if (selectedProvince) {
        // Fetch districts
        const districtRes = await $axios.get(`/address/district/${selectedProvince}`);
        setDistrictFields(districtRes.data.data);
        
        if (selectedDistrict) {
          // Fetch municipalities
          const municipalityRes = await $axios.get(`/address/municipality/${selectedDistrict}`);
          setMunicipalityFields(municipalityRes.data.data);
          
          if (selectedMunicipality) {
            // Fetch wards
            const wardRes = await $axios.get(`/address/ward/${selectedMunicipality}`);
            setWards(wardRes.data.data);
          }
        }
      }
    };
  
    fetchAllLocationData();
  }, [selectedProvince, selectedDistrict, selectedMunicipality]);


  // useEffect(() => {
  //   const fetchProvinces = async () => {
  //     try {
  //       const res = await $axios.get("/address/province");
  //       console.log("province are ", res);
  //       setProvinceFields(res.data.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch provinces:", error);
  //     } finally {
  //       setDisable(false);
  //     } 
  //   };
  //   fetchProvinces();
  // }, []);

  // useEffect(() => {

  //   if (selectedProvince) {
  //     // Only reset if the province actually changed
  //     // const currentProvince = form.getValues("province");
  //     // console.log("current province and selected province are ", currentProvince, selectedProvince);

  //     console.log("selected province is ", selectedProvince);


  //       form.setValue("district", "");
  //       form.setValue("municipality", "");
  //       form.setValue("wardNo", "");
  //       // setMunicipalities([]);

  //     const fetchDistricts = async () => {
  //       try {
  //         const res = await $axios.get(`/address/district/${selectedProvince}`);

  //         console.log("districts are ", res);
  //         setDistrictFields(res.data.data);
  //       } catch (error) {
  //         console.error("Failed to fetch districts:", error);
  //       }
  //     };

  //     fetchDistricts();
  //   }
  // }, [selectedProvince]);

  // useEffect(() => {
  //   if (selectedDistrict) {
  //     // Only reset if the district actually changed
  //     // const currentDistrict = form.getValues("district");
  //     // if (currentDistrict !== selectedDistrict) {
  //     // }
  //     form.setValue("municipality", "");
  //     // const currentDistrict = form.getValues("district");
  //     // console.log("current district and selected district are ", currentDistrict, selectedDistrict);

  //     const fetchMunicipalities = async () => {
  //       try {
  //         const res = await $axios.get(
  //           `/address/municipality/${selectedDistrict}`
  //         );
  //         console.log("municipality are ", res);
  //         setMunicipalityFields(res.data.data);
  //       } catch (error) {
  //         console.error("Failed to fetch municipalities:", error);
  //       }
  //     };
  //     fetchMunicipalities();
  //   }
  // }, [selectedDistrict]);

  // useEffect(() => {
  //   if (selectedMunicipality) {
  //     // Only reset if the municipality actually changed
  //     // const currentMunicipality = form.getValues("municipality");
  //     // if (currentMunicipality !== selectedMunicipality) {
  //     // }
  //     form.setValue("wardNo", "");

  //     const fetchWards = async () => {
  //       try {
  //         const res = await $axios.get(`/address/ward/${selectedMunicipality}`);
  //         setWards(res.data.data);
  //       } catch (error) {
  //         console.error("Failed to fetch wards:", error);
  //       }
  //     };

  //     fetchWards();
  //   }
  // }, [selectedMunicipality]);

  // console.log("Current field value:", field.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Province */}

      <FormField
        control={form.control}
        name="province"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" />
              Province
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value}
                disabled={disable}
              >
                <SelectTrigger className="w-full" disabled={disable}>
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  {provinceFields.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.provinceTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value}
                disabled={!selectedProvince}
              >
                <SelectTrigger className="w-full" disabled={!selectedProvince}>
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

      {/* Ward No */}
      <FormField
        control={form.control}
        name="wardNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" />
              Ward No
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value}
                disabled={!selectedMunicipality}
              >
                <SelectTrigger
                  className="w-full"
                  disabled={!selectedMunicipality}
                >
                  <SelectValue placeholder="Select Ward No" />
                </SelectTrigger>

                <SelectContent>
                  {wards.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      Ward no {option.wardNumber}
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
