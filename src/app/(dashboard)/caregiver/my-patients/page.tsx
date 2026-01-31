"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import {
  Home, Users, Calendar, ListTodo, FileText, DollarSign, UserCircle, Settings,
  Phone, Mail, Heart, Clock, Activity
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

export default function MyPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();

      if (data.bookings) {
        // Get unique patients from confirmed bookings
        const uniquePatients = new Map();
        data.bookings
          .filter((b: any) => b.status === "CONFIRMED" || b.status === "COMPLETED")
          .forEach((booking: any) => {
            if (!uniquePatients.has(booking.familyId)) {
              uniquePatients.set(booking.familyId, {
                ...booking.family,
                totalSessions: 1,
                lastSession: booking.startDate,
              });
            } else {
              const existing = uniquePatients.get(booking.familyId);
              existing.totalSessions += 1;
              if (new Date(booking.startDate) > new Date(existing.lastSession)) {
                existing.lastSession = booking.startDate;
              }
            }
          });
        setPatients(Array.from(uniquePatients.values()));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="caregiver" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-3">My Patients</h1>
            <p className="text-primary-100 text-lg">Clients you're caring for</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Active Patients", value: patients.length, icon: Users, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "Total Sessions", value: patients.reduce((acc, p) => acc + (p.totalSessions || 0), 0), icon: Calendar, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
            { label: "Satisfaction Rate", value: "4.9★", icon: Heart, bgColor: "bg-warning-soft", textColor: "text-warning" },
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

        {/* Patients List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading patients...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No patients yet</h3>
            <p className="text-gray-600">Accept bookings to see your patients here</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-2xl">
                      {patient.user?.name?.[0] || "P"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl text-gray-900 mb-1">
                      {patient.user?.name || "Patient"}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{patient.totalSessions || 0} sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Last: {new Date(patient.lastSession).toLocaleDateString()}</span>
                      </div>
                      {patient.user?.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{patient.user.phone}</span>
                        </div>
                      )}
                      {patient.user?.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{patient.user.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="primary" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        View Records
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
