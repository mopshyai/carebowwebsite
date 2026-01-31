"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Home, Users, UserCheck, Shield, Calendar, DollarSign, BarChart3, Settings, Save } from "lucide-react";

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserCheck, label: "Caregivers", href: "/admin/caregivers" },
  { icon: Shield, label: "Verification", href: "/admin/verification" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: DollarSign, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="admin" />}>
      <div className="space-y-6">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
            <p className="text-primary-100">Configure system-wide settings</p>
          </div>
        </div>

        <Card>
          <h2 className="text-xl font-bold mb-6">General Settings</h2>
          <div className="space-y-4">
            <Input label="Platform Name" defaultValue="Carebow" />
            <Input label="Support Email" type="email" defaultValue="support@carebow.com" />
            <Input label="Platform Fee (%)" type="number" defaultValue="10" />
            <Button variant="primary" icon={<Save />}>Save Settings</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-6">Email Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-primary-600" defaultChecked />
              <span className="text-gray-900">Send weekly reports to admins</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 text-primary-600" defaultChecked />
              <span className="text-gray-900">Alert on new user registrations</span>
            </label>
            <Button variant="primary" icon={<Save />}>Save Preferences</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
