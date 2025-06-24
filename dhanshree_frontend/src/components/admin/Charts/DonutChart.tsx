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

interface DonutChartProps {
  propertyData?: PropertyData;
}

const DonutChart = ({ propertyData }: DonutChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Calculate totals and percentages from property data
    let series: number[] = [];
    let labels: string[] = [];

    if (propertyData) {
      const total = Object.values(propertyData).reduce(
        (sum, value) => sum + value,
        0
      );

      if (total > 0) {
        // Only show categories that have data
        const dataEntries = Object.entries(propertyData).filter(
          ([_, value]) => value > 0
        );

        if (dataEntries.length > 0) {
          series = dataEntries.map(([_, value]) => value);
          labels = dataEntries.map(
            ([key, _]) => key.charAt(0).toUpperCase() + key.slice(1)
          );
        } else {
          // If no data, show placeholder
          series = [1];
          labels = ["No Data"];
        }
      } else {
        // If no data, show placeholder
        series = [1];
        labels = ["No Data"];
      }
    } else {
      // Fallback data
      series = [44, 33, 23];
      labels = ["Active", "Pending", "Rejected"];
    }

    const options = {
      chart: {
        type: "donut",
        height: 300,
        toolbar: { show: false },
      },
      series: series,
      labels: labels,
      colors: propertyData
        ? ["#51CF66", "#FAB005", "#FF6B6B", "#74C0FC", "#9775FA"]
        : ["#51CF66", "#FAB005", "#FF6B6B"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                label: "Total",
                fontSize: "16px",
                fontWeight: 600,
                color: "#373d3f",
                formatter: function (w: any) {
                  return w.globals.seriesTotals.reduce(
                    (a: number, b: number) => {
                      return a + b;
                    },
                    0
                  );
                },
              },
            },
          },
        },
      },
      title: {
        text: propertyData ? "Property Types" : "Sample Status",
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

export default DonutChart;
