"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Menu,
  X,
  Bell,
  Shield,
  BookOpen,
  Home,
  Users,
  Settings,
  LogOut,
  LogIn,
  BellRing,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Live Alerts", href: "/alerts", icon: Bell },
  { name: "Survival Guides", href: "/guides", icon: BookOpen },
  { name: "For Government", href: "/government", icon: Shield },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || isOpen
          ? "bg-neutral-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 shadow-lg shadow-primary-500/20">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-2xl text-white tracking-tight">
              Earth<span className="text-primary-400 group-hover:text-primary-300 transition-colors">-</span>Quake
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-white bg-primary-500 shadow-md shadow-primary-500/20"
                      : "text-neutral-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild className="text-neutral-400 hover:text-white hover:bg-white/5 gap-2 px-6 rounded-full">
              <Link href="/login">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/20 px-6 py-2.5 rounded-full gap-2 transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[0px]">
              <Link href="/register">
                <BellRing className="w-4 h-4" />
                <span>Get Alerts</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-semibold transition-all",
                      isActive
                        ? "text-white bg-primary-500/20 border border-primary-500/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-5 h-5 text-primary-400" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/5">
                <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-white/10 text-white bg-white/5 hover:bg-white/10 text-lg">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <LogIn className="w-5 h-5 mr-3" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-lg font-bold shadow-xl shadow-primary-500/20 border-none">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <BellRing className="w-5 h-5 mr-3" />
                    Get Alerts
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


export function AdminNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const adminNav = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Alerts", href: "/admin/alerts", icon: Bell },
    { name: "Residents", href: "/admin/residents", icon: Users },
    { name: "Shelters", href: "/admin/shelters", icon: Shield },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-alert-high rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-white">
              Earth-Quake <span className="text-neutral-500 font-normal">Admin</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
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
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <span className="hidden sm:inline mr-2">Exit Admin</span>
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

        {isOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800 bg-neutral-900">
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
          </div>
        )}
      </nav>
    </header>
  );
}
