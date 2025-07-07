"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Review, Status } from "@/types/types";

const ReviewDialog = ({
  isOpen,
  setIsOpen,
  editingReview,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingReview: Review | null;
  onSubmit: (review: Omit<Review, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    clientCompany: "",
    rating: "5",
    review: "",
    projectType: "web-development",
    status: "PUBLISHED",
    featured: false,
    clientImage: "",
  });

  useEffect(() => {
    if (editingReview) {
      setFormData({
        ...editingReview,
        rating: editingReview.rating.toString(),
      });
    } else {
      setFormData({
        clientName: "",
        clientTitle: "",
        clientCompany: "",
        rating: "5",
        review: "",
        projectType: "web-development",
        status: "PUBLISHED",
        featured: false,
        clientImage: "",
      });
    }
  }, [editingReview, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: formData.status as Status,
      createdAt: new Date().toISOString(),
      rating: parseInt(formData.rating),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingReview ? "Edit Review" : "Add New Review"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName" className="text-white">
                Client Name
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="clientTitle" className="text-white">
                Client Title
              </Label>
              <Input
                id="clientTitle"
                value={formData.clientTitle}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientCompany" className="text-white">
                Company
              </Label>
              <Input
                id="clientCompany"
                value={formData.clientCompany}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="rating" className="text-white">
                Rating
              </Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(v) => handleSelectChange("rating", v)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="review" className="text-white">
              Review
            </Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectType" className="text-white">
                Project Type
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(v) => handleSelectChange("projectType", v)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="web-development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="e-commerce">E-commerce</SelectItem>
                  <SelectItem value="mobile-app">Mobile App</SelectItem>
                  <SelectItem value="startup-website">
                    Startup Website
                  </SelectItem>
                  <SelectItem value="redesign">Redesign</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(v) => handleSelectChange("status", v)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="INACTIVE">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="clientImage" className="text-white">
              Client Image URL
            </Label>
            <Input
              id="clientImage"
              value={formData.clientImage}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(c) =>
                setFormData((prev) => ({
                  ...prev,
                  featured: typeof c == "string" ? false : c,
                }))
              }
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Featured Review
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              {editingReview ? "Update" : "Add"} Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
