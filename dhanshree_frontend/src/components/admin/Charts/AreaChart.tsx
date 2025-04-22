"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const AreaChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: { type: "area", height: 300 },
      series: [
        {
          name: "Views",
          data: [20, 45, 60, 80, 30, 50],
        },
      ],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      colors: ["#9775FA"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    return () => chart.destroy();
  }, []);

  return <div ref={chartRef} />;
};

export default AreaChart;
