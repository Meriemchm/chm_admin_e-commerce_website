
"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import { useSidebarStore } from "@/hooks/use-side-bar";

export const DashboardLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { collapsed } = useSidebarStore();

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${collapsed ? "md:w-20" : "md:w-64"}`}>
        <Sidebar />
      </div>

      {/* Contenu */}
      <div className="md:flex-1 md:px-5 px-2">{children}</div>
    </div>
  );
};
