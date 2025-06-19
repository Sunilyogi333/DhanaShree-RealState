"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateRequestStatus } from "@/store/slices/requestSlice";
import { toast } from "sonner";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface Request {
  id: string;
  createdAt: string;
  user: User;
  date: string;
  message: string;
  isVerified: boolean;
  status: string;
  adminConfirmedAt: string | null;
  lastEmailSentAt: string;
  emailSentCount: number;
  address: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
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

const StatusDropdown = ({ request }: { request: Request }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await dispatch(
        updateRequestStatus({
          id: request.id,
          status: newStatus,
        })
      ).unwrap();
      toast.success(`Request ${newStatus} successfully`);
    } catch (error) {
      toast.error(`Failed to update request status`);
      console.error("Error updating request status:", error);
    }
  };

  const getAvailableStatuses = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "pending":
        return [
          { value: "confirmed", label: "Confirm", color: "text-green-600" },
          { value: "cancelled", label: "Cancel", color: "text-red-600" },
        ];
      case "confirmed":
        return [{ value: "cancelled", label: "Cancel", color: "text-red-600" }];
      case "cancelled":
        return [
          { value: "confirmed", label: "Confirm", color: "text-green-600" },
        ];
      default:
        return [];
    }
  };

  const availableStatuses = getAvailableStatuses(request.status);

  if (availableStatuses.length === 0) {
    return <StatusBadge status={request.status} />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableStatuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={status.color}
          >
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const requestColumns: ColumnDef<Request>[] = [
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
      const request = row.original;
      return (
        <div className="flex items-center gap-2">
          <span
            className={`${request.isVerified ? "text-black" : "text-red-600"}`}
          >
            {request.user.fullName}
          </span>
          {request.isVerified && (
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
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      return (
        <div className="max-w-[200px] truncate" title={address}>
          {address}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Requested Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return (
        <div className="max-w-[150px] truncate" title={message}>
          {message}
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
      const request = row.original;
      return <StatusDropdown request={request} />;
    },
  },
];
