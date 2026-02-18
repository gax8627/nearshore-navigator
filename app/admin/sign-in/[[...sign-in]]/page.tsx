"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function AdminSignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Clerk is configured — the middleware will redirect unauthenticated
    // users to Clerk's hosted sign-in page automatically.
    // This page just redirects to /admin which triggers that flow.
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Redirecting to sign in...</p>
      </div>
    </div>
  );
}
