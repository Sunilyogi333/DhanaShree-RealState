// src/app/admin/sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FileText, Settings } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <Home size={20} /> },
  { label: "Listings", href: "/admin/listings", icon: <FileText size={20} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={20} /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-sky-50 border-r shadow-md p-6 flex flex-col">
    <h2 className="text-2xl font-bold text-sky-800 mb-8">Admin Panel</h2>
    <nav className="space-y-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            pathname === link.href
              ? "bg-sky-100 text-sky-800 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  </aside>
  
  );
}
