"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Home, Users, UserCheck, Shield, Calendar, DollarSign, BarChart3, Settings } from "lucide-react";

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserCheck, label: "Caregivers", href: "/admin/caregivers" },
  { icon: Shield, label: "Verification", href: "/admin/verification" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: DollarSign, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function BookingsPage() {
  const bookings = [
    { id: 1, family: "Johnson Family", caregiver: "Dr. Sarah", date: "2026-01-10", amount: 120, status: "CONFIRMED" },
    { id: 2, family: "Smith Family", caregiver: "Nurse Mary", date: "2026-01-12", amount: 80, status: "PENDING" },
    { id: 3, family: "Williams Family", caregiver: "John W.", date: "2026-01-08", amount: 100, status: "COMPLETED" },
  ];

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="admin" />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Bookings</h1>
          <p className="text-gray-600 mt-1">Platform-wide booking management</p>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Family</th>
                  <th className="pb-3 font-semibold">Caregiver</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">#{booking.id}</td>
                    <td className="py-4">{booking.family}</td>
                    <td className="py-4">{booking.caregiver}</td>
                    <td className="py-4 text-gray-600">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="py-4 font-medium">${booking.amount}</td>
                    <td className="py-4">
                      <Badge variant={
                        booking.status === "CONFIRMED" ? "success" :
                        booking.status === "PENDING" ? "warning" : "info"
                      }>
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
