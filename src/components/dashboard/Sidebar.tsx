"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  navItems: NavItem[];
  title?: string;
  userType?: "family" | "caregiver" | "admin";
}

export default function Sidebar({ navItems, title = "Carebow", userType = "family" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  const NavLink = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link href={item.href}>
        <motion.div
          onClick={onClick}
          whileHover={{ x: 4 }}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative group",
            isActive
              ? "bg-primary-50 text-primary-700 font-medium"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="flex-1">{item.label}</span>
          {item.badge && item.badge > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-secondary-500 text-white rounded-full">
              {item.badge}
            </span>
          )}
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary-50 rounded-xl -z-10"
            />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[9999]">
        <div className="relative bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Carebow"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900 font-brand">{title}</span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-[9999]"
              >
                <nav className="p-4">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <NavLink key={index} item={item} onClick={() => setIsOpen(false)} />
                    ))}
                  </div>
                </nav>
                <div className="p-4 border-t border-gray-100">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600
                             hover:text-error transition-colors rounded-xl hover:bg-error-soft group"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 z-[9998]"
                style={{ top: "57px" }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed h-screen w-64 bg-white border-r border-gray-100 shadow-lg flex flex-col z-[9999]"
        >
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Carebow"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <span className="font-bold text-gray-900 block font-brand">{title}</span>
                <span className="text-xs text-gray-500 capitalize">{userType} Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <NavLink key={index} item={item} />
              ))}
            </div>
          </nav>

          {/* User Section & Logout */}
          <div className="p-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600
                       hover:text-error transition-colors rounded-xl hover:bg-error-soft group"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
