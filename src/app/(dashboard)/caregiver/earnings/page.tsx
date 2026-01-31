"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Badge from "@/components/ui/Badge";
import {
  Home, Users, Calendar, ListTodo, FileText, DollarSign, UserCircle, Settings,
  TrendingUp, Activity, Clock
} from "lucide-react";

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/caregiver/dashboard" },
  { icon: Users, label: "My Patients", href: "/caregiver/my-patients" },
  { icon: Calendar, label: "Schedule", href: "/caregiver/schedule" },
  { icon: ListTodo, label: "Bookings", href: "/caregiver/bookings" },
  { icon: FileText, label: "Care Logs", href: "/caregiver/care-logs" },
  { icon: DollarSign, label: "Earnings", href: "/caregiver/earnings" },
  { icon: UserCircle, label: "Profile", href: "/caregiver/profile" },
  { icon: Settings, label: "Settings", href: "/caregiver/settings" },
];

export default function EarningsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings.filter((b: any) =>
          b.status === "COMPLETED" || b.status === "CONFIRMED"
        ));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = bookings.reduce((acc, b) => acc + Number(b.totalCost || 0), 0);
  const thisMonth = bookings.filter((b) => {
    const date = new Date(b.startDate);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  const lastMonth = bookings.filter((b) => {
    const date = new Date(b.startDate);
    const now = new Date();
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
    return date.getMonth() === lastMonthDate.getMonth() && date.getFullYear() === lastMonthDate.getFullYear();
  });

  const thisMonthEarnings = thisMonth.reduce((acc, b) => acc + Number(b.totalCost || 0), 0);
  const lastMonthEarnings = lastMonth.reduce((acc, b) => acc + Number(b.totalCost || 0), 0);

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="caregiver" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-3">Earnings</h1>
            <p className="text-primary-100 text-lg">Track your income and payments</p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading earnings...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-green-500"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success-soft to-green-100 flex items-center justify-center">
                      <DollarSign className="w-7 h-7 text-success" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-1">This Month</p>
                  <p className="text-4xl font-bold text-success">${thisMonthEarnings.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{thisMonth.length} sessions</span>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-500"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-gray-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Last Month</p>
                  <p className="text-4xl font-bold text-gray-900">${lastMonthEarnings.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{lastMonth.length} sessions</span>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <DollarSign className="w-7 h-7 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total Earned</p>
                  <p className="text-4xl font-bold text-primary-600">${totalEarnings.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{bookings.length} sessions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Payments</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No payment history yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 10).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-primary-900">
                            {booking.family?.user?.name || "Client"}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(booking.startDate).toLocaleDateString()}
                            </span>
                            <span>{booking.serviceType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-success">
                          ${Number(booking.totalCost || 0).toFixed(2)}
                        </p>
                        <Badge variant={booking.status === "COMPLETED" ? "success" : "warning"}>
                          {booking.status === "COMPLETED" ? "Paid" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
