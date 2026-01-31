"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Search, Users, Heart, Brain, Calendar, Truck, Settings,
  Plus, Clock, CheckCircle, XCircle, AlertCircle, MapPin, DollarSign
} from "lucide-react";

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

export default function AppointmentsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBookings = bookings.filter((b) =>
    filter === "ALL" ? true : b.status === filter
  );

  const getStatusBadge = (status: string) => {
    const configs = {
      CONFIRMED: { variant: "success" as const, icon: CheckCircle, text: "Confirmed" },
      PENDING: { variant: "warning" as const, icon: AlertCircle, text: "Pending" },
      COMPLETED: { variant: "neutral" as const, icon: CheckCircle, text: "Completed" },
      CANCELLED: { variant: "danger" as const, icon: XCircle, text: "Cancelled" },
    };
    const config = configs[status as keyof typeof configs] || configs.PENDING;
    return (
      <Badge variant={config.variant}>
        <config.icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
  };

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="family" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3">Appointments</h1>
              <p className="text-primary-100 text-lg">Manage your care schedule</p>
            </div>
            <Button
              variant="primary"
              className="bg-white text-primary-700 hover:bg-gray-100 shadow-lg"
              onClick={() => window.location.href = "/family/find-caregiver"}
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: stats.total, icon: Calendar, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "Confirmed", value: stats.confirmed, icon: CheckCircle, bgColor: "bg-success-soft", textColor: "text-success" },
            { label: "Pending", value: stats.pending, icon: AlertCircle, bgColor: "bg-warning-soft", textColor: "text-warning" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          <div className="flex gap-2">
            {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === status
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-6">
              {filter === "ALL" ? "Book your first appointment" : `No ${filter.toLowerCase()} appointments`}
            </p>
            <Button variant="primary" onClick={() => window.location.href = "/family/find-caregiver"}>
              Find Caregiver
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-8 h-8 text-primary-600" />
                      </div>

                      {/* Info */}
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{booking.serviceType || "Care Session"}</h3>
                          <p className="text-primary-600 font-medium">
                            with {booking.caregiver?.user?.name || "Caregiver"}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(booking.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.caregiver?.city}, {booking.caregiver?.state}</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600 font-medium">
                            <DollarSign className="w-4 h-4" />
                            <span>${Number(booking.totalCost || 0).toFixed(2)}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                            {booking.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-3">
                      {getStatusBadge(booking.status)}
                      {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
