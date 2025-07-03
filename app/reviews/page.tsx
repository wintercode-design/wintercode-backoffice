"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import ReviewCard from "./ReviewCard";
import ReviewDialog from "./ReviewDialog";
import ReviewStats from "./ReviewStats";
import { Review } from "@/types/types";

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      const sampleReviews: Review[] = [
        {
          id: 1,
          clientName: "Sarah Johnson",
          clientTitle: "Marketing Director",
          clientCompany: "TechCorp Inc.",
          rating: 5,
          review:
            "Absolutely fantastic work! The website exceeded our expectations and was delivered on time.",
          projectType: "web-development",
          status: "published",
          featured: true,
          clientImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
          createdAt: "2025-01-15",
        },
        {
          id: 2,
          clientName: "Michael Chen",
          clientTitle: "Startup Founder",
          clientCompany: "InnovateLab",
          rating: 5,
          review:
            "Working with this developer was a game-changer for our startup.",
          projectType: "startup-website",
          status: "published",
          featured: true,
          clientImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          createdAt: "2025-01-12",
        },
        {
          id: 3,
          clientName: "Emily Rodriguez",
          clientTitle: "E-commerce Manager",
          clientCompany: "Fashion Forward",
          rating: 4,
          review:
            "Great experience overall. The e-commerce platform works smoothly.",
          projectType: "e-commerce",
          status: "published",
          featured: false,
          clientImage:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
          createdAt: "2025-01-08",
        },
      ];
      setReviews(sampleReviews);
      localStorage.setItem("reviews", JSON.stringify(sampleReviews));
    }
  }, []);

  const saveReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleSubmit = (formData: Omit<Review, "id">) => {
    if (editingReview) {
      const updatedReviews = reviews.map((review) =>
        review.id === editingReview.id
          ? { ...editingReview, ...formData }
          : review
      );
      saveReviews(updatedReviews);
      toast({ title: "Review updated successfully!" });
    } else {
      const newReview = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveReviews([...reviews, newReview]);
      toast({ title: "Review added successfully!" });
    }
    setEditingReview(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    saveReviews(updatedReviews);
    toast({ title: "Review deleted successfully!" });
  };

  const handleToggleVisibility = (id: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? {
            ...review,
            status: review.status === "published" ? "hidden" : "published",
          }
        : review
    );
    saveReviews(updatedReviews);
    toast({ title: "Review visibility updated!" });
  };

  const handleToggleFeatured = (id: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, featured: !review.featured } : review
    );
    saveReviews(updatedReviews);
    toast({ title: "Featured status updated!" });
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
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Client Reviews
          </h1>
          <p className="text-gray-400">
            Manage client testimonials and reviews
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          onClick={() => {
            setEditingReview(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Review
        </Button>
      </motion.div>

      <ReviewStats reviews={reviews} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ReviewCard
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleVisibility={handleToggleVisibility}
              onToggleFeatured={handleToggleFeatured}
            />
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No reviews yet. Add your first client review!
          </p>
        </motion.div>
      )}

      <ReviewDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingReview={editingReview}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Reviews;
