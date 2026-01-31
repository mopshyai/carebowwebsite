"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Search, Users, Heart, Brain, Calendar, Truck, Settings,
  Phone, AlertCircle, Ambulance, Shield, MapPin, Clock, Plus, X
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

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: string;
  relationship?: string;
}

export default function EmergencyPage() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: "1", name: "Dr. Sarah Johnson", number: "+1 (555) 123-4567", type: "Primary Care", relationship: "Doctor" },
    { id: "2", name: "John Doe Sr.", number: "+1 (555) 987-6543", type: "Family", relationship: "Father" },
    { id: "3", name: "Mercy Hospital", number: "+1 (555) 246-8135", type: "Hospital", relationship: "Hospital" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "Family",
    relationship: "",
  });

  const handleEmergencyCall = (number: string) => {
    if (confirm(`Call ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  const handleSOS = () => {
    if (confirm("EMERGENCY: Call 911 now?")) {
      window.location.href = "tel:911";
    }
  };

  const handleAddContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      ...formData,
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
    setShowAddModal(false);
    setFormData({ name: "", number: "", type: "Family", relationship: "" });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "Primary Care": "blue",
      "Family": "green",
      "Hospital": "red",
      "Emergency": "red",
    };
    return colors[type as keyof typeof colors] || "gray";
  };

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="family" />}>
      <div className="space-y-8">
        {/* Premium Header with Red Gradient for Emergency */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-pink-500 rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Emergency</h1>
              </div>
              <p className="text-red-100 text-lg">Quick access to emergency contacts and services</p>
            </div>
            <Badge variant="neutral" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Shield className="w-3 h-3 mr-1" />
              24/7 Available
            </Badge>
          </div>
        </div>

        {/* SOS Emergency Button */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 shadow-xl animate-pulse hover:animate-none transition-all">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Emergency SOS</h2>
              <p className="text-red-100 text-lg">Call 911 for life-threatening emergencies</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 shadow-2xl px-8 py-6 text-xl font-bold"
              onClick={handleSOS}
            >
              <Ambulance className="w-8 h-8 mr-2" />
              CALL 911
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Emergency Contacts", value: emergencyContacts.length, icon: Phone, bgColor: "bg-red-100", textColor: "text-red-600" },
            { label: "Response Time", value: "< 3min", icon: Clock, bgColor: "bg-rose-100", textColor: "text-rose-600" },
            { label: "Always Available", value: "24/7", icon: Shield, bgColor: "bg-pink-100", textColor: "text-pink-600" },
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

        {/* Emergency Contacts Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
            <p className="text-gray-600">Quick dial your trusted contacts</p>
          </div>
          <Button
            variant="primary"
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {/* Emergency Contacts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact) => {
            const color = getTypeColor(contact.type);
            return (
              <div
                key={contact.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Phone className={`w-7 h-7 text-${color}-600`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{contact.name}</h3>
                      <Badge variant="neutral" className="text-xs mt-1">
                        {contact.type}
                      </Badge>
                    </div>
                    {contact.relationship && (
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                    )}
                    <p className="text-lg font-bold text-gray-900">{contact.number}</p>
                    <Button
                      variant="primary"
                      className={`w-full bg-gradient-to-r from-${color}-600 to-${color}-700 hover:from-${color}-700 hover:to-${color}-800`}
                      onClick={() => handleEmergencyCall(contact.number)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Emergency Safety Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Always call 911 for life-threatening emergencies</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Know your current location when calling for help</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Keep this list updated with current contact information</span>
            </li>
          </ul>
        </div>

        {/* Add Contact Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Emergency Contact</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                  >
                    <option value="Family">Family</option>
                    <option value="Primary Care">Primary Care</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    placeholder="e.g., Mother, Doctor, etc."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                    onClick={handleAddContact}
                    disabled={!formData.name || !formData.number}
                  >
                    Add Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
