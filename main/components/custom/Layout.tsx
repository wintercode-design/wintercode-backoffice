"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  FileText,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  Send,
  ShoppingBag,
  Star,
  Tag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: FileText, label: "Blogs", path: "/blogs" },
  { icon: ShoppingBag, label: "Products", path: "/products" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: MessageSquare, label: "Contacts", path: "/contacts" },
  { icon: FileText, label: "Quotes", path: "/quotes" },
  { icon: Mail, label: "Newsletter", path: "/newsletter" },
  { icon: Tag, label: "Offers", path: "/offers" },
  { icon: Send, label: "Send Email", path: "/email" },
  { icon: HelpCircle, label: "FAQ", path: "/faq" },
  { icon: Star, label: "Reviews", path: "/reviews" },
  { icon: Megaphone, label: "Ads", path: "/ads" },
  { icon: Users, label: "Team", path: "/team" },
];

function LayoutComp({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden glass-effect text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {(sidebarOpen ||
          (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed left-0 top-0 z-40 h-full w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 flex flex-col"
          >
            <div className="p-6">
              <h1 className="text-2xl font-bold gradient-text">Back Office</h1>
              <p className="text-sm text-gray-400 mt-1">Portfolio Management</p>
            </div>
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.startsWith(item.path) &&
                  (item.path !== "/" || location === "/");

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white neon-glow-sm"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-6 mt-auto border-t border-white/10 text-xs text-gray-400">
              <p>© {new Date().getFullYear()} Back Office</p>
              <p>All rights reserved.</p>
              <div className="mt-4">
                <LogoutButton />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function LogoutButton() {
  const { logout, token } = useAuth();
  if (!token) return null;
  return (
    <button
      onClick={logout}
      className="w-full mt-2 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
    >
      Logout
    </button>
  );
}

export default LayoutComp;
