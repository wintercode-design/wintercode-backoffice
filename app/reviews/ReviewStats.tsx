import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Eye } from "lucide-react";
import { Review } from "@/types/types";

const ReviewStats = ({ reviews }: { reviews: Review[] }) => {
  const publishedReviews = reviews.filter(
    (r) => r.status === "published"
  ).length;
  const featuredReviews = reviews.filter((r) => r.featured).length;
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const stats = [
    {
      label: "Total Reviews",
      value: reviews.length,
      icon: Star,
      color: "text-yellow-400",
    },
    {
      label: "Published",
      value: publishedReviews,
      icon: Eye,
      color: "text-green-400",
    },
    {
      label: "Featured",
      value: featuredReviews,
      icon: Star,
      color: "text-purple-400",
    },
    {
      label: "Average Rating",
      value: averageRating,
      icon: Star,
      color: "text-yellow-400",
      fill: true,
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
                <Icon
                  className={`h-8 w-8 ${stat.color} ${
                    stat.fill ? "fill-current" : ""
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReviewStats;
