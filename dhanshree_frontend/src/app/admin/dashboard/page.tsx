"use client";
import StatCard from "@/components/admin/StatCard";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";
import { Users, Home, Calendar, DollarSign } from "lucide-react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const AreaChart = dynamic(() => import("@/components/admin/Charts/AreaChart"), {
  ssr: false,
});
const BarChart = dynamic(() => import("@/components/admin/Charts/BarChart"), {
  ssr: false,
});
const DonutChart = dynamic(
  () => import("@/components/admin/Charts/DonutChart"),
  { ssr: false }
);
const LineChart = dynamic(() => import("@/components/admin/Charts/LineChart"), {
  ssr: false,
});

// Define the API response type
type DashboardResponse = {
  success: boolean;
  data: {
    totalUsers: number;
    totalProperties: number;
    bookingsThisMonth: number;
    propertyByType: {
      land: number;
      house: number;
      apartment: number;
      flat: number;
      space: number;
    };
  };
  message: {
    en: string;
    ne: string;
  };
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const response = useAxiosQuery<DashboardResponse>("/admin/dashboard");

  console.log("data in the dashboard page", response.data);

  const dashboardData = response.data?.data;
  const propertyByType = dashboardData?.propertyByType;

  // Show loading state
  if (response.isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stat Cards with real data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={dashboardData?.totalUsers || 0}
          color="#4C6EF5"
        />
        <StatCard
          icon={Home}
          label="Properties Listed"
          value={dashboardData?.totalProperties || 0}
          color="#38BDF8"
        />
        <StatCard
          icon={Calendar}
          label="Bookings This Month"
          value={dashboardData?.bookingsThisMonth || 0}
          color="#22C55E"
        />
        <StatCard
          icon={DollarSign}
          label="Total Properties"
          value={dashboardData?.totalProperties || 0}
          color="#F97316"
        />
      </div>

      {/* Chart Grid with real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">{t("weeklySales")}</h2>
          <LineChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            {t("listingByCategory")}
          </h2>
          <BarChart propertyData={propertyByType} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">{t("listingStatus")}</h2>
          <DonutChart propertyData={propertyByType} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">{t("monthlyViews")}</h2>
          <AreaChart />
        </div>
      </div>
    </div>
  );
}
