'use client';
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: { type: "bar", height: 300 },
      series: [
        {
          name: "Listings",
          data: [12, 19, 7, 15, 20],
        },
      ],
      xaxis: {
        categories: ["Flats", "Villas", "Plots", "Studios", "Offices"],
      },
      colors: ["#FFA94D"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    return () => chart.destroy();
  }, []);

  return <div ref={chartRef} />;
};

export default BarChart;
