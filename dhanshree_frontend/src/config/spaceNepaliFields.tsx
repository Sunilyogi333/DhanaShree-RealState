import { FormFieldConfig } from "@/types/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faRoad,
  faRuler,
  faStairs,
  faCar,
  faFileText,
  faCalendar,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

export const spaceNepaliDescriptionField: FormFieldConfig[] = [
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

export const spaceGeneralNepaliFields: FormFieldConfig[] = [
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
      <FontAwesomeIcon icon={faRuler} size="lg" className="text-green-500" />
    ),
  },
];

export const spaceDetailNepaliFields: FormFieldConfig[] = [
  {
    name: "floorNumberNep",
    label: "तल्ला नम्बर",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "floorsNep",
    label: "कुल तल्ला",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "parkingSpacesNep",
    label: "पार्किङ स्थान",
    type: "textarea",
    icon: <FontAwesomeIcon icon={faCar} size="lg" className="text-green-500" />,
  },
  {
    name: "builtYearNep",
    label: "निर्माण वर्ष",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faCalendar} size="lg" className="text-green-500" />
    ),
  },
];

export const spaceNepaliFields = [
  ...spaceGeneralNepaliFields,
  ...spaceDetailNepaliFields,
];
