'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    setIsLoading(true);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/");
    setIsLoading(false);
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

        {/* Right: Notification + Profile */}
        <div className="flex items-center gap-4">
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
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
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
