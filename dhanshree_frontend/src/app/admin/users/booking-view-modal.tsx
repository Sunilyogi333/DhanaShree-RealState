"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ExternalLink,
  Home,
  User,
  Settings,
  FileText,
  Calendar,
  DollarSign,
  MapPin,
  Tag,
  Building,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateBooking } from "@/store/slices/bookingSlice";
import { toast } from "sonner";

interface Booking {
  id: string;
  date: string;
  status: string;
  user: {
    fullName: string;
    email: string;
    phone: string;
  };
  property: {
    id: string;
    propertyCode: string;
    price: number;
    type: string;
    status: string;
    purpose: string;
    details: any;
  };
}

interface BookingViewModalProps {
  booking: Booking;
  children: React.ReactNode;
}

export function BookingViewModal({ booking, children }: BookingViewModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(booking.status);
  const [date, setDate] = useState(booking.date.split("T")[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async () => {
    const hasStatusChanged = status !== booking.status;
    const hasDateChanged = date !== booking.date.split("T")[0];

    if (hasStatusChanged || hasDateChanged) {
      setIsUpdating(true);
      try {
        const updateData: { date?: string; status?: string } = {};
        if (hasDateChanged) updateData.date = date;
        if (hasStatusChanged) updateData.status = status;

        await dispatch(
          updateBooking({ id: booking.id, ...updateData })
        ).unwrap();
        toast.success("Booking updated successfully");
        setOpen(false);
      } catch (error) {
        toast.error("Failed to update booking");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const hasChanges =
    status !== booking.status || date !== booking.date.split("T")[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[90vw] lg:max-w-[1200px] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            Booking Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Property Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <Home className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Property Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Property Code
                </Label>
                <div className="text-base font-mono p-3 bg-gray-50 rounded-lg border">
                  {booking.property.propertyCode}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Property Status
                </Label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                    {booking.property.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Property Type
                </Label>
                <div className="text-base capitalize p-3 bg-gray-50 rounded-lg border">
                  {booking.property.type}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Property Price
                </Label>
                <div className="text-lg font-bold text-green-600 p-3 bg-gray-50 rounded-lg border">
                  Rs. {booking.property.price.toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Purpose
                </Label>
                <div className="text-base capitalize p-3 bg-gray-50 rounded-lg border">
                  {booking.property.purpose}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </Label>
              <div className="text-base p-4 bg-gray-50 rounded-lg border min-h-[80px]">
                {booking.property.details?.description?.en ||
                  "No description available"}
              </div>
            </div>
          </div>

          {/* User Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <User className="h-5 w-5 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                User Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">
                  Full Name
                </Label>
                <div className="text-base p-3 bg-gray-50 rounded-lg border">
                  {booking.user.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">
                  Email
                </Label>
                <div className="text-base p-3 bg-gray-50 rounded-lg border">
                  {booking.user.email}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">
                  Phone
                </Label>
                <div className="text-base p-3 bg-gray-50 rounded-lg border">
                  {booking.user.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Current Booking Status */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <Info className="h-5 w-5 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Current Booking Status
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">
                  Current Status
                </Label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 capitalize">
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Current Date
                </Label>
                <div className="text-base p-3 bg-gray-50 rounded-lg border">
                  {new Date(booking.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Update Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <Settings className="h-5 w-5 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Update Booking
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  Update Status
                </Label>
                <Select
                  value={status}
                  onValueChange={setStatus}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="h-12 border-gray-300">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Update Date
                </Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isUpdating}
                  className="h-12 border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Visit Property Link */}
          <div className="flex justify-center pt-4">
            <Link
              href={`/properties/${booking.property.id}`}
              className="inline-flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <ExternalLink className="h-5 w-5" />
              Visit Property Details
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isUpdating}
            className="px-8 py-3 text-base font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!hasChanges || isUpdating}
            className="px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700"
          >
            {isUpdating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </div>
            ) : (
              "Update Booking"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
