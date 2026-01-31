"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebar}

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Mobile top spacing */}
        <div className="h-[57px] md:h-0" />

        {/* Content */}
        <main className="relative z-[1] p-6">{children}</main>
      </div>
    </div>
  );
}
