"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Sidebar, { NavItem } from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Home, Users, UserCheck, Shield, Calendar, DollarSign, BarChart3, Settings, Star } from "lucide-react";

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

export default function CaregiversPage() {
  const caregivers = [
    { id: 1, name: "Dr. Sarah Johnson", type: "Nurse", rating: 4.9, bookings: 45, status: "VERIFIED" },
    { id: 2, name: "John Williams", type: "Physiotherapist", rating: 4.7, bookings: 32, status: "PENDING" },
    { id: 3, name: "Mary Smith", type: "Elder Care", rating: 4.8, bookings: 38, status: "VERIFIED" },
  ];

  return (
    <DashboardLayout sidebar={<Sidebar navItems={navItems} title="Carebow" userType="admin" />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Caregivers</h1>
          <p className="text-gray-600 mt-1">Manage and verify caregivers</p>
        </div>

        <div className="grid gap-4">
          {caregivers.map((caregiver) => (
            <Card key={caregiver.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-lg">{caregiver.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{caregiver.name}</h3>
                    <p className="text-gray-600">{caregiver.type}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span>{caregiver.rating}</span>
                      </div>
                      <span>{caregiver.bookings} bookings</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={caregiver.status === "VERIFIED" ? "success" : "warning"}>
                    {caregiver.status}
                  </Badge>
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
