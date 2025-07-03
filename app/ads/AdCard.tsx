import React from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdsT } from "@/types/types";

const AdCard = ({
  ad,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  ad: AdsT;
  onEdit: (id: AdsT) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "header":
        return "bg-blue-500";
      case "sidebar":
        return "bg-purple-500";
      case "footer":
        return "bg-green-500";
      case "popup":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "banner":
        return "bg-indigo-500";
      case "card":
        return "bg-pink-500";
      case "popup":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (endDate: string) => {
    return endDate && new Date(endDate) < new Date();
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0.00";
  };

  return (
    <Card className="glass-effect border-white/20 card-hover overflow-hidden">
      {ad.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span
                className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                  isExpired(ad.endDate) ? "expired" : ad.status
                )}`}
              >
                {isExpired(ad.endDate) ? "expired" : ad.status}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs text-white ${getPositionColor(
                  ad.position
                )}`}
              >
                {ad.position}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(
                  ad.type
                )}`}
              >
                {ad.type}
              </span>
              <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded-full">
                Priority {ad.priority}
              </span>
            </div>
            <CardTitle className="text-white text-lg">{ad.title}</CardTitle>
            <p className="text-gray-300 text-sm mt-1">{ad.description}</p>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleStatus(ad.id)}
              className={
                ad.status === "active" ? "text-green-400" : "text-gray-400"
              }
            >
              {ad.status === "active" ? (
                <Eye className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(ad)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(ad.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ad.linkUrl && (
            <div className="flex items-center gap-2 text-sm text-blue-400">
              <ExternalLink className="h-3 w-3" />
              <span>{ad.linkUrl}</span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-xs">Impressions</p>
              <p className="text-white font-bold">{ad.impressions}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Clicks</p>
              <p className="text-white font-bold">{ad.clicks}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">CTR</p>
              <p className="text-white font-bold">
                {calculateCTR(ad.clicks, ad.impressions)}%
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(ad.startDate)} - {formatDate(ad.endDate)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCard;
