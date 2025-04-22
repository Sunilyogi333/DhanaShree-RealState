import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRoad,
  faHouse,
  faCar,    
  faRulerCombined,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
function Overview() {
    const features = [
        {
          label: "Bedrooms",
          value: "3",
          icon: faHouse,
        },
        {
          label: "Parking",
          value: "1",
          icon: faCar,
        },
        {
          label: "Area",
          value: "1200 sqft",
          icon: faRulerCombined,
        },
        {
          label: "Year Built",
          value: "2019",
          icon: faCalendarAlt,
        },
      ];
  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h1 className="font-medium">Overview</h1>
          <h1 className="">
            <span className="font-semibold">Property Id:</span>
            [11112]
          </h1>
        </div>

        <div className="flex flex-wrap gap-6">
      {features.map((item, index) => (
        <div key={item.label} className="flex gap-3 items-center">
          <div className="flex flex-col gap-1 text-gray-500">
            <div className="flex gap-3 items-center">
              <FontAwesomeIcon icon={item.icon} style={{ color: "#74C0FC" }} />
              <p className="font-semibold text-black">{item.value}</p>
            </div>
            <p className="text-sm">{item.label}</p>
          </div>

          {/* Add divider if not last item */}
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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, odio velit ad non necessitatibus dolorum illum, 
        excepturi deleniti natus tempore atque suscipit, autem libero? Dicta, minima tempore. Magni, temporibus officia.
      </p>
    </div>
    </div>
    </>
  );
}

export default Overview;
