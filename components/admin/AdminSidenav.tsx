"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings, Shield, ChevronRight, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Ensure this exists or use clsx/tailwind-merge directly

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Campaigns", href: "/admin/crm", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidenav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex flex-col z-50">
      {/* Liquid Logo Area */}
      <div className="p-8 relative overflow-hidden group">
        <Link href="/admin" className="relative z-10 block">
           <div className="relative h-12 w-48 transition-all group-hover:scale-105 duration-300">
               {/* Use public brand logo */}
               <img src="/images/nearshore-logo-brand.png" alt="Nearshore Navigator" className="object-contain h-full w-full dark:brightness-[1.2] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
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
                  className="absolute inset-0 bg-primary-50 dark:bg-white/5 border border-primary-100 dark:border-white/10 rounded-xl shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <div className={cn(
                "relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group-hover:bg-primary-50 dark:group-hover:bg-white/5",
                isActive ? "text-primary-700 dark:text-white" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500 group-hover:text-primary-500 dark:group-hover:text-slate-300")} />
                <span className="font-medium tracking-wide">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary-400 dark:text-emerald-500/50" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Admin User Profile & Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-4">
        
        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Theme Preference</span>
            <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                title="Toggle Theme"
            >
                {/* Simple Sun/Moon icons */}
                <span className="dark:hidden flex items-center gap-2">
                    <Sun className="w-4 h-4 text-orange-500" />
                    <span className="text-xs">Light</span>
                </span>
                <span className="hidden dark:flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs">Dark</span>
                </span>
            </button>
        </div>

        <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-primary-500 flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-black">
                DG
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-emerald-300 transition-colors">Denisse Gastelum</p>
                <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
