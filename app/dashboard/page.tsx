"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, Mountain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/components/ui/link";
import { useAuth } from "../context/AuthContext";
import ListItems from "../components/ListItems";

export default function Dashboard() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.email && !user.email_confirmed_at) {
        router.push(`/verify-email?email=${encodeURIComponent(user.email)}`);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || (user.email && !user.email_confirmed_at)) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 flex h-16 items-center justify-between">
          <Link
            href="/"
            variant="nav"
            className="flex items-center gap-2 font-bold text-xl hover:text-foreground"
          >
            <Mountain className="h-6 w-6 text-primary" />
            <span>The Fucket List</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8">
        <Card className="mb-8 border-0 shadow-md bg-gradient-to-br from-primary/10 to-background">
          <CardHeader>
            <CardTitle className="text-2xl">Your Fucket List</CardTitle>
            <CardDescription>
              Track your most ambitious goals - the ones that scare you but
              would transform your life if accomplished.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add items that push you outside your comfort zone, things you
              think you may not be able to accomplish, and check them off as you
              conquer them!
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your List</CardTitle>
          </CardHeader>
          <CardContent>
            <ListItems />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
