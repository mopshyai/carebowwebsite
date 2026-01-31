"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";
import StatsCard from "@/components/dashboard/StatsCard";
import { Home, Users, UserCheck, Calendar, DollarSign, BarChart3, Settings, TrendingUp, Activity } from "lucide-react";

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserCheck, label: "Caregivers", href: "/admin/caregivers" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="admin" />}>
      <div className="space-y-6">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-primary-100">Platform performance and insights</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value="$125,450"
            icon={<DollarSign className="w-6 h-6" />}
            trend={{ value: 23, isPositive: true }}
            color="success"
          />
          <StatsCard
            title="Active Users"
            value="3,245"
            icon={<Users className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            color="primary"
          />
          <StatsCard
            title="Avg. Booking Value"
            value="$95"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 5, isPositive: true }}
            color="secondary"
          />
          <StatsCard
            title="Platform Activity"
            value="98.5%"
            icon={<Activity className="w-6 h-6" />}
            color="warning"
          />
        </div>

        <Card className="p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-primary-600" />
            </div>
            <p className="text-gray-900 font-medium mb-2">Detailed analytics coming soon</p>
            <p className="text-sm text-gray-500">Charts, graphs, and insights</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
