"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calculator, Calendar, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConverterHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ConverterHeader({
  title,
  description,
  icon,
}: ConverterHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-sky-500 to-sky-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            {icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
