    'use client'; 
    // import AreaChart from "@/components/admin/Charts/AreaChart";
    // import BarChart from "@/components/admin/Charts/BarChart";
    // import DonutChart from "@/components/admin/Charts/DonutChart";
    // import LineChart from "@/components/admin/Charts/LineChart";
    // import SalesChart from "@/components/admin/Charts/Sales";
    import StatCard from "@/components/admin/StatCard";
    import { Users, Home, Calendar, DollarSign } from "lucide-react";
    import { useTranslation } from "next-i18next";
    import dynamic from "next/dynamic"; // <== Import dynamic from next
    const AreaChart = dynamic(() => import("@/components/admin/Charts/AreaChart"), { ssr: false });
    const BarChart = dynamic(() => import("@/components/admin/Charts/BarChart"), { ssr: false });
    const DonutChart = dynamic(() => import("@/components/admin/Charts/DonutChart"), { ssr: false });
    const LineChart = dynamic(() => import("@/components/admin/Charts/LineChart"), { ssr: false });
    // src/app/admin/dashboard/page.tsx
    export default function DashboardPage() {
      const { t } = useTranslation(); 
        return (
            <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{t("adminDashboard")}</h1>
      
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard icon={Users} label="Total Users" value="1,243" color="#4C6EF5" />
              <StatCard icon={Home} label="Properties Listed" value="356" color="#38BDF8" />
              <StatCard icon={Calendar} label="Bookings This Month" value="87" color="#22C55E" />
              <StatCard icon={DollarSign} label="Total Earnings" value="$12,450" color="#F97316" />
            </div>
      
            {/* Chart Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">{t("weeklySales")}</h2>
                <LineChart /> 
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">{t("listingByCategory")}</h2>
                <BarChart />
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">{t("listingStatus")}</h2>
                <DonutChart />
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">{t("monthlyViews")}</h2>
                <AreaChart />
              </div>
            </div>
          </div>
      
        );
      }
      