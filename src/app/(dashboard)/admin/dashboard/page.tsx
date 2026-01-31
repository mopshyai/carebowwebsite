"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  Home,
  Users,
  UserCheck,
  Shield,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserCheck, label: "Caregivers", href: "/admin/caregivers" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminDashboard() {
  // Mock data
  const pendingVerifications = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      type: "Nurse",
      submittedDate: "Dec 20, 2025",
      documents: 3,
    },
    {
      id: 2,
      name: "John Williams",
      type: "Physiotherapist",
      submittedDate: "Dec 21, 2025",
      documents: 4,
    },
  ];

  const recentBookings = [
    {
      id: 1,
      family: "Anderson Family",
      caregiver: "Nurse Mary",
      date: "Dec 24, 2025",
      status: "confirmed",
      amount: "$120",
    },
    {
      id: 2,
      family: "Smith Family",
      caregiver: "Dr. Sarah",
      date: "Dec 25, 2025",
      status: "pending",
      amount: "$80",
    },
  ];

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="admin" />}>
      <div className="space-y-6">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-primary-100 text-lg">Platform overview and management</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="3,245"
            icon={<Users className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            subtitle="this month"
            color="primary"
          />
          <StatsCard
            title="Active Caregivers"
            value="487"
            icon={<UserCheck className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
            subtitle="this month"
            color="secondary"
          />
          <StatsCard
            title="Total Bookings"
            value="1,829"
            icon={<Calendar className="w-6 h-6" />}
            color="success"
          />
          <StatsCard
            title="Revenue This Month"
            value="$45,290"
            icon={<DollarSign className="w-6 h-6" />}
            trend={{ value: 18, isPositive: true }}
            subtitle="vs last month"
            color="warning"
          />
        </div>

        {/* Alerts */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-warning">
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-warning-soft rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingVerifications.length}</p>
                <p className="text-sm text-gray-600">Pending Verifications</p>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-error">
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-error-soft rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Reported Issues</p>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-success">
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-success-soft rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
                <p className="text-sm text-gray-600">Platform Uptime</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Verifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Verifications
              </h2>
              <Link href="/admin/caregivers">
                <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-800">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {pendingVerifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-2 border-gray-100 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.type}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {item.submittedDate} • {item.documents} documents
                      </p>
                    </div>
                    <Badge variant="warning">Pending</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Review
                    </Button>
                  </div>
                </div>
              ))}

              {pendingVerifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No pending verifications</p>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Bookings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-800">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 border-2 border-gray-100 rounded-xl hover:border-primary-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{booking.family}</p>
                      <p className="text-sm text-gray-600">
                        with {booking.caregiver}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.date} • {booking.amount}
                      </p>
                    </div>
                    <Badge
                      variant={
                        booking.status === "confirmed" ? "success" : "warning"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Platform Statistics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-xl">
              <p className="text-3xl font-bold text-primary-700">234</p>
              <p className="text-sm text-gray-600 mt-1">New Users (This Week)</p>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-xl">
              <p className="text-3xl font-bold text-secondary-700">156</p>
              <p className="text-sm text-gray-600 mt-1">Active Bookings</p>
            </div>
            <div className="text-center p-4 bg-success-soft rounded-xl">
              <p className="text-3xl font-bold text-success">4.7</p>
              <p className="text-sm text-gray-600 mt-1">Avg. Rating</p>
            </div>
            <div className="text-center p-4 bg-warning-soft rounded-xl">
              <p className="text-3xl font-bold text-warning">$12.5K</p>
              <p className="text-sm text-gray-600 mt-1">Revenue (This Week)</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
