"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";

type VerificationStatus = "loading" | "success" | "error" | "expired" | "no-token";

export default function VerifyEmailForm() {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      setMessage("No verification token provided.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Your email has been verified successfully!");
        } else if (response.status === 410) {
          setStatus("expired");
          setMessage(data.error || "This verification link has expired.");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed. Please try again.");
        }
      } catch {
        setStatus("error");
        setMessage("An error occurred. Please try again later.");
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    // This would typically require the user's email
    // For now, redirect to login
    router.push("/login");
  };

  return (
    <AuthLayout
      title={
        status === "loading" ? "Verifying..." :
        status === "success" ? "Email Verified!" :
        "Verification Issue"
      }
      subtitle={
        status === "loading" ? "Please wait while we verify your email" :
        status === "success" ? "Your account is now active" :
        undefined
      }
    >
      <div className="text-center py-8">
        {/* Loading State */}
        {status === "loading" && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <p className="text-gray-600">Verifying your email address...</p>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-success-soft rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-gray-600 mb-6">{message}</p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/login")}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Continue to Login
              </Button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-error-soft rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-error" />
            </div>
            <div>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleResendVerification}
                  icon={<Mail className="w-5 h-5" />}
                  fullWidth
                >
                  Resend Verification Email
                </Button>
                <Link
                  href="/login"
                  className="block text-sm text-primary-700 hover:text-primary-800 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Expired State */}
        {status === "expired" && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-warning-soft rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-warning" />
            </div>
            <div>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleResendVerification}
                  icon={<Mail className="w-5 h-5" />}
                  fullWidth
                >
                  Request New Verification Link
                </Button>
                <Link
                  href="/login"
                  className="block text-sm text-primary-700 hover:text-primary-800 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* No Token State */}
        {status === "no-token" && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 mb-6">
                No verification token was provided. Please check your email for the verification link.
              </p>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push("/login")}
                  fullWidth
                >
                  Go to Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
