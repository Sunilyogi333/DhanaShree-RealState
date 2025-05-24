"use client";
import React from "react";
import { FormFieldConfig } from "@/types/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faDollarSign,
  faRoad,
  faLocationDot,
  faRuler,
  faBuilding,
  faFileText,
  faStar,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

export const generalNepaliFields: FormFieldConfig[] = [
  {
    name: "askingPriceNep",
    label: "मूल्य (रुपैयाँ)",
    type: "textarea",
    icon: (
      <FontAwesomeIcon
        icon={faDollarSign}
        size="lg"
        className="text-green-500"
      />
    ),
  },
  {
    name: "frontageNep",
    label: "सडक",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faRoad} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "landAreaNep",
    label: "क्षेत्र",
    type: "textarea",
    icon: (
      <FontAwesomeIcon
        icon={faLocationDot}
        size="lg"
        className="text-green-500"
      />
    ),
  },
];



export const detailNepaliFields: FormFieldConfig[] = [
  {
    name: "builtYearNep",
    label: "निर्माण वर्ष",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-green-500" />
    ),
  },
];

export const nepaliDescriptionField: FormFieldConfig[] = [
  {
    name: "descriptionNp",
    label: "विवरण",
    type: "textarea",
    placeholder: "Enter property description",
    validation: { required: true },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faFileText} size="lg" className="text-green-500" />
    ),
  },
];

export const landNepaliFormFields = [
  ...generalNepaliFields,
  ...detailNepaliFields,
];


