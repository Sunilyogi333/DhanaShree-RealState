"use client";
import React from "react";
import { FormFieldConfig } from "@/types/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faBuilding,
  faRoad,
  faRuler,
  faCompass,
  faStar,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const roadUnits = ["ft", "m", "km"];
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
  { label: "Water Supply", value: "water_supply" },
  { label: "Drainage", value: "drainage" },
  { label: "Electricity", value: "electricity" },
  { label: "Internet", value: "internet" },
  { label: "Parking", value: "parking" },
  { label: "Security", value: "security" },
  { label: "Garden", value: "garden" },
  { label: "Swimming Pool", value: "swimming_pool" },
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
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />
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
    icon: (
      <FontAwesomeIcon icon={faDollarSign} size="lg" className="text-sky-500" />
    ),
  },
  {
    name: "frontage",
    label: "Frontage",
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

export const landFields: FormFieldConfig[] = [
  {
    name: "zoning",
    label: "Zoning",
    type: "select",
    placeholder: "Select zoning type",
    validation: { required: true },
    toNepali: true,
    options: [
      { label: "Residential", value: "residential" },
      { label: "Commercial", value: "commercial" },
      { label: "Agricultural", value: "agricultural" },
      { label: "Mixed", value: "mixed" },
    ],
    icon: (
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />
    ),
  },
];

export const detailFields: FormFieldConfig[] = [
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

export const imageFields: FormFieldConfig[] = [
  {
    name: "images",
    label: "Images",
    type: "file",
    validation: { required: true },
  },
];

export const landFormFields = [
  ...generalFields,
  ...landFields,
  ...detailFields,
  ...imageFields,
];
