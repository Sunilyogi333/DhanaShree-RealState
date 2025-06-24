"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const AreaChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: "area",
        height: 300,
        toolbar: { show: false },
      },
      series: [
        {
          name: "Views",
          data: [20, 45, 60, 80, 30, 50, 75],
        },
      ],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      colors: ["#9775FA"],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: "#f1f1f1",
      },
      title: {
        text: "Monthly Property Views",
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

export default AreaChart;
