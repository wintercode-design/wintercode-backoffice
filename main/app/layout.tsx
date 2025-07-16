export const dynamic = "force-dynamic";

import LayoutComp from "@/components/custom/Layout";
import { AuthProvider } from "@/providers/authProvider";
import NotificationProvider from "@/providers/notifications";
import QueryProvider from "@/providers/queryProvider";
import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/providers/appContext";

export const metadata: Metadata = {
  title: "Back Office - Portfolio Management System",
  description:
    "Comprehensive back office system for managing portfolio projects, blogs, contacts, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseURL = process.env.API_BASE_URL;
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <NotificationProvider>
              <AppProvider baseURL={baseURL ?? ""}>
                <LayoutComp>{children}</LayoutComp>
              </AppProvider>
            </NotificationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
