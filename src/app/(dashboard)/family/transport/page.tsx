"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Search, Users, Heart, Brain, Calendar, Truck, Settings,
  MapPin, Clock, CheckCircle, AlertCircle, X, Navigation
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

export default function TransportPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    notes: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from /api/transport/requests
      await new Promise(resolve => setTimeout(resolve, 500));
      setRequests([]); // No transport requests yet
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/transport/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowRequestModal(false);
        setFormData({
          pickup: "",
          dropoff: "",
          date: new Date().toISOString().split("T")[0],
          time: "",
          notes: "",
        });
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="family" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-700 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3">Medical Transport</h1>
              <p className="text-secondary-100 text-lg">Safe and reliable transportation services</p>
            </div>
            <Button
              variant="primary"
              className="bg-white text-secondary-700 hover:bg-gray-100 shadow-lg"
              onClick={() => setShowRequestModal(true)}
            >
              <Truck className="w-4 h-4 mr-2" />
              Request Transport
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Requests", value: requests.length, icon: Truck, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
            { label: "Completed", value: requests.filter(r => r.status === "COMPLETED").length, icon: CheckCircle, bgColor: "bg-success-soft", textColor: "text-success" },
            { label: "Pending", value: requests.filter(r => r.status === "PENDING").length, icon: AlertCircle, bgColor: "bg-warning-soft", textColor: "text-warning" },
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

        {/* Requests List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transport requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No transport requests yet</h3>
            <p className="text-gray-600 mb-6">Request your first medical transport service</p>
            <Button variant="primary" onClick={() => setShowRequestModal(true)}>
              <Truck className="w-4 h-4 mr-2" />
              Request Transport
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-8 h-8 text-secondary-600" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Pickup</p>
                          <p className="font-semibold text-gray-900">{request.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Drop-off</p>
                          <p className="font-semibold text-gray-900">{request.dropoff}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(request.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{request.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={request.status === "COMPLETED" ? "success" : "warning"}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Transport</h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                  <input
                    type="text"
                    required
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all"
                    placeholder="Enter pickup address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
                  <input
                    type="text"
                    required
                    value={formData.dropoff}
                    onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all"
                    placeholder="Enter destination"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all"
                    placeholder="Any special requirements?"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowRequestModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting ? "Requesting..." : "Request"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
