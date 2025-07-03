import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Eye, ExternalLink } from "lucide-react";
import { AdsT } from "@/types/types";

const AdStats = ({ ads }: { ads: AdsT[] }) => {
  const isExpired = (endDate: string) =>
    endDate && new Date(endDate) < new Date();
  const activeAds = ads.filter(
    (a) => a.status === "active" && !isExpired(a.endDate)
  ).length;
  const totalClicks = ads.reduce((sum, a) => sum + a.clicks, 0);
  const totalImpressions = ads.reduce((sum, a) => sum + a.impressions, 0);
  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0.00";
  };

  const stats = [
    {
      label: "Total Ads",
      value: ads.length,
      icon: Megaphone,
      color: "text-pink-400",
    },
    {
      label: "Active Ads",
      value: activeAds,
      icon: Eye,
      color: "text-green-400",
    },
    {
      label: "Total Clicks",
      value: totalClicks,
      icon: ExternalLink,
      color: "text-blue-400",
    },
    {
      label: "Overall CTR",
      value: `${calculateCTR(totalClicks, totalImpressions)}%`,
      icon: Megaphone,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdStats;
