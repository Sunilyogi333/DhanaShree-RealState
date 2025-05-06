'use client';

import React from 'react';
import HouseOverview from './TabContent/HouseOverview';
import LandOverview from './TabContent/LandOverview';
import ApartmentOverview from './TabContent/ApartmentOverview';
import SpaceOverview from './TabContent/SpaceOverview';
import FlatOverview from './TabContent/FlatOverview';


interface InnerTabProps {
  propertyType: string | string[];  // Correct way to define the union type
}
function InnerTab({ propertyType }: InnerTabProps) {
  const propertyInteriorDetails = [
    { label: 'no. of Bedrooms', value: '3' },
    { label: 'no. of Bathrooms', value: '3' },
    { label: 'no. of Living rooms', value: '8' },
    { label: 'Furnishing', value: 'Full' },
    { label: 'Parking', value: '2 cars' },

  ];

  const renderOverview = () => {
    switch (propertyType) {
      case 'house':
        return <HouseOverview />;
      case 'land':
        return <LandOverview />;
      case 'apartment':
        return <ApartmentOverview />;
      case 'flat':
        return <FlatOverview />;
      case 'space':
        return <SpaceOverview />;
      default:
        return <div>No Overview Available</div>;
    }
  };

  return (
    <div className="w-full lg:w-2/3">
      {/* Anchor Links */}
      <div className="flex flex-wrap gap-8 pb-2 mb-4">
        <a
          href="#overview"
          className="scroll-smooth pb-2 border-b-2 font-semibold text-gray-500 hover:border-blue-500 hover:text-blue-500"
        >
          Overview
        </a>
        {propertyType !== "land" && (
        <a
          href="#interior"
          className="scroll-smooth pb-2 border-b-2 font-semibold text-gray-500 hover:border-blue-500 hover:text-blue-500"
        >
          Interior Details
        </a>
      )}
        <a
          href="#facilities"
          className="pb-2 border-b-2 font-semibold text-gray-500 hover:border-blue-500 hover:text-blue-500"
        >
          Facilities
        </a>
      </div>

      {/* Overview Section */}
      <div id="overview" className="py-4">
        {renderOverview()}
      </div>

      {/* Interior Details Section */}
      {propertyType !== "land" && (
      <div
        id="interior"
        className="flex flex-col gap-5 bg-white p-4 rounded-lg shadow py-4"
      >
        <h1 className="font-medium">Property Interior Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
          {propertyInteriorDetails.map((item, index) => (
            <div key={index} className="grid grid-cols-2">
              <p className="text-gray-400 text-right pr-2">{item.label}</p>
              <p className="text-left">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Facilities Section */}
      <div
        id="facilities"
        className="flex flex-col gap-5 bg-white p-4 rounded-lg shadow py-4 my-4"
      >
        <h1 className="font-medium">Facilities</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {['Water', 'Drainage', 'Parking'].map((facility, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <p>{facility}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InnerTab;
