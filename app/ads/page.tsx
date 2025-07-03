"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import AdCard from "./AdCard";
import AdDialog from "./AdDialog";
import AdStats from "./AdStats";
import { AdsT } from "@/types/types";

function Ads() {
  const [ads, setAds] = useState<AdsT[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdsT | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedAds = localStorage.getItem("custom_ads");
    if (savedAds) {
      setAds(JSON.parse(savedAds));
    } else {
      const sampleAds: AdsT[] = [
        {
          id: 1,
          title: "Special Web Development Offer",
          description:
            "Get 25% off on all web development projects this month!",
          imageUrl:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
          linkUrl: "/offers",
          position: "header",
          type: "banner",
          status: "active",
          startDate: "2025-01-01",
          endDate: "2025-02-28",
          priority: 1,
          createdAt: "2025-01-15",
          clicks: 127,
          impressions: 1543,
        },
        {
          id: 2,
          title: "Free Consultation Available",
          description:
            "Book a free 30-minute consultation to discuss your project needs.",
          imageUrl:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
          linkUrl: "/contact",
          position: "sidebar",
          type: "card",
          status: "active",
          startDate: "2025-01-10",
          endDate: "2025-03-31",
          priority: 2,
          createdAt: "2025-01-10",
          clicks: 89,
          impressions: 892,
        },
        {
          id: 3,
          title: "Portfolio Showcase",
          description: "Check out our latest projects and case studies.",
          imageUrl:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
          linkUrl: "/projects",
          position: "footer",
          type: "banner",
          status: "paused",
          startDate: "2025-01-05",
          endDate: "2025-02-15",
          priority: 3,
          createdAt: "2025-01-05",
          clicks: 45,
          impressions: 567,
        },
      ];
      setAds(sampleAds);
      localStorage.setItem("custom_ads", JSON.stringify(sampleAds));
    }
  }, []);

  const saveAds = (updatedAds: AdsT[]) => {
    setAds(updatedAds);
    localStorage.setItem("custom_ads", JSON.stringify(updatedAds));
  };

  const handleSubmit = (formData: Omit<AdsT, "id">) => {
    if (editingAd) {
      const updatedAds = ads.map((ad) =>
        ad.id === editingAd.id ? { ...editingAd, ...formData } : ad
      );
      saveAds(updatedAds);
      toast({ title: "Ad updated successfully!" });
    } else {
      const newAd = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
        clicks: 0,
        impressions: 0,
      };
      saveAds([...ads, newAd]);
      toast({ title: "Ad created successfully!" });
    }
    setEditingAd(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (ad: AdsT) => {
    setEditingAd(ad);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedAds = ads.filter((ad) => ad.id !== id);
    saveAds(updatedAds);
    toast({ title: "Ad deleted successfully!" });
  };

  const handleToggleStatus = (id: number) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id
        ? { ...ad, status: ad.status === "active" ? "paused" : "active" }
        : ad
    );
    saveAds(updatedAds);
    toast({ title: "Ad status updated!" });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Custom Ads</h1>
          <p className="text-gray-400">
            Manage promotional banners and advertisements
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
          onClick={() => {
            setEditingAd(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Ad
        </Button>
      </motion.div>

      <AdStats ads={ads} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ads.map((ad, index) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AdCard
              ad={ad}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </motion.div>
        ))}
      </div>

      {ads.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No advertisements yet. Create your first ad campaign!
          </p>
        </motion.div>
      )}

      <AdDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingAd={editingAd}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Ads;
