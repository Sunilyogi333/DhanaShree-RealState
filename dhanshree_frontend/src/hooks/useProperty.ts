import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios.instance";
import { Property, PropertyType } from "@/types/property";

interface UsePropertyOptions {
  propertyId?: string;
  type?: PropertyType;
  enabled?: boolean;
}

export const useProperty = ({
  propertyId,
  type,
  enabled = true,
}: UsePropertyOptions = {}) => {
  return useQuery<Property>({
    queryKey: ["property", propertyId, type],
    queryFn: async () => {
      const endpoint = propertyId
        ? `/properties/${propertyId}`
        : type
        ? `/properties?type=${type}`
        : "/properties";

      const response = await $axios.get<{ data: Property }>(endpoint);
      return response.data.data;
    },
    enabled: enabled && (!!propertyId || !!type),
    gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
};

// Helper function to format property features based on type
export const getPropertyFeatures = (property: Property) => {
  const commonFeatures = [
    {
      label: "Area",
      value: `${property.area.value} ${property.area.unit}`,
      icon: "ruler",
    },
    {
      label: "Price",
      value: `Rs ${property.price.toLocaleString()}`,
      icon: "dollar",
    },
  ];

  switch (property.type) {
    case "house":
      return [
        ...commonFeatures,
        {
          label: "Bedrooms",
          value: property.bedrooms.toString(),
          icon: "bed",
        },
        {
          label: "Bathrooms",
          value: property.bathrooms.toString(),
          icon: "bath",
        },
        {
          label: "Road Access",
          value: `${property.roadAccess.value}${property.roadAccess.unit}`,
          icon: "road",
        },
        {
          label: "Year Built",
          value: property.yearBuilt.toString(),
          icon: "calendar",
        },
        {
          label: "Floor",
          value: `${property.floor} story`,
          icon: "stairs",
        },
      ];

    case "flat":
      return [
        ...commonFeatures,
        {
          label: "Bedrooms",
          value: property.bedrooms.toString(),
          icon: "bed",
        },
        {
          label: "Bathrooms",
          value: property.bathrooms.toString(),
          icon: "bath",
        },
        {
          label: "Floor",
          value: `${property.floor}th Floor`,
          icon: "stairs",
        },
        {
          label: "Furnished Type",
          value: property.furnishedType,
          icon: "couch",
        },
      ];

    case "apartment":
      return [
        ...commonFeatures,
        {
          label: "BHK",
          value: property.bhk.toString(),
          icon: "bed",
        },
        {
          label: "Floor",
          value: `${property.floor}th Floor`,
          icon: "stairs",
        },
        {
          label: "Furnished Type",
          value: property.furnishedType,
          icon: "couch",
        },
      ];

    case "land":
      return [
        ...commonFeatures,
        {
          label: "Road Access",
          value: `${property.roadAccess.value}${property.roadAccess.unit}`,
          icon: "road",
        },
        {
          label: "Location",
          value: property.location,
          icon: "location",
        },
        {
          label: "Land Type",
          value: property.landType,
          icon: "mountain",
        },
      ];

    default:
      return commonFeatures;
  }
};
