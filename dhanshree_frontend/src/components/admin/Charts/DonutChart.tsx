'use client';
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const DonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: { type: "donut", height: 300 },
      series: [44, 33, 23],
      labels: ["Active", "Pending", "Rejected"],
      colors: ["#51CF66", "#FAB005", "#FF6B6B"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    return () => chart.destroy();
  }, []);

  return <div ref={chartRef} />;
};

export default DonutChart;
