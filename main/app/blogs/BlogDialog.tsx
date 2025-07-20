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
import TipTapEditor from "@/components/ui/tiptap-editor";
import { Blog, Status } from "@/types/types";

const BlogDialog = ({
  isOpen,
  setIsOpen,
  editingBlog,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingBlog: Blog | null;
  onSubmit: (formData: Omit<Blog, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Tech",
    status: "PUBLISHED",
    content: "",
    tags: "",
  });

  useEffect(() => {
    if (editingBlog) {
      setFormData({ ...editingBlog, tags: editingBlog.tags });
    } else {
      setFormData({
        title: "",
        author: "Admin",
        category: "Tech",
        status: "PUBLISHED",
        content: "",
        tags: "",
      });
    }
  }, [editingBlog, isOpen]);

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
      publishedDate: new Date().toISOString(),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .join(","),
      status: formData.status as Status,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingBlog ? "Edit Blog Post" : "Create New Post"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author" className="text-white">
                Author
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="content" className="text-white mb-2 block">
              Content
            </Label>
            <TipTapEditor
              value={formData.content}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, content: value }))
              }
              placeholder="Write your blog content here..."
              className="bg-white/10 border-white/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tags" className="text-white">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
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
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
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
              className="bg-gradient-to-r from-green-500 to-cyan-500"
            >
              {editingBlog ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDialog;
