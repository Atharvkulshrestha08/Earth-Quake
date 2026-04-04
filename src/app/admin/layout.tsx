"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Users,
  Shield,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Alerts", href: "/admin/alerts", icon: Bell },
  { name: "Residents", href: "/admin/residents", icon: Users },
  { name: "Shelters", href: "/admin/shelters", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-alert-high rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-lg text-white">
                  Earth-Quake <span className="text-neutral-500 font-normal">Admin</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1 ml-8">
                {adminNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary-400 bg-primary-500/10"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/">
                  <span className="mr-2">Exit Admin</span>
                  <LogOut className="w-4 h-4" />
                </Link>
              </Button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md text-neutral-300 hover:text-white"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-neutral-800">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium",
                      isActive
                        ? "text-primary-400 bg-primary-500/10"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-neutral-800 mt-4">
                <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                  <Link href="/">
                    <LogOut className="w-4 h-4 mr-2" />
                    Exit Admin
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
