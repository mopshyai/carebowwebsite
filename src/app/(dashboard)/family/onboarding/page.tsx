"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, Phone, MapPin, Save } from "lucide-react";

export default function FamilyOnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/family/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/family/dashboard");
      } else {
        alert("Failed to create profile. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Family Profile
          </h1>
          <p className="text-gray-600">
            Tell us a bit about yourself to get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Information
            </h2>

            <Input
              label="Street Address"
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="123 Main St"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="San Francisco"
              />

              <Input
                label="State"
                type="text"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="CA"
              />
            </div>

            <Input
              label="ZIP Code"
              type="text"
              required
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              placeholder="94102"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </h2>

            <Input
              label="Phone Number"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="(555) 123-4567"
              icon={<Phone className="w-5 h-5" />}
            />

            <Input
              label="Emergency Contact Name"
              type="text"
              required
              value={formData.emergencyContact}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContact: e.target.value })
              }
              placeholder="John Doe"
              icon={<User className="w-5 h-5" />}
            />

            <Input
              label="Emergency Contact Phone"
              type="tel"
              required
              value={formData.emergencyPhone}
              onChange={(e) =>
                setFormData({ ...formData, emergencyPhone: e.target.value })
              }
              placeholder="(555) 987-6543"
              icon={<Phone className="w-5 h-5" />}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={<Save className="w-5 h-5" />}
            className="w-full"
          >
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
