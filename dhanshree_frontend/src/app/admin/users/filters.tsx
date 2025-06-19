"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";

interface FiltersProps {
  onFiltersChange: (email: string, status: string, size: number) => void;
  isLoading?: boolean;
}

export function Filters({ onFiltersChange, isLoading }: FiltersProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("all");
  const [size, setSize] = useState("10");

  // Debounce email search with 500ms delay
  const [debouncedEmail] = useDebounce(email, 500);

  // Effect to trigger search when debounced email, status, or size changes
  useEffect(() => {
    const statusValue = status === "all" ? "" : status;
    onFiltersChange(debouncedEmail, statusValue, parseInt(size));
  }, [debouncedEmail, status, size, onFiltersChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="w-full sm:w-48">
        <Select value={status} onValueChange={setStatus} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="success">Success</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-48 flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700 mb-1 block">
          Rows per page
        </Label>
        <Select value={size} onValueChange={setSize} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
