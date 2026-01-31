"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Search, Users, Heart, Brain, Calendar, Truck, Settings,
  Upload, FileText, Download, X, Plus, Activity, File, Image as ImageIcon
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

export default function HealthRecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "LAB_REPORT",
    date: new Date().toISOString().split("T")[0],
    doctorName: "",
    file: null as File | null,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/health-records");
      const data = await response.json();
      if (data.records) {
        setRecords(data.records);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;

    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", formData.file);
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("date", formData.date);
      data.append("doctorName", formData.doctorName);

      const response = await fetch("/api/health-records", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setShowUploadModal(false);
        setFormData({
          title: "",
          type: "LAB_REPORT",
          date: new Date().toISOString().split("T")[0],
          doctorName: "",
          file: null,
        });
        fetchRecords();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: any = {
      LAB_REPORT: { icon: Activity, color: "primary" },
      IMAGING: { icon: ImageIcon, color: "info" },
      PRESCRIPTION: { icon: FileText, color: "success" },
      MEDICAL_REPORT: { icon: File, color: "secondary" },
    };
    return icons[type] || icons.MEDICAL_REPORT;
  };

  const stats = {
    total: records.length,
    labReports: records.filter((r) => r.type === "LAB_REPORT").length,
    imaging: records.filter((r) => r.type === "IMAGING").length,
    prescriptions: records.filter((r) => r.type === "PRESCRIPTION").length,
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
              <h1 className="text-4xl font-bold text-white mb-3">Health Records</h1>
              <p className="text-primary-100 text-lg">Your medical documents in one place</p>
            </div>
            <Button
              variant="primary"
              className="bg-white text-primary-700 hover:bg-gray-100 shadow-lg"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Record
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Records", value: stats.total, icon: FileText, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "Lab Reports", value: stats.labReports, icon: Activity, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
            { label: "Imaging", value: stats.imaging, icon: ImageIcon, bgColor: "bg-info-soft", textColor: "text-info" },
            { label: "Prescriptions", value: stats.prescriptions, icon: File, bgColor: "bg-success-soft", textColor: "text-success" },
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

        {/* Records Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading health records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No health records yet</h3>
            <p className="text-gray-600 mb-6">Upload your first medical document</p>
            <Button variant="primary" onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Record
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {records.map((record) => {
              const typeConfig = getTypeIcon(record.type);
              const IconComponent = typeConfig.icon;
              return (
                <div
                  key={record.id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-7 h-7 text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{record.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="neutral">
                          {record.type.replace(/_/g, " ")}
                        </Badge>
                        {record.doctorName && (
                          <span className="text-sm text-gray-600">Dr. {record.doctorName}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(record.fileUrl, "_blank")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(record.fileUrl, "_blank")}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Health Record</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    placeholder="e.g., Blood Test Results"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                  >
                    <option value="LAB_REPORT">Lab Report</option>
                    <option value="IMAGING">Imaging</option>
                    <option value="PRESCRIPTION">Prescription</option>
                    <option value="MEDICAL_REPORT">Medical Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    placeholder="e.g., Dr. Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, JPG, PNG, DOC</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
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
