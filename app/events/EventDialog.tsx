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
import { EventT } from "@/types/types";

const EventDialog = ({
  isOpen,
  setIsOpen,
  editingEvent,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingEvent: EventT | null;
  onSubmit: (event: Omit<EventT, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    time: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        ...editingEvent,
        imageUrl: editingEvent.imageUrl || "",
      });
    } else {
      setFormData({
        name: "",
        date: "",
        location: "",
        description: "",
        time: "",
        category: "",
        imageUrl: "",
      });
    }
  }, [editingEvent, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingEvent ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">
              Event Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-white">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-white">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-white">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="imageUrl" className="text-white">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
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
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {editingEvent ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
