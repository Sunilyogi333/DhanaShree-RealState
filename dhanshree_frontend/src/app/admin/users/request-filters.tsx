"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

interface RequestFiltersProps {
  onFiltersChange: (email: string, status: string, size: number) => void;
  isLoading?: boolean;
}

export function RequestFilters({
  onFiltersChange,
  isLoading,
}: RequestFiltersProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("all"); // Changed default to "all"
  const [size, setSize] = useState(10);

  useEffect(() => {
    // Convert "all" to empty string when passing to parent
    const statusValue = status === "all" ? "" : status;
    onFiltersChange(email, statusValue, size);
  }, [email, status, size, onFiltersChange]);

  const handleReset = () => {
    setEmail("");
    setStatus("all"); // Reset to "all" instead of empty string
    setSize(10);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <Input
          placeholder="Search by email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={isLoading}
        />
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
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-32">
        <Select
          value={size.toString()}
          onValueChange={(value) => setSize(parseInt(value))}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={handleReset}
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  );
}
