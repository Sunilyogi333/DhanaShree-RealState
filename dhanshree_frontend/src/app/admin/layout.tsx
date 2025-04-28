import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* <Navbar /> */}
          <main className="p-4 bg-gray-50 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    );
  }