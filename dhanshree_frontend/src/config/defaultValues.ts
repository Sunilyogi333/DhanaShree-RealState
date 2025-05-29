import { houseFormSchema, HouseFormValues } from "@/types/forms";

import {  PropertyStatus } from "@/types/property";


export const houseDefaultValues: Partial<HouseFormValues> = {
    propertyCode: "",
    type: "house",
  
    askingPrice: 0,
    askingPriceNep: "",
  
    frontage: 0,
    frontageUnit: "",
    frontageNep: "",
  
    facing: "",
    furnished: "",
  
    description: "",
    descriptionNp: "",
  
    status: PropertyStatus.EMERGING,
    builtYear: 1990,
    builtYearNep: "",
  
    images: [] as unknown as File[],
    thumbnail: new File([""], "placeholder.png", { type: "image/png" }),
  
    facilities: ["parking"],
  
    bedrooms: 1,
    bedroomsNep: "",
  
    kitchens: 1,
    kitchensNep: "",
  
    floors: 1,
    floorsNep: "",
  
    livingRooms: 1,
    livingRoomsNep: "",
  
    parkingSpaces: 1,
    parkingSpacesNep: "",
  
    builtArea: 10,
    builtAreaUnit: "",
    builtAreaNep: "",
  
    landArea: 10,
    landAreaUnit: "",
    landAreaNep: "",
  
    propertyPurpose: "sale",
  
    province: 1,
    district: 1,
    municipality: 1,
    wardNo: 1,
  };

  
  