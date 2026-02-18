"use client";

import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings, Shield, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "CRM & Leads", href: "/admin/crm", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

// Check if Clerk is configured
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
import { AdminSidenav } from "@/components/admin/AdminSidenav";

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full">
        {/* Fixed Sidenav */}
        <AdminSidenav />

        {/* Scrollable Content Area */}
        <main className="flex-1 ml-72 min-h-screen relative">
            {/* Top Glass Header */}
            <header className="sticky top-0 z-40 px-8 py-4 backdrop-blur-md bg-slate-950/50 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-medium text-slate-400">Back Office Control Center</h2>
                <div className="flex items-center gap-4">
                    <button className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                        System Online
                    </button>
                </div>
            </header>

            <div className="p-8 pb-32 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // If Clerk is configured, wrap with ClerkProvider
  if (clerkKey) {
    return (
      <ClerkProvider publishableKey={clerkKey}>
        <AdminShell>{children}</AdminShell>
      </ClerkProvider>
    );
  }

  // No Clerk keys — show admin without auth (setup mode)
  return <AdminShell>{children}</AdminShell>;
}
