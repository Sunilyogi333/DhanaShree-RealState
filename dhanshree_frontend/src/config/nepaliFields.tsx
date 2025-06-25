import { FormFieldConfig } from "@/types/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faDollarSign,
  faRoad,
  faLocationDot,
  faRuler,
  faBed,
  faUtensils,
  faCar,
  faBuilding,
  faStairs,
  faFileText,
  faLandmark,
  faCouch,
  faCalendar,
  faStar,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

// General Information Fields
export const generalNepaliFields: FormFieldConfig[] = [
  {
    name: "askingPriceNep",
    label: "मूल्य (रुपैयाँ)",
    type: "textarea",
    // icon: <FontAwesomeIcon icon={faDollarSign} size="lg" className="text-green-500" />
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
    label: "क्षेत्रफल",
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
]; // Additional Details Fields
export const detailNepaliFields: FormFieldConfig[] = [
  {
    name: "bedroomsNep",
    label: "सुत्ने कोठा",
    type: "textarea",
    icon: <FontAwesomeIcon icon={faBed} size="lg" className="text-green-500" />,
  },
  {
    name: "kitchensNep",
    label: "भान्सा",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faUtensils} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "floorsNep",
    label: "तल्ला",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "livingRoomsNep",
    label: "बस्ने कोठा",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faCouch} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "parkingSpacesNep",
    label: "पार्किङ स्थान",
    type: "textarea",
    icon: <FontAwesomeIcon icon={faCar} size="lg" className="text-green-500" />,
  },
  {
    name: "builtAreaNep",
    label: "निर्मित क्षेत्र",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faBuilding} size="lg" className="text-green-500" />
    ),
  },
  {
    name: "builtYearNep",
    label: "निर्माण वर्ष",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faCalendar} size="lg" className="text-green-500" />
    ),
    // icon: <Calendar size={16} className="text-sky-500" />
  },
];

// Export all fields for backward compatibility
export const houseNepaliFields = [
  ...generalNepaliFields,
  ...detailNepaliFields,
];

export const apartmentNepaliFields = [
  {
    name: "floorNumberNep",
    label: "तल्ला",
    type: "textarea",
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-green-500" />
    ),
    toNepali: false,
  },
];


//for the apartment form

export const generalApartmentNepaliFields = [...generalNepaliFields];
export const detailApartmentNepaliFields = [
  ...detailNepaliFields,
  ...apartmentNepaliFields,
];

//for the flat form
export const flatNepaliFields = [...generalNepaliFields, ...detailNepaliFields];

export const generalFlatNepaliFields = [...generalApartmentNepaliFields];

export const detailFlatNepaliFields = [...detailApartmentNepaliFields];
