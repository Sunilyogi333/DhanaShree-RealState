import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faStairs,
  faDollarSign,
  faLocationDot,
  faCouch,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { fetchPropertyDetails } from "@/types/property";

const iconMap = {
  ruler: faRulerCombined,
  dollar: faDollarSign,
  bed: faBed,
  bath: faBath,
  road: faRoad,
  calendar: faCalendarAlt,
  stairs: faStairs,
  location: faLocationDot,
  couch: faCouch,
  mountain: faMountain,
};

function Overview({ property ,isLoading,error}: { property: fetchPropertyDetails,isLoading: boolean,error: boolean   }) {
  
 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading property details</div>;
  }

  if (!property || property.type !== "house") {
    return <div>No property found</div>;
  }

  const propertyDetails = [
    { label: "Year Built", value: property.details.builtYear,icon: "calendar"},
    {
      label: "Road",
      value: `${property.details.frontage.value}${property.details.frontage.unit}`,
      icon: "road",
    },
    {
      label: "Property Area",
      value: `${property.details.landArea.value} ${property.details.landArea.unit}`,
      icon: "mountain",
    },
    {
      label: "Built Up Area",
      value: `${property.details.builtInArea?.value} ${property.details.builtInArea?.unit}`,
      icon: "mountain",
    },
    {
      label: "Date Posted",
      value: new Date(property.createdAt).toLocaleDateString(),
      icon: "calendar",
    },
    { label: "Pricing", value: `Rs ${property.price.toLocaleString()}` ,icon: "dollar"},
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between py-6">
            <h1 className="font-medium">Overview</h1>
            <h1 className="">
              <span className="font-semibold">Property Id:</span>[
              {property.propertyCode}]
            </h1>
          </div>

          <div className="flex flex-wrap gap-10">
            {propertyDetails.map((item, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div className="flex flex-col gap-1 text-gray-500">
                  <div className="flex gap-3 items-center">
                    <FontAwesomeIcon
                      icon={iconMap[item.icon as keyof typeof iconMap]}
                      style={{ color: "#74C0FC" }}
                    />
                    <p className="font-semibold text-black">{item.value}</p>
                  </div>
                  <p className="text-sm">{item.label}</p>
                </div>

                {index < property.details.facilities.length - 1 && (
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
          <h1 className="font-medium py-4">Property Details</h1>
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
    </>
  );
}

export default Overview;
