"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home,
  Search,
  Users,
  Heart,
  Brain,
  Calendar,
  Truck,
  Settings,
  Plus,
  Clock,
  CheckCircle,
  Activity,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/family/dashboard" },
  { icon: Search, label: "Find Caregiver", href: "/family/find-caregiver" },
  { icon: Users, label: "My Caregivers", href: "/family/my-caregivers" },
  { icon: Heart, label: "Health Records", href: "/family/health-records" },
  { icon: Brain, label: "AI Assistant", href: "/family/ai-assistant" },
  { icon: Calendar, label: "Appointments", href: "/family/appointments" },
  { icon: Truck, label: "Transport", href: "/family/transport" },
  { icon: Settings, label: "Settings", href: "/family/settings" },
];

export default function FamilyDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeCaregivers: 0,
    upcomingAppointments: 0,
    healthRecords: 0,
    careHours: 0,
  });
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [careLogs, setCareLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch bookings
      const bookingsRes = await fetch("/api/bookings");
      const bookingsData = await bookingsRes.json();

      // Fetch health records
      const recordsRes = await fetch("/api/health-records");
      const recordsData = await recordsRes.json();

      // Fetch care logs
      const logsRes = await fetch("/api/care-logs");
      const logsData = await logsRes.json();

      if (bookingsData.bookings) {
        const upcoming = bookingsData.bookings
          .filter((b: any) => b.status === "CONFIRMED" && new Date(b.startDate) > new Date())
          .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
          .slice(0, 3);
        setUpcomingBookings(upcoming);

        // Calculate unique caregivers
        const uniqueCaregivers = new Set(
          bookingsData.bookings
            .filter((b: any) => b.status === "CONFIRMED")
            .map((b: any) => b.caregiverId)
        );

        setStats({
          activeCaregivers: uniqueCaregivers.size,
          upcomingAppointments: upcoming.length,
          healthRecords: recordsData.records?.length || 0,
          careHours: bookingsData.bookings.filter((b: any) => b.status === "COMPLETED").length * 2, // Estimate
        });
      }

      if (logsData.careLogs) {
        setCareLogs(logsData.careLogs.slice(0, 5));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="family" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-primary-100 text-lg">Here&apos;s what&apos;s happening with your family&apos;s care</p>
            </div>
            <Link href="/family/find-caregiver">
              <Button variant="secondary" size="lg" className="shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Find Caregiver
              </Button>
            </Link>
          </div>
        </div>

        {/* Premium Stats */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Caregivers", value: stats.activeCaregivers, icon: Users, color: "bg-primary-100 text-primary-700" },
              { label: "Upcoming Appointments", value: stats.upcomingAppointments, icon: Calendar, color: "bg-secondary-100 text-secondary-700" },
              { label: "Health Records", value: stats.healthRecords, icon: Heart, color: "bg-success-soft text-success" },
              { label: "Care Hours", value: stats.careHours, icon: Clock, color: "bg-warning-soft text-warning" },
            ].map((stat, idx) => (
              <div key={idx} className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-500"></div>
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: "/family/find-caregiver", icon: Search, label: "Find Caregiver", color: "bg-primary-100 text-primary-700" },
              { href: "/family/appointments", icon: Calendar, label: "Book Appointment", color: "bg-secondary-100 text-secondary-700" },
              { href: "/family/health-records", icon: Heart, label: "Upload Record", color: "bg-success-soft text-success" },
              { href: "/family/ai-assistant", icon: Brain, label: "AI Assistant", color: "bg-info-soft text-info" },
            ].map((action, idx) => (
              <Link key={idx} href={action.href}>
                <button className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-primary-300 hover:bg-primary-50 transition-all text-center group">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors">
                    {action.label}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link href="/family/appointments">
                <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-800">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 border-2 border-gray-100 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-primary-900">
                          {booking.caregiver?.user?.name || "Caregiver"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{booking.bookingType || "Care Session"}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(booking.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No upcoming appointments</p>
                  <Link href="/family/find-caregiver">
                    <Button variant="outline" size="sm" className="mt-4">
                      Book Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Care Logs</h2>

            <div className="space-y-4">
              {careLogs.length > 0 ? (
                careLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Care log from {log.booking?.caregiver?.user?.name || "Caregiver"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{log.notes || log.activities}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency SOS Banner */}
        <div className="bg-error-soft border border-error/20 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-error" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Emergency SOS</h3>
              <p className="text-sm text-gray-600">Need immediate assistance? Our emergency feature is always available.</p>
            </div>
            <Link href="/family/emergency">
              <Button variant="primary" className="bg-error hover:bg-red-700">
                SOS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
