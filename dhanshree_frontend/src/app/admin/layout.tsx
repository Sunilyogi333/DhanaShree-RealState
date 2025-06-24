"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "./Sidebar";
import { useState } from "react";
import Navbar from "./Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
   
    <QueryClientProvider client={queryClient}>
      <div className="relative flex h-screen overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main content area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          
          {/* Top Navbar */}
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
