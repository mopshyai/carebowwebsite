"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send reset email");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-success-soft rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>

          <p className="text-gray-600 mb-2">
            We&apos;ve sent a password reset link to:
          </p>
          <p className="font-medium text-gray-900 mb-6">{email}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">
              <strong>Didn&apos;t receive the email?</strong>
            </p>
            <ul className="text-sm text-gray-500 mt-2 space-y-1">
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered the correct email</li>
              <li>Wait a few minutes and try again</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setSubmitted(false)}
              fullWidth
            >
              Try a different email
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

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions"
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
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          placeholder="Enter your email address"
          helperText="Enter the email associated with your account"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={<Send className="w-5 h-5" />}
          fullWidth
        >
          Send Reset Link
        </Button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
