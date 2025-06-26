"use client";
import React from "react";
import { FormFieldConfig } from "@/types/forms";
// import {
//   BedDouble,
//   Bath,
//   Layers,
//   Car,
//   Ruler,
//   Landmark,
//   Tag,
//   Camera,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   MapPin,
//   Building,
//   DollarSign,
//   FileText,
//   Utensils,
//   Sofa,
// } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLocationDot,
  faFileText,
  faTag,
  faDollarSign,
  faLandmark,
  faRuler,
  faBed,
  faUtensils,
  faCar,
  faBuilding,
  faStairs,
  faRoad,
  faCouch,
  faCompass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const areaUnits = [
  "sqft",
  "sqm",
  "ropani",
  "aana",
  "paisa",
  "daam",
  "dhur",
  "bigha",
  "katha",
];
const roadUnits = ["ft", "m", "km"];
const builtYearUnits = ["year"];
const builtAreaUnits = [
  "sqft",
  "sqm",
  "ropani",
  "aana",
  "paisa",
  "daam",
  "dhur",
  "bigha",
  "katha",
];
const landAreaUnits = [
  "sqft",
  "sqm",
  "ropani",
  "aana",
  "paisa",
  "daam",
  "dhur",
  "bigha",
  "katha",
];

const facilities = [
  { label: "Water Supply", value: "water supply" },
  { label: "Drainage", value: "drainage" },
  { label: "Electricity", value: "electricity" },
  { label: "Internet", value: "internet" },
  { label: "Parking", value: "parking" },
  { label: "Security", value: "security" },
  { label: "Garden", value: "garden" },
  { label: "Swimming Pool", value: "swimming pool" },
  { label: "Gym", value: "gym" },
  { label: "Elevator", value: "elevator" },
];

export const descriptionField: FormFieldConfig[] = [
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter property description",
    validation: { required: true },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faFileText} size="lg" className="text-sky-500" />
    ),
  },
];

export const checkboxFields: FormFieldConfig[] = [
  {
    name: "facilities",
    label: "Facilities",
    type: "checkboxGroup",
    options: facilities,
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />
    ),
  },
];

export const generalFields: FormFieldConfig[] = [
  // {
  //   name: "title",
  //   label: "Title",
  //   type: "text",
  //   placeholder: "Enter property title",
  //   validation: { required: true },
  // },

  {
    name: "propertyCode",
    label: "Property Code",
    type: "text",
    placeholder: "Enter property code",
    validation: { required: true },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faTag} size="lg" className="text-sky-500" />,
  },
  {
    name: "propertyPurpose",
    label: "Property Purpose",
    type: "select",
    placeholder: "Select property purpose",
    validation: { required: true },
    toNepali: true,
    options: [
      { label: "Sale", value: "sale" },
      { label: "Rent", value: "rent" },
    ],
    icon: (
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />
    ),
  },
  {
    name: "askingPrice",
    label: "Price (in Rs)",
    type: "number",
    placeholder: "Enter price",
    validation: { required: true },
    toNepali: true,
    // icon: <FontAwesomeIcon icon={faDollarSign} size="lg" className="text-sky-500" />,
  },
  {
    name: "frontage",
    label: "Frontage (in ft)",
    type: "unitArea",
    options: roadUnits.map((unit) => ({ label: unit, value: unit })),
    placeholder: "Enter frontage",
    validation: { required: true },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faRoad} size="lg" className="text-sky-500" />,
  },

  {
    name: "landArea",
    label: "Land Area",
    type: "unitArea",
    options: landAreaUnits.map((unit) => ({ label: unit, value: unit })),
    placeholder: "Enter land area",
    validation: { required: true },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faRuler} size="lg" className="text-sky-500" />,
  },
  {
    name: "facing",
    label: "Facing",
    type: "select",
    placeholder: "Select facing",
    validation: { required: true },
    toNepali: true,
    options: [
      { label: "North", value: "north" },
      { label: "South", value: "south" },
      { label: "East", value: "east" },
      { label: "West", value: "west" },
      { label: "North-East", value: "north east" },
      { label: "North-West", value: "north west" },
      { label: "South-East", value: "south east" },
      { label: "South-West", value: "south west" },
    ],
    icon: (
      <FontAwesomeIcon icon={faCompass} size="lg" className="text-sky-500" />
    ),
  },
];

// Additional Details Fields
export const detailFields: FormFieldConfig[] = [
  {
    name: "bedrooms",
    label: "Bedrooms",
    type: "number",
    placeholder: "Enter number of bedrooms",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faBed} size="lg" className="text-sky-500" />,
  },
  {
    name: "kitchens",
    label: "Kitchens",
    type: "number",
    placeholder: "Enter number of kitchens",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faUtensils} size="lg" className="text-sky-500" />
    ),
  },
  {
    name: "floors",
    label: "Floors",
    type: "number",
    placeholder: "Enter number of floors",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-sky-500" />
    ),
  },
  {
    name: "livingRooms",
    label: "Living Rooms",
    type: "number",
    placeholder: "Enter number of living rooms",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faCouch} size="lg" className="text-sky-500" />,
  },
  {
    name: "parkingSpaces",
    label: "Parking Spaces",
    type: "number",
    placeholder: "Enter number of parking spaces",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faCar} size="lg" className="text-sky-500" />,
  },
  {
    name: "builtYear",
    label: "Built Year",
    type: "number",
    placeholder: "Enter built year",
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />
    ),
  },
  {
    name: "builtArea",
    label: "Built Area",
    type: "unitArea",
    options: builtAreaUnits.map((unit) => ({ label: unit, value: unit })),
    placeholder: "Enter built area",
    validation: { required: true },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faRuler} size="lg" className="text-sky-500" />,
  },

  {
    name: "furnished",
    label: "Furnished",
    type: "select",
    placeholder: "Select furnished",
    validation: { required: true },
    toNepali: true,
    options: [
      { label: "Semi-Furnished", value: "semi" },
      { label: "Fully-Furnished", value: "full" },
      { label: "Unfurnished", value: "none" },
    ],
    icon: <FontAwesomeIcon icon={faBed} size="lg" className="text-sky-500" />,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    validation: { required: true },
    toNepali: true,
    options: [
      { label: "Emerging", value: "emerging" },
      { label: "Featured", value: "featured" },
      { label: "Exclusive", value: "exclusive" },
      { label: "Latest", value: "latest" },
    ],
    icon: <FontAwesomeIcon icon={faStar} size="lg" className="text-sky-500" />,
  },
];

const apartmentFields: FormFieldConfig[] = [
  {
    name: "floorNumber",
    label: "Floor Number",
    type: "number",
    placeholder: "Enter floor number",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: <FontAwesomeIcon icon={faStairs} size="lg" className="text-sky-500" />,
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Select type",
    validation: { required: true },
    toNepali: true,
    options: [
      { label: "Studio", value: "studio" },
      { label: "1 BHK", value: "1 bhk" },
      { label: "2 BHK", value: "2 bhk" },
      { label: "3 BHK", value: "3 bhk" },
      { label: "Penthouse", value: "penthouse" },
      { label: "Duplex", value: "duplex" },
    ],
    icon: <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />,
  },
];


// Image Fields
export const imageFields: FormFieldConfig[] = [
  {
    name: "images",
    label: "Images",
    type: "file",
    validation: { required: true },
  },
];

// Export all fields for backward compatibility
export const houseFormFields = [
  ...generalFields,
  ...detailFields,
  ...imageFields,
];


// Apartment Form Fields
export const apartmentFormFields = [
  ...generalFields,
  ...apartmentFields,
  ...detailFields,
  ...imageFields,
];


export const apartmentDetailFields = [
  ...apartmentFields,
  ...detailFields,
];
export const apartmentGeneralFields = [
  ...generalFields,
];

export const apartmentImageFields = [
  ...imageFields,
];

export const flatGeneralFields = [
  ...apartmentGeneralFields,
];

export const flatDetailFields = [
  ...apartmentDetailFields,
];

export const flatImageFields = [
  ...imageFields,
];

export const flatFormFields = [
  ...flatGeneralFields,
  ...flatDetailFields,
  ...flatImageFields,
];






