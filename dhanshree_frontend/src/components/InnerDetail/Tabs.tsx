'use client';

import React, { useState } from 'react'
import Overview from './TabContent/Overview';

function InnerTab() {
  const tabs = ["Overview", "Interior Details", "What's Nearby", "More"];
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <div className="w-full lg:w-2/3">
        {/* Tabs */}
        <div className="flex flex-wrap gap-8 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-500 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
          {activeTab === "Overview" && (
           <Overview/>
          )}
          {activeTab === "Interior Details" && (
            <p>Describe rooms, flooring, layout etc...</p>
          )}
          {activeTab === "What's Nearby" && (
            <p>Show nearby amenities like schools, markets, etc.</p>
          )}
          {activeTab === "More" && (
            <p>Any extra features like parking, rooftop, etc.</p>
          )}
      </div>  )
}

export default InnerTab