"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  GraduationCap,
  Briefcase,
  Code2,
  ClipboardList,
  Building2,
  BookOpen,
  FileText,
  LayoutDashboard,
  Info,
  Mail,
  LogIn,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/utils/cn";

const mainNav = [
  {
    label: "GATE",
    icon: GraduationCap,
    path: "/gate",
  },
  {
    label: "DSA Sheet",
    icon: Code2,
    path: "/dsa",
  },
  {
    label: "Jobs",
    icon: Building2,
    path: "/jobs",
  },
  {
    label: "Resources",
    icon: BookOpen,
    path: "/resources",
  },
  {
    label: "Blog",
    icon: FileText,
    path: "/blogs",
  },
];

const moreNav = [
  {
    label: "About Us",
    icon: Info,
    path: "/about",
  },
  {
    label: "Contact Us",
    icon: Mail,
    path: "/contact",
  },
];

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  path: string;
  onClick?: () => void;
  mobile?: boolean;
}

function PublicNavItem({
  label,
  icon: Icon,
  path,
  onClick,
  mobile = false,
}: NavItemProps) {
  const pathname = usePathname();

  const isActive =
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      href={path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-200",

        mobile
          ? "w-full px-3 py-2.5"
          : "px-2.5 py-2",

        isActive
          ? "bg-primary-50 text-primary-700 dark:bg-primary-600/10 dark:text-primary-300"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      )}
    >
      <Icon className="h-[17px] w-[17px] shrink-0" />

      <span>{label}</span>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const handleDashboardClick = () => {
    setMobileOpen(false);
    setMoreOpen(false);
  };



  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
              CC
            </div>

            <span className="hidden text-sm font-bold text-slate-900 sm:block dark:text-slate-100">
              The <span className="text-primary-600">Code</span> Concept
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <PublicNavItem
                key={item.path}
                {...item}
              />
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                  moreOpen &&
                    "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                )}
              >
                More
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    moreOpen && "rotate-180"
                  )}
                />
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  {moreNav.map((item) => (
                    <PublicNavItem
                      key={item.path}
                      {...item}
                      onClick={() => setMoreOpen(false)}
                    />
                  ))}

                  <div className="my-1.5 border-t border-slate-200 dark:border-slate-800" />

                  <button
                    type="button"
                    onClick={handleDashboardClick}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  >
                    <LayoutDashboard className="h-[17px] w-[17px]" />
                    Dashboard
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Auth */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              
              {/* Main */}
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Main
              </p>

              <nav className="space-y-0.5">
                {mainNav.map((item) => (
                  <PublicNavItem
                    key={item.path}
                    {...item}
                    mobile
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </nav>

              {/* My Space */}
              <div className="my-3 border-t border-slate-200 dark:border-slate-800" />

              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                My Space
              </p>

              <button
                type="button"
                onClick={handleDashboardClick}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <LayoutDashboard className="h-[17px] w-[17px]" />
                Dashboard
              </button>

              {/* More */}
              <div className="my-3 border-t border-slate-200 dark:border-slate-800" />

              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                More
              </p>

              <nav className="space-y-0.5">
                {moreNav.map((item) => (
                  <PublicNavItem
                    key={item.path}
                    {...item}
                    mobile
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}