"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { Lock } from "lucide-react";

function LoadingState() {
  return (
    <AuthLayout
      title="Loading..."
      subtitle="Please wait"
    >
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center animate-pulse">
          <Lock className="w-8 h-8 text-primary-600" />
        </div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
