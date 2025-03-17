"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";

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
    <div className="container max-w-5xl mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a verification email to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert
            variant="centered"
            className="bg-primary/10 border-primary/20 text-foreground"
          >
            <p className="mb-1 text-sm">
              We&apos;ve sent a verification email to:
            </p>
            <p className="font-medium">{email || "your email address"}</p>
          </Alert>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Please check your inbox and click the verification link to
              complete your registration.
            </p>
            <p className="text-xs">
              If you don&apos;t see the email, check your spam folder.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="animate-in fade-in-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert className="bg-success/10 border-success/20 text-success">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Verification email resent successfully!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={handleResendVerification}
            disabled={isResending}
            className="w-full"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </Button>

          <Link href="/login" passHref legacyBehavior>
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="container flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
