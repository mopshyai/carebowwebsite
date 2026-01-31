"use client";

import { Suspense } from "react";
import VerifyEmailForm from "./VerifyEmailForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { Loader2 } from "lucide-react";

function LoadingState() {
  return (
    <AuthLayout
      title="Verifying..."
      subtitle="Please wait while we verify your email"
    >
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyEmailForm />
    </Suspense>
  );
}
