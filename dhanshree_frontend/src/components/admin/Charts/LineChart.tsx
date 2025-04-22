'use client';
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: { type: "line", height: 300 },
      series: [{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70] }],
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
      colors: ["#74C0FC"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    return () => chart.destroy();
  }, []);

  return <div ref={chartRef} />;
};

export default LineChart;
