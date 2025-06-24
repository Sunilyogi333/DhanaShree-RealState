"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllBookings, setFilters } from "@/store/slices/bookingSlice";
import {
  fetchAllRequests,
  setRequestFilters,
} from "@/store/slices/requestSlice";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { requestColumns } from "./request-columns";
import { Filters } from "./filters";
import { RequestFilters } from "./request-filters";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "bookings" | "requests";

function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<TabType>("bookings");

  // Booking state
  const {
    bookings,
    isLoading: bookingLoading,
    error: bookingError,
    pagination: bookingPagination,
    filters: bookingFilters,
  } = useSelector((state: RootState) => state.booking);

  // Request state
  const {
    requests,
    isLoading: requestLoading,
    error: requestError,
    pagination: requestPagination,
    filters: requestFilters,
  } = useSelector((state: RootState) => state.request);

  console.log("Fetching bookings with filters:", bookingFilters, bookings);
  console.log("Fetching requests with filters:", requestFilters, requests);

  const fetchBookings = useCallback(() => {
    const params = {
      page: bookingFilters.page,
      size: bookingFilters.size,
      ...(bookingFilters.status && { status: bookingFilters.status }),
      ...(bookingFilters.email && { email: bookingFilters.email }),
    };
    dispatch(fetchAllBookings(params));
  }, [dispatch, bookingFilters]);

  const fetchRequests = useCallback(() => {
    const params = {
      page: requestFilters.page,
      size: requestFilters.size,
      ...(requestFilters.status && { status: requestFilters.status }),
      ...(requestFilters.email && { email: requestFilters.email }),
    };
    dispatch(fetchAllRequests(params));
  }, [dispatch, requestFilters]);

  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings();
    } else {
      fetchRequests();
    }
  }, [activeTab, fetchBookings, fetchRequests]);

  const handleBookingFiltersChange = useCallback(
    (email: string, status: string, size: number) => {
      dispatch(
        setFilters({
          email,
          status,
          size,
          page: 1,
        })
      );
    },
    [dispatch]
  );

  const handleRequestFiltersChange = useCallback(
    (email: string, status: string, size: number) => {
      dispatch(
        setRequestFilters({
          email,
          status,
          size,
          page: 1,
        })
      );
    },
    [dispatch]
  );

  const handleBookingPageChange = (page: number) => {
    dispatch(setFilters({ page }));
  };

  const handleRequestPageChange = (page: number) => {
    dispatch(setRequestFilters({ page }));
  };

  const TabButton = ({ tab, label }: { tab: TabType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={cn(
        "px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2",
        activeTab === tab
          ? "text-sky-700 border-sky-700"
          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
      )}
    >
      {label}
    </button>
  );

  const renderError = (error: string) => (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl lg:shadow-md p-6 sm:p-5 md:p-10">
      <div className="text-red-600 text-center py-10">Error: {error}</div>
    </div>
  );

  if (bookingError && activeTab === "bookings") {
    return renderError(bookingError);
  }

  if (requestError && activeTab === "requests") {
    return renderError(requestError);
  }

  const currentLoading =
    activeTab === "bookings" ? bookingLoading : requestLoading;
  const currentData = activeTab === "bookings" ? bookings : requests;
  const currentPagination =
    activeTab === "bookings" ? bookingPagination : requestPagination;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl lg:shadow-md p-6 sm:p-5 md:p-10">
      <h1 className="text-2xl text-black font-semibold mb-6">
        User Management Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <TabButton tab="bookings" label="Booking Details" />
        <TabButton tab="requests" label="Request Details" />
      </div>

      <div className="space-y-6">
        {/* Filters */}
        {activeTab === "bookings" ? (
          <Filters
            onFiltersChange={handleBookingFiltersChange}
            isLoading={bookingLoading}
          />
        ) : (
          <RequestFilters
            onFiltersChange={handleRequestFiltersChange}
            isLoading={requestLoading}
          />
        )}

        {/* Content */}
        {currentLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">
              Loading {activeTab === "bookings" ? "bookings" : "requests"}...
            </span>
          </div>
        ) : (
          <>
            {activeTab === "bookings" ? (
              <DataTable
                columns={columns}
                data={bookings}
                pagination={bookingPagination ?? undefined}
                onPageChange={handleBookingPageChange}
              />
            ) : (
              <DataTable
                columns={requestColumns}
                data={requests}
                pagination={requestPagination ?? undefined}
                onPageChange={handleRequestPageChange}
              />
            )}

            {currentPagination && (
              <div className="text-sm text-gray-500 text-center">
                Total: {currentPagination.total}{" "}
                {activeTab === "bookings" ? "bookings" : "requests"}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
