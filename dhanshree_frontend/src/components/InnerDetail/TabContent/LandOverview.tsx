import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faRulerCombined,
  faMapMarkerAlt,
  faCalendarAlt,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";

function LandOverview({ property,isLoading,error}: { property: fetchPropertyDetails ,isLoading:boolean, error:any}) {
  const features = [  
    {
      label: "Area",
      value: `${property.details.landArea.value} ${property.details.landArea.unit}`,
      icon: faRulerCombined,
    },
    {
      label: "Road Access",
      value: `${property.details.frontage.value} ${property.details.frontage.unit}`,
      icon: faRoad,
    },
   
    {
      label: "Land Type",
        value: property.details.zoning,
      icon: faMountain,
    },
    {
      label: "Listed Year",
      value: new Date(property.createdAt).toLocaleDateString(),
      icon: faCalendarAlt,
    },
  ];

  const propertyDetails = [
    { label: "Land ID", value: property.propertyCode },
    { label: "Property Face", value: property.details.facing },
    { label: "Road Access", value: `${property.details.frontage.value} ${property.details.frontage.unit}` },
    { label: "Purpose", value: property.purpose },
    { label: "Land Area", value: `${property.details.landArea.value} ${property.details.landArea.unit}` },
    { label: "Date Posted", value: new Date(property.createdAt).toLocaleDateString() },
    { label: "Price", value: `Rs ${property.price.toLocaleString()}` },
    { label: "Status", value: property.status },
  ];

  return (
    <div className="flex flex-col gap-4">
  
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h1 className="font-medium">Overview</h1>
          <h1>
            <span className="font-semibold">Land ID:</span> [LND2301]
          </h1>
        </div>

        <div className="flex flex-wrap gap-6">
          {features.map((item, index) => (
            <div key={item.label} className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 text-gray-500">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: "#74C0FC" }}
                  />
                  <p className="font-semibold text-black">{item.value}</p>
                </div>
                <p className="text-sm">{item.label}</p>
              </div>
              {index < features.length - 1 && (
                <div className="h-10 border-r border-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">Description</h1>
        <p className="text-gray-500 font-light">
          {property.details.description.en}
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">Land Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
          {propertyDetails.map((item, index) => (
            <div key={index} className="grid grid-cols-2">
              <p className="text-gray-400 text-right pr-2">{item.label}</p>
              <p className="text-left">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandOverview;
