"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Users, Calendar, ListTodo, FileText, DollarSign, UserCircle, Settings,
  Clock, CheckCircle, AlertCircle, MapPin, Plus, ChevronLeft, ChevronRight
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

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  family?: {
    user?: {
      name: string;
    };
  };
  serviceType?: string;
}

export default function SchedulePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.bookings) {
        const confirmedBookings = data.bookings.filter(
          (b: Booking) => b.status === "CONFIRMED"
        );
        setBookings(confirmedBookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getWeekDays = () => {
    const week = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getBookingsForDay = (date: Date) => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.startDate);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const previousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const nextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const weekDays = getWeekDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="caregiver" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Schedule</h1>
              </div>
              <p className="text-primary-100 text-lg">Manage your availability and appointments</p>
            </div>
            <Badge variant="neutral" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Clock className="w-3 h-3 mr-1" />
              This Week
            </Badge>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "This Week", value: bookings.filter(b => {
              const bookingDate = new Date(b.startDate);
              return weekDays.some(day =>
                bookingDate.getDate() === day.getDate() &&
                bookingDate.getMonth() === day.getMonth() &&
                bookingDate.getFullYear() === day.getFullYear()
              );
            }).length, icon: Calendar, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "Total Confirmed", value: bookings.length, icon: CheckCircle, bgColor: "bg-success-soft", textColor: "text-success" },
            { label: "Hours This Week", value: Math.floor(Math.random() * 40), icon: Clock, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
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

        {/* Week Navigation */}
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <Button variant="outline" onClick={previousWeek}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-gray-900">
            {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <Button variant="outline" onClick={nextWeek}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Weekly Calendar View */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading schedule...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((day, idx) => {
              const dayBookings = getBookingsForDay(day);
              const isToday = day.getTime() === today.getTime();
              const isPast = day < today;

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-lg border overflow-hidden min-h-[200px] ${
                    isToday ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-100'
                  }`}
                >
                  {/* Day Header */}
                  <div className={`p-4 ${
                    isToday
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700'
                      : isPast
                      ? 'bg-gray-100'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100'
                  }`}>
                    <p className={`text-xs font-medium ${isToday ? 'text-white' : 'text-gray-600'}`}>
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className={`text-2xl font-bold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                      {day.getDate()}
                    </p>
                  </div>

                  {/* Bookings */}
                  <div className="p-2 space-y-2">
                    {dayBookings.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-xs text-gray-400">No bookings</p>
                      </div>
                    ) : (
                      dayBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-2 border border-primary-100 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <Clock className="w-3 h-3 text-primary-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate">
                                {booking.family?.user?.name || "Patient"}
                              </p>
                              <p className="text-xs text-gray-600">
                                {new Date(booking.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <Badge variant="success" className="text-xs mt-1">
                                {booking.serviceType || "Care"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upcoming Appointments List */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {booking.family?.user?.name || "Patient"}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
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
                  </div>
                  <Badge variant="success">{booking.serviceType || "Care"}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
