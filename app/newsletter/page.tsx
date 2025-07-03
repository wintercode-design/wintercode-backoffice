"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Users,
  Calendar,
  Download,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/custom/use-toast";
import { Subscriber } from "@/types/types";

function Newsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedSubscribers = localStorage.getItem("newsletter_subscribers");
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    } else {
      // Sample data
      const sampleSubscribers: Subscriber[] = [
        {
          id: 1,
          email: "john.doe@example.com",
          name: "John Doe",
          subscribedAt: "2025-01-15T10:30:00Z",
          status: "active",
          source: "website",
        },
        {
          id: 2,
          email: "sarah.johnson@company.com",
          name: "Sarah Johnson",
          subscribedAt: "2025-01-14T14:20:00Z",
          status: "active",
          source: "blog",
        },
        {
          id: 3,
          email: "mike.chen@email.com",
          name: "Mike Chen",
          subscribedAt: "2025-01-13T09:15:00Z",
          status: "active",
          source: "social",
        },
        {
          id: 4,
          email: "lisa.wang@tech.com",
          name: "Lisa Wang",
          subscribedAt: "2025-01-12T16:45:00Z",
          status: "unsubscribed",
          source: "website",
        },
      ];
      setSubscribers(sampleSubscribers);
      localStorage.setItem(
        "newsletter_subscribers",
        JSON.stringify(sampleSubscribers)
      );
    }
  }, []);

  const saveSubscribers = (updatedSubscribers: Subscriber[]) => {
    setSubscribers(updatedSubscribers);
    localStorage.setItem(
      "newsletter_subscribers",
      JSON.stringify(updatedSubscribers)
    );
  };

  const handleDelete = (id: number) => {
    const updatedSubscribers = subscribers.filter(
      (subscriber) => subscriber.id !== id
    );
    saveSubscribers(updatedSubscribers);
    toast({ title: "Subscriber removed successfully!" });
  };

  const handleExport = () => {
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleAddSubscriber = () => {
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSubscribers = subscribers.filter(
    (s) => s.status === "active"
  ).length;
  const unsubscribedCount = subscribers.filter(
    (s) => s.status === "unsubscribed"
  ).length;
  const thisMonthSubscribers = subscribers.filter((s) => {
    const subDate = new Date(s.subscribedAt);
    const now = new Date();
    return (
      subDate.getMonth() === now.getMonth() &&
      subDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const getSourceColor = (source: string) => {
    switch (source) {
      case "website":
        return "bg-blue-500";
      case "blog":
        return "bg-purple-500";
      case "social":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Newsletter Subscribers
            </h1>
            <p className="text-gray-400">Manage your email subscribers</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExport}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={handleAddSubscriber}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Subscriber
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Subscribers</p>
                  <p className="text-2xl font-bold text-white">
                    {subscribers.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">
                    {activeSubscribers}
                  </p>
                </div>
                <Mail className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-white">
                    {thisMonthSubscribers}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Unsubscribed</p>
                  <p className="text-2xl font-bold text-white">
                    {unsubscribedCount}
                  </p>
                </div>
                <Users className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-white/10 border-white/20 text-white"
          />
        </div>
      </motion.div>

      {/* Subscribers List */}
      <div className="space-y-4">
        {filteredSubscribers.map((subscriber, index) => (
          <motion.div
            key={subscriber.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">
                        {subscriber.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${getSourceColor(
                          subscriber.source
                        )}`}
                      >
                        {subscriber.source}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${
                          subscriber.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {subscriber.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Subscribed {formatDate(subscriber.subscribedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(subscriber.id)}
                      className="text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSubscribers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            {searchTerm
              ? "No subscribers found matching your search."
              : "No newsletter subscribers yet."}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Newsletter;
