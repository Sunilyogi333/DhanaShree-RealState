"use client";

import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const SalesChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
      },
      series: [
        {
          name: "Sales",
          data: [10, 41, 35, 51, 49, 62],
        },
      ],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      colors: ["#74C0FC"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
      <div ref={chartRef} />
    </div>
  );
};

export default SalesChart;
