"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthLayout from "@/components/auth/AuthLayout";
import { Mail, User, UserPlus, Heart, Stethoscope } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"FAMILY" | "CAREGIVER">("FAMILY");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          type: userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(data.message);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join Carebow to get started">
      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-success-soft border border-success/20 rounded-lg">
          <p className="text-sm text-success">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-error-soft border border-error/20 rounded-lg">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* User Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setUserType("FAMILY")}
              className={`p-4 rounded-xl border-2 transition-all ${
                userType === "FAMILY"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="text-center">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  userType === "FAMILY" ? "bg-primary-100" : "bg-gray-100"
                }`}>
                  <Heart className={`w-5 h-5 ${userType === "FAMILY" ? "text-primary-600" : "text-gray-500"}`} />
                </div>
                <p className={`font-medium ${userType === "FAMILY" ? "text-primary-700" : "text-gray-700"}`}>
                  Family/Patient
                </p>
                <p className="text-xs text-gray-500 mt-1">Seeking care</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setUserType("CAREGIVER")}
              className={`p-4 rounded-xl border-2 transition-all ${
                userType === "CAREGIVER"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="text-center">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  userType === "CAREGIVER" ? "bg-primary-100" : "bg-gray-100"
                }`}>
                  <Stethoscope className={`w-5 h-5 ${userType === "CAREGIVER" ? "text-primary-600" : "text-gray-500"}`} />
                </div>
                <p className={`font-medium ${userType === "CAREGIVER" ? "text-primary-700" : "text-gray-700"}`}>
                  Caregiver
                </p>
                <p className="text-xs text-gray-500 mt-1">Providing care</p>
              </div>
            </button>
          </div>
        </div>

        <Input
          label="Full Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<User className="w-5 h-5" />}
          placeholder="John Doe"
        />

        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          helperText="At least 8 characters"
        />

        <Input
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={<UserPlus className="w-5 h-5" />}
          fullWidth
        >
          Create Account
        </Button>
      </form>

      {/* Sign In Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary-700 hover:text-primary-800">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
