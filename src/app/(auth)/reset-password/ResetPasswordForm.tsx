"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Lock, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      return;
    }

    // Verify token validity
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/verify-reset-token?token=${token}`);
        const data = await response.json();
        setTokenValid(data.valid);
      } catch {
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Invalid/expired token state
  if (tokenValid === false) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="This password reset link is invalid or has expired"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-error-soft rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-error" />
          </div>

          <p className="text-gray-600 mb-6">
            The password reset link you used is either invalid or has expired.
            Please request a new one.
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/forgot-password")}
              fullWidth
            >
              Request New Link
            </Button>
            <Link
              href="/login"
              className="block text-sm text-primary-700 hover:text-primary-800 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Loading token validation
  if (tokenValid === null) {
    return (
      <AuthLayout
        title="Validating..."
        subtitle="Please wait while we verify your reset link"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center animate-pulse">
            <Lock className="w-8 h-8 text-primary-600" />
          </div>
          <p className="mt-4 text-gray-600">Validating your reset link...</p>
        </div>
      </AuthLayout>
    );
  }

  // Success state
  if (success) {
    return (
      <AuthLayout
        title="Password Reset!"
        subtitle="Your password has been successfully updated"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-success-soft rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>

          <p className="text-gray-600 mb-6">
            Your password has been reset successfully. You can now log in with
            your new password.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/login")}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            fullWidth
          >
            Continue to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  // Reset password form
  return (
    <AuthLayout
      title="Set new password"
      subtitle="Your new password must be different from your previous one"
    >
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-error-soft border border-error/20 rounded-lg">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="New Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          helperText="Must be at least 8 characters"
        />

        <Input
          label="Confirm New Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={<Lock className="w-5 h-5" />}
          fullWidth
        >
          Reset Password
        </Button>
      </form>

      {/* Back to Login */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-primary-700 hover:text-primary-800">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
