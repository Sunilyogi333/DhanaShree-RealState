"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Menu, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";

interface NavbarProps {
  toggleSidebar: () => void;
}

// Define the API response type
type AdminResponse = {
  status: boolean;
  data: {
    id: string;
    createdAt: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string | null;
    refreshToken: string;
  };
  message: {
    en: string;
    ne: string;
  };
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();

  // Fetch admin info
  const {
    data: adminData,
    isLoading: isLoadingAdmin,
    error,
  } = useAxiosQuery<AdminResponse>("/admin/me");

  console.log("Admin data:", adminData);

  const handleLogout = () => {
    setIsLoading(true);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/");
    setIsLoading(false);
  };

  // Extract admin info
  const adminInfo = adminData?.data;
  const adminEmail = adminInfo?.email || "admin@example.com";
  const adminRole = adminInfo?.role || "admin";

  // Generate initials for avatar fallback
  const getInitials = (email: string) => {
    const name = email.split("@")[0];
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="w-full bg-white border-b px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={toggleSidebar}>
            <Menu className="text-sky-800" size={28} />
          </button>
          <h1 className="text-xl font-bold text-sky-800">
            Dhanashree Realstate
          </h1>
        </div>

        {/* Center: Title (hidden on small screens) */}
        <h1 className="text-lg font-semibold text-sky-800 hidden md:block">
          Admin Dashboard
        </h1>

        {/* Right: Admin Info + Notification + Profile */}
        <div className="flex items-center gap-4">
          {/* Admin Info (hidden on mobile) */}
          <div className="hidden lg:flex flex-col items-end">
            {isLoadingAdmin ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">
                Error loading admin info
              </div>
            ) : (
              <>
                <span className="text-sm font-medium text-gray-900">
                  {adminEmail}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {adminRole}
                </span>
              </>
            )}
          </div>

          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-sky-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New user registered</DropdownMenuItem>
              <DropdownMenuItem>New property submitted</DropdownMenuItem>
              <DropdownMenuItem>Payment received</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/admin-avatar.jpg" alt="Admin Avatar" />
                <AvatarFallback className="bg-sky-100 text-sky-800">
                  {getInitials(adminEmail)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* Admin Info in Dropdown (visible on mobile) */}
              <div className="lg:hidden px-2 py-2 border-b">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-sky-600" />
                  <div>
                    <p className="text-sm font-medium">{adminEmail}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {adminRole}
                    </p>
                  </div>
                </div>
              </div>

              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                <LogOut className="w-4 h-4 mr-2" />
                {isLoading ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
