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
import { Quote } from "@/types/types";

const QuoteDialog = ({
  isOpen,
  setIsOpen,
  editingQuote,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingQuote: Quote | null;
  onSubmit: (quote: Omit<Quote, "id">) => void;
}) => {
  const [formData, setFormData] = useState<Omit<Quote, "id">>({});

  useEffect(() => {
    if (editingQuote) {
      setFormData(editingQuote);
    } else {
      setFormData({});
    }
  }, [editingQuote, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingQuote ? "Edit Quote" : "Create New Quote"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName" className="text-white">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="contactPerson" className="text-white">
                Contact Person
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-white">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location" className="text-white">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="hasWebsite" className="text-white">
              Has Website?
            </Label>
            <input
              id="hasWebsite"
              type="checkbox"
              checked={!!formData.hasWebsite}
              onChange={handleChange}
              className="ml-2"
            />
          </div>
          <div>
            <Label htmlFor="website" className="text-white">
              Website
            </Label>
            <Input
              id="website"
              value={formData.website || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="businessDescription" className="text-white">
              Business Description
            </Label>
            <Textarea
              id="businessDescription"
              value={formData.businessDescription || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="targetAudience" className="text-white">
              Target Audience
            </Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="products" className="text-white">
              Products
            </Label>
            <Input
              id="products"
              value={formData.products || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="goals" className="text-white">
              Goals
            </Label>
            <Input
              id="goals"
              value={formData.goals || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="otherGoal" className="text-white">
              Other Goal
            </Label>
            <Input
              id="otherGoal"
              value={formData.otherGoal || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="priorities" className="text-white">
              Priorities
            </Label>
            <Input
              id="priorities"
              value={formData.priorities || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="designLikes" className="text-white">
              Design Likes
            </Label>
            <Input
              id="designLikes"
              value={formData.designLikes || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="designDislikes" className="text-white">
              Design Dislikes
            </Label>
            <Input
              id="designDislikes"
              value={formData.designDislikes || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="colorPreferences" className="text-white">
              Color Preferences
            </Label>
            <Input
              id="colorPreferences"
              value={formData.colorPreferences || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="referenceWebsites" className="text-white">
              Reference Websites
            </Label>
            <Input
              id="referenceWebsites"
              value={formData.referenceWebsites || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="competitors" className="text-white">
              Competitors
            </Label>
            <Input
              id="competitors"
              value={formData.competitors || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget" className="text-white">
                Budget
              </Label>
              <Input
                id="budget"
                value={formData.budget || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="timeline" className="text-white">
                Timeline
              </Label>
              <Input
                id="timeline"
                value={formData.timeline || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="additional" className="text-white">
              Additional Info
            </Label>
            <Textarea
              id="additional"
              value={formData.additional || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={2}
            />
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
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            >
              {editingQuote ? "Update Quote" : "Create Quote"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
