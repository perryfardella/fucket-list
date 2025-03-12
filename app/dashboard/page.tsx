"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!user || (user.email && !user.email_confirmed_at)) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Fucket List</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="mb-4">Welcome, {user.email}!</p>
        <p>
          This is your Fucket List - a place to track all your stretch goals in
          life. Add items that scare you, things you think you may not be able
          to accomplish, and check them off as you conquer them!
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Your List</h2>
        <ListItems />
      </div>
    </div>
  );
}
