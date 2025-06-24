"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, FileText, Settings, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <Home size={20} /> },
  { label: "Listings", href: "/admin/listings", icon: <FileText size={20} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={20} /> },
  // { label: "", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Lock scroll on mobile when sidebar is open
  // useEffect(() => {
  //   if (isOpen) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "";
  // }, [isOpen]);

  const handleLogout = () => {
    setIsLoading(true);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/");
    setIsLoading(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-sky-800">Admin Panel</h2>
            <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-3 flex-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-sky-100 text-sky-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={toggleSidebar} // close sidebar on link click (mobile)
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
                <Button
              variant="ghost"
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full flex items-center gap-3 px-3 py-2 justify-start text-red-600 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut size={20} className="text-red-600" />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </Button>
          </nav>

          {/* Logout Button at the bottom */}
          <div className=" pt-4 border-t border-gray-200">
        
          </div>
        </div>
      </aside>
    </>
  );
}
