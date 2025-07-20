"use client";
import { useAuth } from "@/providers/authProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // List of allowed auth routes
  const allowedAuthRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  useEffect(() => {
    if (!token && !allowedAuthRoutes.includes(pathname)) {
      router.replace("/auth/login");
    }
    // If authenticated and on an auth page, redirect to dashboard
    if (token && allowedAuthRoutes.includes(pathname)) {
      router.replace("/");
    }
  }, [token, pathname, router]);

  // Only render children if:
  // - Authenticated
  // - Or on an allowed auth route
  if (!token && !allowedAuthRoutes.includes(pathname)) {
    return null;
  }
  if (token && allowedAuthRoutes.includes(pathname)) {
    return null;
  }
  return <>{children}</>;
}
