"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

// TODO: Update email format Supabase sends to make it more personalised.

function VerifyEmailContent() {
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL query parameter
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendVerification = async () => {
    if (!email) return;

    setIsResending(true);
    setResendSuccess(false);
    setError(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        throw error;
      }

      setResendSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>

        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded">
          <p className="mb-2">We&apos;ve sent a verification email to:</p>
          <p className="font-bold">{email || "your email address"}</p>
        </div>

        <div className="mb-6">
          <p className="mb-2">
            Please check your inbox and click the verification link to complete
            your registration.
          </p>
          <p className="text-sm text-gray-600">
            If you don&apos;t see the email, check your spam folder.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Verification email resent successfully!
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isResending ? "Resending..." : "Resend Verification Email"}
          </button>

          <Link href="/login">
            <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
