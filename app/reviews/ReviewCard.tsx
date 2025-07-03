import React from "react";
import { Edit, Trash2, Star, Eye, EyeOff, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/types/types";

const ReviewCard = ({
  review,
  onEdit,
  onDelete,
  onToggleVisibility,
  onToggleFeatured,
}: {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (id: number) => void;
  onToggleVisibility: (id: number) => void;
  onToggleFeatured: (id: number) => void;
}) => {
  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case "web-development":
        return "bg-blue-500";
      case "e-commerce":
        return "bg-green-500";
      case "mobile-app":
        return "bg-purple-500";
      case "startup-website":
        return "bg-orange-500";
      case "redesign":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      className={`glass-effect border-white/20 card-hover ${
        review.featured ? "ring-2 ring-yellow-500/50" : ""
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            {review.clientImage && (
              <img
                src={review.clientImage}
                alt={review.clientName}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <CardTitle className="text-white text-lg">
                {review.clientName}
              </CardTitle>
              <p className="text-gray-400 text-sm">
                {review.clientTitle}
                {review.clientCompany && ` at ${review.clientCompany}`}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-gray-400 text-sm">
                  ({review.rating}/5)
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleFeatured(review.id)}
              className={review.featured ? "text-yellow-400" : "text-gray-400"}
            >
              <Star
                className={`h-3 w-3 ${review.featured ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleVisibility(review.id)}
              className={
                review.status === "published"
                  ? "text-green-400"
                  : "text-gray-400"
              }
            >
              {review.status === "published" ? (
                <Eye className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(review)}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(review.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs text-white ${getProjectTypeColor(
                review.projectType
              )}`}
            >
              {review.projectType.replace("-", " ")}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs text-white ${
                review.status === "published" ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {review.status}
            </span>
            {review.featured && (
              <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
          <p className="text-gray-300 leading-relaxed">{review.review}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
