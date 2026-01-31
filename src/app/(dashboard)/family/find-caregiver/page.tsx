"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import {
  Home,
  Search,
  Users,
  Heart,
  Brain,
  Calendar,
  Truck,
  Settings,
  Star,
  MapPin,
  DollarSign,
  Filter,
  CheckCircle,
  Award,
  Clock,
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

export default function FindCaregiverPage() {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");

  useEffect(() => {
    fetchCaregivers();
  }, [selectedType]);

  const fetchCaregivers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/caregivers/search?type=${selectedType}`);
      const data = await response.json();
      setCaregivers(data.caregivers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (caregiverId: string) => {
    // Will implement booking modal later
    alert(`Booking caregiver ${caregiverId}`);
  };

  const filteredCaregivers = caregivers.filter((c) =>
    c.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="family" />}>
      <div className="space-y-8">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Find Your Perfect Caregiver</h1>
            <p className="text-primary-100 text-lg">Browse verified, experienced caregivers in your area</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium"
              >
                <option value="ALL">All Types</option>
                <option value="NURSE">Nurse</option>
                <option value="PHYSIOTHERAPIST">Physiotherapist</option>
                <option value="THERAPIST">Therapist</option>
                <option value="ELDER_CARE_SPECIALIST">Elder Care</option>
                <option value="COMPANION">Companion</option>
              </select>
              <button className="px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Available Caregivers", value: caregivers.length, icon: Users, color: "bg-primary-100 text-primary-700" },
            { label: "Avg Response Time", value: "< 2 hrs", icon: Clock, color: "bg-success-soft text-success" },
            { label: "Verified Profiles", value: "100%", icon: CheckCircle, color: "bg-info-soft text-info" },
            { label: "Avg Rating", value: "4.8", icon: Award, color: "bg-warning-soft text-warning" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-6 h-6" />
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
            <p className="mt-4 text-gray-600">Loading caregivers...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Verified Badge */}
                {caregiver.verificationStatus === "VERIFIED" && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  </div>
                )}

                {/* Gradient Header */}
                <div className="h-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700"></div>

                <div className="p-6 -mt-12">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-4 ring-4 ring-white">
                    {caregiver.user.image ? (
                      <img src={caregiver.user.image} alt={caregiver.user.name} className="w-full h-full rounded-2xl object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-primary-600">{caregiver.user.name[0]}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{caregiver.user.name}</h3>
                      <p className="text-primary-600 font-medium">{caregiver.caregiverType.replace("_", " ")}</p>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {caregiver.bio || "Experienced caregiver dedicated to providing quality care."}
                    </p>

                    {/* Specializations */}
                    {caregiver.specializations && caregiver.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {caregiver.specializations.slice(0, 3).map((spec: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-lg font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-sm pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="w-4 h-4" fill="currentColor" />
                        <span className="font-bold text-gray-900">{Number(caregiver.rating || 4.8).toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{caregiver.city}, {caregiver.state}</span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-5 h-5 text-success" />
                          <span className="text-2xl font-bold text-gray-900">{caregiver.hourlyRate}</span>
                          <span className="text-gray-500">/hr</span>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleBook(caregiver.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCaregivers.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No caregivers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
            <Button variant="outline" onClick={() => {setSearchTerm(""); setSelectedType("ALL");}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
