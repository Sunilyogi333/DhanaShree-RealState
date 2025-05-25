"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyFormTabsProps {
  children: React.ReactNode[];
}

export const PropertyFormTabs: React.FC<PropertyFormTabsProps> = ({
  children,
}) => {
  const [currentTab, setCurrentTab] = useState("general");

  const tabs = [
    { value: "general", label: "General Info" },
    { value: "details", label: "Additional Details" },
    { value: "images", label: "Images" },
  ];

  const handleNext = () => {
    if (currentTab === "general") setCurrentTab("details");
    else if (currentTab === "details") setCurrentTab("images");
  };

  const handlePrevious = () => {
    if (currentTab === "details") setCurrentTab("general");
    else if (currentTab === "images") setCurrentTab("details");
  };

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList className="grid w-full grid-cols-3 mb-6">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="general">{children[0]}</TabsContent>

      <TabsContent value="details">{children[1]}</TabsContent>

      <TabsContent value="images">{children[2]}</TabsContent>


      

      <div className="pt-4 flex justify-between">
        {currentTab !== "general" && (
          <Button
            type="button"
            onClick={handlePrevious}
            variant="outline"
            className="w-1/5 flex items-center justify-center gap-2"
          >
            <ChevronLeft size={16} /> Previous
          </Button>
        )}
        {currentTab !== "images" && (
          <Button
            type="button"
            onClick={handleNext}
            className="w-1/5 flex items-center justify-center gap-2 bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Next <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </Tabs>
  );
};
