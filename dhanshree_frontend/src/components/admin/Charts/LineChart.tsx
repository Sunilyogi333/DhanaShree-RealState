"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
      },
      series: [
        {
          name: "Property Inquiries",
          data: [30, 40, 35, 50, 49, 60, 70],
        },
      ],
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#74C0FC"],
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 5,
        colors: ["#74C0FC"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      grid: {
        show: true,
        borderColor: "#f1f1f1",
      },
      title: {
        text: "Weekly Property Inquiries",
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
  }, []);

  return <div ref={chartRef} />;
};

export default LineChart;
