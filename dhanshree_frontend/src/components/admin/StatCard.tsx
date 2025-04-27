'use client';
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
}

const StatCard = ({ icon: Icon, label, value, color = "#1E90FF" }: StatCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon size={28} color={color} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;
