import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
export default function SpaceOverview() {
    const features = [
      { label: "Area", value: "5000 sqft", icon: faRulerCombined },
      { label: "Type", value: "Commercial", icon: faBuilding },
      { label: "Location", value: "Thamel", icon: faMapMarkerAlt },
      { label: "Available From", value: "2025", icon: faCalendarAlt },
    ];
  
    const propertyDetails = [
      { label: "Space ID", value: "SPC7788" },
      { label: "Purpose", value: "Commercial" },
      { label: "Floor", value: "Ground" },
      { label: "Access Road", value: "24ft" },
      { label: "Total Area", value: "5000 sqft" },
      { label: "Rent/Month", value: "Rs 3,00,000" },
      { label: "Date Listed", value: "2025-05-01" },
      { label: "Status", value: "For Rent" },
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
  