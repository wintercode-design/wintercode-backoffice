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
import { AdsT, Status } from "@/types/types";

const AdDialog = ({
  isOpen,
  setIsOpen,
  editingAd,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingAd: AdsT | null;
  onSubmit: (formData: Omit<AdsT, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    position: "header",
    type: "banner",
    status: "active",
    startDate: "",
    endDate: "",
    priority: "",
  });

  useEffect(() => {
    if (editingAd) {
      setFormData({ ...editingAd, priority: editingAd.priority.toString() });
    } else {
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        linkUrl: "",
        position: "header",
        type: "banner",
        status: "ACTIVE",
        startDate: "",
        endDate: "",
        priority: "1",
      });
    }
  }, [editingAd, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
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
      createdAt: new Date("now").toLocaleString(),
      clicks: 0,
      impressions: 0,
      priority: parseInt(formData.priority),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingAd ? "Edit Advertisement" : "Create New Advertisement"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="linkUrl" className="text-white">
                Link URL
              </Label>
              <Input
                id="linkUrl"
                value={formData.linkUrl}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                placeholder="/page or https://..."
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
              required
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
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="position" className="text-white">
                Position
              </Label>
              <Select
                value={formData.position}
                onValueChange={(v) => handleSelectChange("position", v)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="header">Header</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                  <SelectItem value="popup">Popup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type" className="text-white">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(v) => handleSelectChange("type", v)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="banner">Banner</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="popup">Popup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority" className="text-white">
                Priority
              </Label>
              <Input
                id="priority"
                type="number"
                value={formData.priority}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                min="1"
                max="10"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate" className="text-white">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-white">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
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
              className="bg-gradient-to-r from-pink-500 to-red-500"
            >
              {editingAd ? "Update" : "Create"} Ad
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdDialog;
