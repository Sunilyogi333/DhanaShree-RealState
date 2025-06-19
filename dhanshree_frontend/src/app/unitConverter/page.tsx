"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Square, Grid3X3 } from "lucide-react";
import ConverterHeader from "@/components/ConverterHeader";

interface UnitValues {
  // Ropani System
  ropani: string;
  aana: string;
  paisa: string;
  dam: string;
  // Bigha System
  bigha: string;
  katha: string;
  dhur: string;
  // Feet System
  sqFeet: string;
  sqMeter: string;
}

export default function UnitConverter() {
  const [values, setValues] = useState<UnitValues>({
    ropani: "",
    aana: "",
    paisa: "",
    dam: "",
    bigha: "",
    katha: "",
    dhur: "",
    sqFeet: "",
    sqMeter: "",
  });

  // Conversion rates to square feet (base unit)
  const conversionRates = {
    ropani: 5476, // 1 ropani = 5476 sq ft
    aana: 342.25, // 1 aana = 342.25 sq ft
    paisa: 85.56, // 1 paisa = 85.56 sq ft
    dam: 21.39, // 1 dam = 21.39 sq ft
    bigha: 72900, // 1 bigha = 72900 sq ft (Nepal)
    katha: 3645, // 1 katha = 3645 sq ft
    dhur: 182.25, // 1 dhur = 182.25 sq ft
    sqFeet: 1, // base unit
    sqMeter: 10.764, // 1 sq meter = 10.764 sq ft
  };

  const convertFromSqFeet = (sqFeet: number): UnitValues => {
    return {
      ropani: (sqFeet / conversionRates.ropani).toFixed(6),
      aana: (sqFeet / conversionRates.aana).toFixed(6),
      paisa: (sqFeet / conversionRates.paisa).toFixed(6),
      dam: (sqFeet / conversionRates.dam).toFixed(6),
      bigha: (sqFeet / conversionRates.bigha).toFixed(6),
      katha: (sqFeet / conversionRates.katha).toFixed(6),
      dhur: (sqFeet / conversionRates.dhur).toFixed(6),
      sqFeet: sqFeet.toFixed(2),
      sqMeter: (sqFeet / conversionRates.sqMeter).toFixed(2),
    };
  };

  const handleInputChange = (unit: keyof UnitValues, value: string) => {
    if (value === "") {
      setValues({
        ropani: "",
        aana: "",
        paisa: "",
        dam: "",
        bigha: "",
        katha: "",
        dhur: "",
        sqFeet: "",
        sqMeter: "",
      });
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    // Convert to square feet first
    const sqFeetValue = numValue * conversionRates[unit];

    // Convert to all other units
    const convertedValues = convertFromSqFeet(sqFeetValue);

    setValues(convertedValues);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConverterHeader
        title="Unit Converter"
        description="Convert land area measurements between Ropani, Bigha, and International systems with precision"
        icon={<Ruler className="h-8 w-8 text-white" />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ropani System */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Grid3X3 className="h-6 w-6" />
                Ropani System
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="ropani"
                  className="text-sm font-medium text-gray-700"
                >
                  Ropani
                </Label>
                <Input
                  id="ropani"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.ropani}
                  onChange={(e) => handleInputChange("ropani", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="aana"
                  className="text-sm font-medium text-gray-700"
                >
                  Aana
                </Label>
                <Input
                  id="aana"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.aana}
                  onChange={(e) => handleInputChange("aana", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="paisa"
                  className="text-sm font-medium text-gray-700"
                >
                  Paisa
                </Label>
                <Input
                  id="paisa"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.paisa}
                  onChange={(e) => handleInputChange("paisa", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dam"
                  className="text-sm font-medium text-gray-700"
                >
                  Dam
                </Label>
                <Input
                  id="dam"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.dam}
                  onChange={(e) => handleInputChange("dam", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bigha System */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Square className="h-6 w-6" />
                Bigha System
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="bigha"
                  className="text-sm font-medium text-gray-700"
                >
                  Bigha
                </Label>
                <Input
                  id="bigha"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.bigha}
                  onChange={(e) => handleInputChange("bigha", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="katha"
                  className="text-sm font-medium text-gray-700"
                >
                  Katha
                </Label>
                <Input
                  id="katha"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.katha}
                  onChange={(e) => handleInputChange("katha", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dhur"
                  className="text-sm font-medium text-gray-700"
                >
                  Dhur
                </Label>
                <Input
                  id="dhur"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.dhur}
                  onChange={(e) => handleInputChange("dhur", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              {/* Empty div for spacing consistency */}
              <div className="h-[72px]"></div>
            </CardContent>
          </Card>

          {/* International System */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-800 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Ruler className="h-6 w-6" />
                International System
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="sqFeet"
                  className="text-sm font-medium text-gray-700"
                >
                  Square Feet
                </Label>
                <Input
                  id="sqFeet"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.sqFeet}
                  onChange={(e) => handleInputChange("sqFeet", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sqMeter"
                  className="text-sm font-medium text-gray-700"
                >
                  Square Meter
                </Label>
                <Input
                  id="sqMeter"
                  type="number"
                  step="any"
                  placeholder="0"
                  value={values.sqMeter}
                  onChange={(e) => handleInputChange("sqMeter", e.target.value)}
                  className="w-full h-11 text-base border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              {/* Empty divs for spacing consistency */}
              <div className="h-[72px]"></div>
              <div className="h-[72px]"></div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Reference Table */}
        <Card className="mt-12 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardTitle className="text-gray-800">
              Conversion Reference
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-center">
                  Ropani System
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Ropani</span>
                    <span>= 16 Aana</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Aana</span>
                    <span>= 4 Paisa</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Paisa</span>
                    <span>= 4 Dam</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Ropani</span>
                    <span>= 5,476 sq ft</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-center">
                  Bigha System
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Bigha</span>
                    <span>= 20 Katha</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Katha</span>
                    <span>= 20 Dhur</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Bigha</span>
                    <span>= 72,900 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Katha</span>
                    <span>= 3,645 sq ft</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-center">
                  International
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Sq Meter</span>
                    <span>= 10.764 sq ft</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Acre</span>
                    <span>= 43,560 sq ft</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>1 Hectare</span>
                    <span>= 107,640 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Ropani</span>
                    <span>≈ 0.13 Acre</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
