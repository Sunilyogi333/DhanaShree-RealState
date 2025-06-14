import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
  faMapMarkerAlt,
  faRoad,
  faS,
  faStairs
} from "@fortawesome/free-solid-svg-icons";
export default function SpaceOverview({property, isLoading, error}: { property: any, isLoading: boolean, error: any }) {
    const features = [
      { label: "Area", value:`${property.details.landArea.value}${property.details.landArea.unit}`, icon: faRulerCombined },
      { label: "Frontage", value:`${property.details.frontage.value}${property.details.frontage.unit}` , icon: faRoad },
      { label: "Floor Number", value:property.details.floors, icon: faStairs },
      { label: "Built Year", value: property.details.builtYear, icon: faCalendarAlt },
    ];
  
    const propertyDetails = [
      { label: "Space ID", value: `${property.propertyCode}` },
      { label: "Facing", value: property.details.facing },
      { label: "Purpose", value: property.purpose },
      { label: "Floor", value: `${property.details.floors}` },
      { label: "Access Road", value: `${property.details.frontage.value} ${property.details.frontage.unit}` },
      { label: "Total Area", value: `${property.details.landArea.value} ${property.details.landArea.unit}` },
      { label: "Rent/Month", value:  `Rs ${property.price.toLocaleString()}` },
      { label: "Date Listed", value: "2025-05-01" },
      { label: "Status", value: property.status ? "Available" : "Not Available" },
    ];
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
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
              <p className="text-gray-400  pr-2">{item.label}</p>
              <p className="">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
}
  