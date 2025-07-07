"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  FileText,
  MessageSquare,
  Mail,
  Tag,
  Star,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Megaphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statsCards = [
  {
    title: "Total Projects",
    value: "24",
    icon: FolderOpen,
    change: "+12%",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Blog Posts",
    value: "156",
    icon: FileText,
    change: "+8%",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Contact Messages",
    value: "89",
    icon: MessageSquare,
    change: "+23%",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Newsletter Subscribers",
    value: "1,247",
    icon: Mail,
    change: "+15%",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Active Offers",
    value: "7",
    icon: Tag,
    change: "+2%",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Client Reviews",
    value: "43",
    icon: Star,
    change: "+5%",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Team Members",
    value: "5",
    icon: Users,
    change: "+1",
    color: "from-teal-500 to-lime-500",
  },
  {
    title: "Active Ads",
    value: "3",
    icon: Megaphone,
    change: "+1",
    color: "from-pink-500 to-rose-500",
  },
];

const recentActivity = [
  {
    action: 'New team member "Jane Doe" added',
    time: "15 minutes ago",
    icon: Users,
  },
  {
    action: "New contact message from John Doe",
    time: "22 minutes ago",
    icon: MessageSquare,
  },
  {
    action: 'Blog post "React Best Practices" published',
    time: "1 hour ago",
    icon: FileText,
  },
  {
    action: 'Project "E-commerce Platform" updated',
    time: "3 hours ago",
    icon: FolderOpen,
  },
  { action: "New newsletter subscriber", time: "5 hours ago", icon: Mail },
  {
    action: 'Client review added for "Portfolio Website"',
    time: "1 day ago",
    icon: Star,
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-gray-400">
          {"Welcome back! Here's what's happening with your portfolio."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="glass-effect border-white/20 card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Quick Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Portfolio Views</span>
                  <span className="text-2xl font-bold text-white">12,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Blog Readers</span>
                  <span className="text-2xl font-bold text-white">8,923</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Response Rate</span>
                  <span className="text-2xl font-bold text-green-400">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Client Satisfaction</span>
                  <span className="text-2xl font-bold text-yellow-400">
                    4.9/5
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
