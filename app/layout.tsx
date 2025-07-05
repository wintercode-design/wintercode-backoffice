import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/custom/Layout";
import NotificationProvider from "@/providers/notifications";
import QueryProvider from "@/providers/queryProvider";
import { AuthProvider } from "@/providers/authProvider";

export const metadata: Metadata = {
  title: "Back Office - Portfolio Management System",
  description:
    "Comprehensive back office system for managing portfolio projects, blogs, contacts, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <NotificationProvider>
              <Layout>{children}</Layout>
            </NotificationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
