"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Phone, MapPin, Save, Briefcase } from "lucide-react";

export default function CaregiverOnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    bio: "",
    experience: "",
    hourlyRate: "",
    specialties: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/caregiver/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/caregiver/dashboard");
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
            Complete Your Caregiver Profile
          </h1>
          <p className="text-gray-600">
            Share your experience and availability
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Information
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                required
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="Tell us about your experience and what makes you a great caregiver..."
              />
            </div>

            <Input
              label="Years of Experience"
              type="number"
              required
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              placeholder="5"
            />

            <Input
              label="Hourly Rate ($)"
              type="number"
              required
              value={formData.hourlyRate}
              onChange={(e) =>
                setFormData({ ...formData, hourlyRate: e.target.value })
              }
              placeholder="25"
            />

            <Input
              label="Specialties (comma separated)"
              type="text"
              value={formData.specialties}
              onChange={(e) =>
                setFormData({ ...formData, specialties: e.target.value })
              }
              placeholder="Elderly care, Dementia care, Physical therapy"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
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
              Contact
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
