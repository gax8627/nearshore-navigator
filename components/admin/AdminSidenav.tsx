"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings, Shield, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Ensure this exists or use clsx/tailwind-merge directly

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "CRM & Leads", href: "/admin/crm", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidenav() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl flex flex-col z-50">
      {/* Liquid Logo Area */}
      <div className="p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <Link href="/admin" className="relative z-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Iron Fortress</h1>
            <p className="text-xs text-emerald-400 font-medium tracking-wider uppercase">Agency OS</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href));
          
          return (
            <Link key={item.href} href={item.href} className="block relative group">
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <div className={cn(
                "relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group-hover:bg-white/5",
                isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300")} />
                <span className="font-medium tracking-wide">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-emerald-500/50" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Admin User Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold ring-2 ring-black">
                DG
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Denisse Gastelum</p>
                <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
