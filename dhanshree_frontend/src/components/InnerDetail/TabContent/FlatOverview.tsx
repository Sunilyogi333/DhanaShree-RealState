import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
export default function FlatOverview() {
    const features = [
      { label: "Bedrooms", value: "3", icon: faBed },
      { label: "Bathrooms", value: "2", icon: faBath },
      { label: "Flat Size", value: "1200 sqft", icon: faRulerCombined },
      { label: "Floor", value: "2nd Floor", icon: faArrowUpRightFromSquare },
      { label: "Built Year", value: "2018", icon: faCalendarAlt },
    ];
  
    const propertyDetails = [
      { label: "Flat ID", value: "FLT1220" },
      { label: "Facing", value: "West" },
      { label: "Floor Level", value: "2nd" },
      { label: "Purpose", value: "Residential" },
      { label: "Total Area", value: "1200 sqft" },
      { label: "Built Up Area", value: "950 sqft" },
      { label: "Date Posted", value: "2025-05-01" },
      { label: "Price", value: "Rs 1,10,00,000" },
      { label: "Status", value: "For Sale" },
    ];
  
    return (
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between py-6">
              <h1 className="font-medium">Overview</h1>
              <h1>
                <span className="font-semibold">Apartment ID:</span> [APT2025]
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
              Well-maintained 2 BHK apartment in a prime residential tower with modern amenities.
            </p>
          </div>
    
          <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
            <h1 className="font-medium py-4">Apartment Details</h1>
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
  