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
  Calendar,
  ListTodo,
  FileText,
  DollarSign,
  UserCircle,
  Settings,
  Clock,
  CheckCircle,
  X,
  Star,
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

export default function CaregiverDashboard() {
  // Mock data
  const pendingBookings = [
    {
      id: 1,
      familyName: "Johnson Family",
      service: "Elder Care",
      date: "Dec 24, 2025",
      hours: 4,
      amount: 120,
    },
    {
      id: 2,
      familyName: "Smith Family",
      service: "Physiotherapy",
      date: "Dec 25, 2025",
      hours: 2,
      amount: 80,
    },
  ];

  const todaySchedule = [
    {
      id: 1,
      time: "9:00 AM - 1:00 PM",
      patient: "Mrs. Anderson",
      task: "Morning care routine",
      status: "completed",
    },
    {
      id: 2,
      time: "2:00 PM - 4:00 PM",
      patient: "Mr. Thompson",
      task: "Physiotherapy session",
      status: "upcoming",
    },
  ];

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="caregiver" />}>
      <div className="space-y-6">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-primary-100 text-lg">Here&apos;s your day at a glance.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Patients"
            value="5"
            icon={<Users className="w-6 h-6" />}
            color="primary"
          />
          <StatsCard
            title="This Week's Bookings"
            value="12"
            icon={<Calendar className="w-6 h-6" />}
            color="secondary"
          />
          <StatsCard
            title="Earnings This Month"
            value="$2,450"
            icon={<DollarSign className="w-6 h-6" />}
            trend={{ value: 15, isPositive: true }}
            subtitle="vs last month"
            color="success"
          />
          <StatsCard
            title="Rating"
            value="4.8"
            icon={<Star className="w-6 h-6" />}
            color="warning"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Booking Requests */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Requests ({pendingBookings.length})
              </h2>
              <Link href="/caregiver/bookings">
                <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-800">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {pendingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 border-2 border-gray-100 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{booking.familyName}</p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.date} • {booking.hours} hours • ${booking.amount}
                      </p>
                    </div>
                    <Badge variant="warning">Pending</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}

              {pendingBookings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No pending requests</p>
                </div>
              )}
            </div>
          </Card>

          {/* Today's Schedule */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Today&apos;s Schedule</h2>
              <Link href="/caregiver/schedule">
                <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-800">
                  Full Schedule
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {todaySchedule.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-2 border-gray-100 rounded-xl hover:border-primary-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-sm font-medium text-gray-600">{item.time}</p>
                      </div>
                      <p className="font-medium text-gray-900">{item.patient}</p>
                      <p className="text-sm text-gray-600">{item.task}</p>
                    </div>
                    <Badge variant={item.status === "completed" ? "success" : "primary"}>
                      {item.status === "completed" ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                </div>
              ))}

              {todaySchedule.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No appointments today</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/caregiver/care-logs">
              <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-primary-700" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                  Add Care Log
                </span>
              </button>
            </Link>

            <Link href="/caregiver/schedule">
              <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-secondary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-secondary-700" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                  Update Availability
                </span>
              </button>
            </Link>

            <Link href="/caregiver/my-patients">
              <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-success-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                  View Patients
                </span>
              </button>
            </Link>

            <Link href="/caregiver/earnings">
              <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-warning-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                  View Earnings
                </span>
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
