"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Home, Users, Calendar, ListTodo, FileText, DollarSign, UserCircle, Settings,
  Save, Star, Award, Clock, MapPin, Briefcase, GraduationCap, CheckCircle, X, Plus
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

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    bio: "",
    hourlyRate: "",
    yearsOfExperience: "",
    languages: [] as string[],
    specializations: [] as string[],
    certifications: [] as string[],
    availability: "FULL_TIME",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // In production, fetch from /api/caregiver/profile
      await new Promise(resolve => setTimeout(resolve, 500));
      setProfileData({
        bio: "Experienced caregiver with a passion for helping seniors maintain their independence and quality of life. Specialized in dementia care and post-surgery recovery.",
        hourlyRate: "35",
        yearsOfExperience: "10",
        languages: ["English", "Spanish"],
        specializations: ["Dementia Care", "Post-Surgery Recovery", "Meal Preparation"],
        certifications: ["CNA License", "CPR Certified", "First Aid"],
        availability: "FULL_TIME",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const response = await fetch("/api/caregiver/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const addSpecialization = () => {
    if (newSkill && !profileData.specializations.includes(newSkill)) {
      setProfileData({
        ...profileData,
        specializations: [...profileData.specializations, newSkill],
      });
      setNewSkill("");
    }
  };

  const removeSpecialization = (skill: string) => {
    setProfileData({
      ...profileData,
      specializations: profileData.specializations.filter((s) => s !== skill),
    });
  };

  const addCertification = () => {
    if (newCertification && !profileData.certifications.includes(newCertification)) {
      setProfileData({
        ...profileData,
        certifications: [...profileData.certifications, newCertification],
      });
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setProfileData({
      ...profileData,
      certifications: profileData.certifications.filter((c) => c !== cert),
    });
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
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Professional Profile</h1>
              </div>
              <p className="text-primary-100 text-lg">Showcase your skills and experience</p>
            </div>
            <Badge variant="neutral" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Star className="w-3 h-3 mr-1" />
              4.9 Rating
            </Badge>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Experience", value: `${profileData.yearsOfExperience} years`, icon: Briefcase, bgColor: "bg-primary-100", textColor: "text-primary-700" },
            { label: "Hourly Rate", value: `$${profileData.hourlyRate}`, icon: DollarSign, bgColor: "bg-success-soft", textColor: "text-success" },
            { label: "Certifications", value: profileData.certifications.length, icon: Award, bgColor: "bg-secondary-100", textColor: "text-secondary-700" },
            { label: "Availability", value: profileData.availability.replace("_", " "), icon: Clock, bgColor: "bg-warning-soft", textColor: "text-warning" },
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

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        ) : (
          <>
            {/* Basic Information */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                  <p className="text-gray-600">Your professional details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    rows={4}
                    placeholder="Tell families about your experience and approach to care..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                        placeholder="35"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={profileData.yearsOfExperience}
                        onChange={(e) => setProfileData({ ...profileData, yearsOfExperience: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      value={profileData.availability}
                      onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    >
                      <option value="FULL_TIME">Full Time</option>
                      <option value="PART_TIME">Part Time</option>
                      <option value="WEEKENDS">Weekends Only</option>
                      <option value="LIVE_IN">Live-in Care</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Specializations</h2>
                  <p className="text-gray-600">Areas of expertise</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all"
                    placeholder="Add a specialization (e.g., Dementia Care)"
                  />
                  <Button variant="primary" onClick={addSpecialization}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.specializations.map((skill) => (
                    <Badge key={skill} variant="neutral" className="text-sm px-3 py-1 flex items-center gap-2">
                      {skill}
                      <button onClick={() => removeSpecialization(skill)} className="hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {profileData.specializations.length === 0 && (
                    <p className="text-gray-500 text-sm">No specializations added yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-success-soft to-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Certifications & Licenses</h2>
                  <p className="text-gray-600">Your professional credentials</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCertification()}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-success focus:ring-4 focus:ring-green-100 transition-all"
                    placeholder="Add a certification (e.g., CNA License)"
                  />
                  <Button variant="primary" onClick={addCertification}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {profileData.certifications.map((cert) => (
                    <div key={cert} className="flex items-center justify-between p-3 bg-success-soft rounded-xl border border-green-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="font-medium text-gray-900">{cert}</span>
                      </div>
                      <button onClick={() => removeCertification(cert)} className="text-red-600 hover:text-red-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {profileData.certifications.length === 0 && (
                    <p className="text-gray-500 text-sm">No certifications added yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>Saving...</>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
