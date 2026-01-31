"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Home, Users, UserCheck, Shield, Calendar, DollarSign, BarChart3, Settings, Search } from "lucide-react";

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

export default function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", type: "FAMILY", joined: "2025-12-01", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", type: "CAREGIVER", joined: "2025-11-15", status: "Active" },
    { id: 3, name: "Mike Smith", email: "mike@example.com", type: "FAMILY", joined: "2025-12-10", status: "Active" },
  ];

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="admin" />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage all platform users</p>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search users..." icon={<Search />} />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Types</option>
            <option>Family</option>
            <option>Caregiver</option>
            <option>Admin</option>
          </select>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Joined</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{user.name}</td>
                    <td className="py-4 text-gray-600">{user.email}</td>
                    <td className="py-4">
                      <Badge variant={user.type === "CAREGIVER" ? "info" : "success"}>
                        {user.type}
                      </Badge>
                    </td>
                    <td className="py-4 text-gray-600">{new Date(user.joined).toLocaleDateString()}</td>
                    <td className="py-4">
                      <Badge variant="success">{user.status}</Badge>
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
