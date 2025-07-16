"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import ReviewCard from "./ReviewCard";
import ReviewDialog from "./ReviewDialog";
import ReviewStats from "./ReviewStats";
import { Review, Status } from "@/types/types";
import { ReviewQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";

function Reviews() {
  const { baseURL } = useAppContext();
  const reviewQuery = new ReviewQuery(baseURL);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const reviewData = useQuery({
    queryKey: ["reviewsFetchAll"],
    queryFn: () => reviewQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<Review, "id">) => reviewQuery.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reviewsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to add review", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<Review, "id">;
    }) => reviewQuery.update(id, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reviewsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update review", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => reviewQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reviewsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete review", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<Review, "id">) => {
    if (editingReview) {
      updateMutation.mutate({ id: editingReview.id, formData });
      toast({ title: "Review updated successfully!" });
    } else {
      createMutation.mutate(formData);
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
    deleteMutation.mutate(id);
    toast({ title: "Review deleted successfully!" });
  };

  const handleToggleVisibility = (id: number) => {
    if (!reviewData.data) return;
    const review = reviewData.data.find((r: Review) => r.id === id);
    if (!review) return;
    const updatedStatus: Status =
      review.status === "PUBLISHED" ? "RESOLVED" : "PUBLISHED";
    updateMutation.mutate({
      id,
      formData: { ...review, status: updatedStatus },
    });
    toast({ title: "Review visibility updated!" });
  };

  const handleToggleFeatured = (id: number) => {
    if (!reviewData.data) return;
    const review = reviewData.data.find((r: Review) => r.id === id);
    if (!review) return;
    updateMutation.mutate({
      id,
      formData: { ...review, featured: !review.featured },
    });
    toast({ title: "Featured status updated!" });
  };

  if (reviewData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (reviewData.isError) {
    return <Loading status={"failed"} />;
  }

  if (reviewData.isSuccess) {
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
        <ReviewStats reviews={reviewData.data} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviewData.data.map((review: Review, index: number) => (
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
        {reviewData.data.length === 0 && (
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

  return <Loading />;
}

export default Reviews;
