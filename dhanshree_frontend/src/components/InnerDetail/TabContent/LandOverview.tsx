import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faRulerCombined,
  faMapMarkerAlt,
  faCalendarAlt,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

function LandOverview() {
  const features = [
    {
      label: "Area",
      value: "3500 sqft",
      icon: faRulerCombined,
    },
    {
      label: "Road Access",
      value: "20ft",
      icon: faRoad,
    },
    {
      label: "Location",
      value: "Kathmandu",
      icon: faMapMarkerAlt,
    },
    {
      label: "Land Type",
      value: "Residential",
      icon: faMountain,
    },
    {
      label: "Listed Year",
      value: "2024",
      icon: faCalendarAlt,
    },
  ];

  const propertyDetails = [
    { label: "Land ID", value: "LND2301" },
    { label: "Property Face", value: "South-East" },
    { label: "Road Access", value: "20ft" },
    { label: "Purpose", value: "Residential" },
    { label: "Land Area", value: "3500 sqft" },
    { label: "Date Posted", value: "2025-05-01" },
    { label: "Price", value: "Rs 1,50,00,000" },
    { label: "Status", value: "For Sale" },
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
          Beautiful residential plot in a peaceful neighborhood of Kathmandu,
          perfect for building your dream home or investing.
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
