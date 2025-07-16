"use client";
import React, { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/custom/use-toast";
import { Subscriber } from "@/types/types";
import { NewsletterQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";

function Newsletter() {
  const { baseURL } = useAppContext();
  const newsletterQuery = new NewsletterQuery(baseURL);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscriberData = useQuery({
    queryKey: ["newsletterFetchAll"],
    queryFn: () => newsletterQuery.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => newsletterQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["newsletterFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to remove subscriber", variant: "destructive" }),
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
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

  if (subscriberData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (subscriberData.isError) {
    return <Loading status={"failed"} />;
  }

  if (subscriberData.isSuccess) {
    const subscribers = subscriberData.data;
    const filteredSubscribers = subscribers.filter(
      (subscriber: Subscriber) =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const activeSubscribers = subscribers.filter(
      (s: Subscriber) => s.status === "ACTIVE"
    ).length;
    const unsubscribedCount = subscribers.filter(
      (s: Subscriber) => s.status === "INACTIVE"
    ).length;
    const thisMonthSubscribers = subscribers.filter((s: Subscriber) => {
      const subDate = new Date(s.subscribedAt);
      const now = new Date();
      return (
        subDate.getMonth() === now.getMonth() &&
        subDate.getFullYear() === now.getFullYear()
      );
    }).length;
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
          {filteredSubscribers.map((subscriber: Subscriber, index: number) => (
            <motion.div
              key={subscriber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20">
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`w-2 h-2 rounded-full ${getSourceColor(
                          subscriber.source
                        )}`}
                      ></span>
                      <span className="text-xs text-gray-400">
                        {subscriber.source}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {formatDate(subscriber.subscribedAt)}
                      </span>
                    </div>
                    <div className="font-bold text-white text-lg mb-1">
                      {subscriber.name}
                    </div>
                    <div className="text-gray-400 text-sm mb-1">
                      {subscriber.email}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(subscriber.id)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return <Loading />;
}

export default Newsletter;
