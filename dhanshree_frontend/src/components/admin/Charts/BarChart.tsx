"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface PropertyData {
  land: number;
  house: number;
  apartment: number;
  flat: number;
  space: number;
}

interface BarChartProps {
  propertyData?: PropertyData;
}

const BarChart = ({ propertyData }: BarChartProps) => {
  const chartRef = useRef(null);


  const isEmpty = propertyData && Object.values(propertyData).every((val) => val === 0);

if (isEmpty) {
  return <div>No data available</div>;
}
  useEffect(() => {
    if (!chartRef.current) return;

    // Use real data or fallback to dummy data
    const data = propertyData
      ? [
          propertyData.flat,
          propertyData.house,
          propertyData.land,
          propertyData.apartment,
          propertyData.space,
        ]
      : [12, 19, 7, 15, 20];

    const options = {
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      series: [
        {
          name: "Properties",
          data: data,
        },
      ],
      xaxis: {
        categories: ["Flats", "Houses", "Land", "Apartments", "Spaces"],
      },
      colors: ["#FFA94D"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: propertyData ? "Property Distribution" : "Sample Data",
        align: "center",
        style: {
          fontSize: "14px",
          color: "#666",
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [propertyData]);

  return <div ref={chartRef} />;
};

export default BarChart;
