"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingViewModal } from "./booking-view-modal";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface Property {
  id: string;
  propertyCode: string;
  price: number;
  type: string;
  status: string;
  purpose: string;
  details: any;
}

export interface Booking {
  id: string;
  createdAt: string;
  date: string;
  message: string;
  isVerified: boolean;
  status: string;
  adminConfirmedAt: string | null;
  emailSentCount: number;
  lastEmailSentAt: string;
  user: User;
  property: Property;
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <Badge className={getStatusColor(status)}>{status}</Badge>;
};

export const columns: ColumnDef<Booking>[] = [
  {
    id: "serialNumber",
    header: "S.N.",
    cell: ({ row }) => {
      return <div className="w-[40px]">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "user.fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <div className="flex items-center gap-2">
          <span
            className={`${booking.isVerified ? "text-black" : "text-red-600"}`}
          >
            {booking.user.fullName}
          </span>
          {booking.isVerified && (
            <CheckCircle className="h-4 w-4 text-blue-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "user.phone",
    header: "Phone",
  },
  {
    accessorKey: "property.id",
    header: "Property ID",
    cell: ({ row }) => {
      return (
        <div className="font-mono text-sm">
          {row.original.property.propertyCode}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue("status")} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <div className="flex items-center gap-2">
          <BookingViewModal booking={booking}>
            <Eye className="h-4 w-4 cursor-pointer hover:text-blue-600" />
          </BookingViewModal>
          <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700 cursor-pointer" />
        </div>
      );
    },
  },
];
