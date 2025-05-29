import { FormFieldConfig } from "@/types/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faBuilding,
  faDollarSign,
  faRoad,
  faRuler,
  faStairs,
  faCar,
  faFileText,
  faStar,
  faCompass,
  faBed,
  faCalendar,
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

export const spaceDescriptionField: FormFieldConfig[] = [
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter space description",
    validation: { required: true },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faFileText} size="lg" className="text-sky-500" />
    ),
  },
];

export const spaceCheckboxFields: FormFieldConfig[] = [
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

export const spaceGeneralFields: FormFieldConfig[] = [
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

export const spaceDetailFields: FormFieldConfig[] = [
  {
    name: "floorNumber",
    label: "Floor Number",
    type: "number",
    placeholder: "Enter floor number",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-sky-500" />
    ),
  },
  {
    name: "floors",
    label: "Total Floors",
    type: "number",
    placeholder: "Enter total floors",
    validation: { required: true, min: 0 },
    toNepali: true,
    icon: (
      <FontAwesomeIcon icon={faStairs} size="lg" className="text-sky-500" />
    ),
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
      <FontAwesomeIcon icon={faCalendar} size="lg" className="text-sky-500" />
    ),
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
//   {
//     name: "ceilingHeight",
//     label: "Ceiling Height (ft)",
//     type: "number",
//     placeholder: "Enter ceiling height",
//     validation: { required: true, min: 1 },
//     toNepali: true,
//     icon: (
//       <FontAwesomeIcon icon={faBuilding} size="lg" className="text-sky-500" />
//     ),
//   },
];

export const spaceImageFields: FormFieldConfig[] = [
  {
    name: "images",
    label: "Images",
    type: "file",
    validation: { required: true },
  },
];

export const spaceFormFields = [
  ...spaceGeneralFields,
  ...spaceDetailFields,
  ...spaceImageFields,
];
