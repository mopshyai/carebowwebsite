"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Users, Calendar, ListTodo, FileText, DollarSign, UserCircle, Settings,
  Plus, Activity, Heart, Clock, X, Stethoscope
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

export default function CareLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: "",
    vitals: "",
    medications: "",
    activities: "",
    notes: "",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/care-logs");
      const data = await response.json();
      if (data.careLogs) {
        setLogs(data.careLogs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/care-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowCreateModal(false);
        setFormData({
          bookingId: "",
          vitals: "",
          medications: "",
          activities: "",
          notes: "",
        });
        fetchLogs();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="caregiver" />}>
      <div className="space-y-8">
        {/* Premium Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3">Care Logs</h1>
              <p className="text-primary-100 text-lg">Document patient care activities</p>
            </div>
            <Button
              variant="primary"
              className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Log
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Logs", value: logs.length, icon: FileText, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "This Week", value: logs.filter(l => new Date(l.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: Calendar, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
            { label: "Patients Logged", value: new Set(logs.map(l => l.booking?.familyId)).size, icon: Users, bgColor: "bg-success-soft", textColor: "text-success" },
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

        {/* Logs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading care logs...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No care logs yet</h3>
            <p className="text-gray-600 mb-6">Start documenting patient care activities</p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Log
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          Care Log for {log.booking?.family?.user?.name || "Patient"}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(log.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="neutral">
                        {log.booking?.serviceType || "Care"}
                      </Badge>
                    </div>

                    {log.vitals && (
                      <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-xs text-red-600 font-medium mb-1 flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          Vitals
                        </p>
                        <p className="text-sm text-gray-700">{log.vitals}</p>
                      </div>
                    )}

                    {log.medications && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-blue-600 font-medium mb-1">Medications</p>
                        <p className="text-sm text-gray-700">{log.medications}</p>
                      </div>
                    )}

                    {log.activities && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-green-600 font-medium mb-1 flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          Activities
                        </p>
                        <p className="text-sm text-gray-700">{log.activities}</p>
                      </div>
                    )}

                    {log.notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-medium mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{log.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Care Log</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateLog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vitals</label>
                  <textarea
                    value={formData.vitals}
                    onChange={(e) => setFormData({ ...formData, vitals: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    placeholder="e.g., BP: 120/80, Temp: 98.6°F, Pulse: 72"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
                  <textarea
                    value={formData.medications}
                    onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    placeholder="Medications administered"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                  <textarea
                    value={formData.activities}
                    onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    placeholder="Activities performed during session"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    required
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    placeholder="General notes about the care session"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting ? "Creating..." : "Create Log"}
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
