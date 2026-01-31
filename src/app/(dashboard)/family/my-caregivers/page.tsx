"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import {
  Home, Search, Users, Heart, Brain, Calendar, Truck, Settings,
  Star, Phone, Mail, MessageCircle, CheckCircle, MapPin, Award, TrendingUp
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

export default function MyCaregiversPage() {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCaregivers();
  }, []);

  const fetchMyCaregivers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();

      // Get unique caregivers from confirmed bookings
      if (data.bookings) {
        const uniqueCaregivers = new Map();
        data.bookings
          .filter((b: any) => b.status === "CONFIRMED")
          .forEach((booking: any) => {
            if (!uniqueCaregivers.has(booking.caregiver.id)) {
              uniqueCaregivers.set(booking.caregiver.id, {
                ...booking.caregiver,
                totalBookings: 1,
              });
            } else {
              const existing = uniqueCaregivers.get(booking.caregiver.id);
              existing.totalBookings += 1;
            }
          });
        setCaregivers(Array.from(uniqueCaregivers.values()));
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
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-3">My Caregivers</h1>
            <p className="text-primary-100 text-lg">Manage your trusted care team</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Caregivers", value: caregivers.length, icon: Users, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "Total Sessions", value: caregivers.reduce((acc, c) => acc + (c.totalBookings || 0), 0), icon: Calendar, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
            { label: "Avg Rating", value: "4.8★", icon: Award, bgColor: "bg-warning-soft", textColor: "text-warning" },
            { label: "Response Rate", value: "98%", icon: TrendingUp, bgColor: "bg-success-soft", textColor: "text-success" },
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

        {/* Caregivers Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your caregivers...</p>
          </div>
        ) : caregivers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No caregivers yet</h3>
            <p className="text-gray-600 mb-6">Start by finding and booking a caregiver</p>
            <Button variant="primary" onClick={() => window.location.href = "/family/find-caregiver"}>
              Find Caregiver
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient Header */}
                <div className="h-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700"></div>

                <div className="p-6 -mt-10">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center ring-4 ring-white">
                        {caregiver.user?.image ? (
                          <img src={caregiver.user.image} alt={caregiver.user.name} className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          <span className="text-3xl font-bold text-primary-600">
                            {caregiver.user?.name?.[0] || "C"}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            {caregiver.user?.name || "Caregiver"}
                            {caregiver.verificationStatus === "VERIFIED" && (
                              <CheckCircle className="w-5 h-5 text-success" />
                            )}
                          </h3>
                          <p className="text-primary-600 font-medium">
                            {caregiver.caregiverType?.replace(/_/g, " ") || "Caregiver"}
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm">
                          {caregiver.bio || "Experienced caregiver dedicated to providing quality care."}
                        </p>

                        {/* Specializations */}
                        {caregiver.specializations && caregiver.specializations.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {caregiver.specializations.slice(0, 3).map((spec: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-lg font-medium">
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stats Row */}
                        <div className="flex items-center gap-6 text-sm pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4" fill="currentColor" />
                            <span className="font-bold text-gray-900">{Number(caregiver.rating || 4.8).toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{caregiver.totalBookings || 0} sessions</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{caregiver.city}, {caregiver.state}</span>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex gap-4 text-sm text-gray-600">
                          {caregiver.user?.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{caregiver.user.phone}</span>
                            </div>
                          )}
                          {caregiver.user?.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              <span>{caregiver.user.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary-50 hover:border-primary-300"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => window.location.href = "/family/appointments"}
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Book Again
                      </Button>
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
