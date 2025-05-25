import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";
export default function FlatOverview({property, isLoading, error}: { property: fetchPropertyDetails, isLoading: boolean, error: any }) {

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
    const features = [
      { label: "Bedrooms", value: property.details.bedrooms, icon: faBed },
      { label: "Bathrooms", value: property.details.bathrooms, icon: faBath },
      { label: "Built in Area", value: `${property.details.builtInArea?.value,property.details.builtInArea?.unit}`, icon: faRulerCombined },
      { label: "Floor Number", value:  property.details.floors, icon: faArrowUpRightFromSquare },
      { label: "Built Year", value:  property.details.builtYear, icon: faCalendarAlt },
      { label: "Flat Type", value: property.details.apartmentType, icon: faBuilding },
    ];
  
    const propertyDetails = [
      { label: "Flat ID", value: `${property.propertyCode}` },
      { label: "Facing", value: property.details.facing },
      { label: "Total Floors", value: `${property.details.totalFloors} ` },
      { label: "Purpose", value: property.purpose },
      { label: "Total Area", value: `${property.details.landArea.value} ${property.details.landArea.unit}` },
      { label: "Built Up Area", value: `${property.details.builtInArea?.value} ${property.details.builtInArea?.unit}` },
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
             {property.details.description.en || "No description available for this flat."}
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
  