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
  const [formData, setFormData] = useState<Omit<Blog, "id">>({
    title: "",
    slug: "",
    imageUrl: "",
    coverImageUrl: "",
    author: "",
    authorId: null,
    category: "Tech",
    status: "PUBLISHED" as Status,
    publishedDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    excerpt: "",
    tags: "",
    content: "",
    isFeatured: false,
  });

  useEffect(() => {
    if (editingBlog) {
      setFormData({ ...editingBlog });
    } else {
      setFormData({
        title: "",
        slug: "",
        imageUrl: "",
        coverImageUrl: "",
        author: "Admin",
        authorId: null,
        category: "Tech",
        status: "PUBLISHED" as Status,
        publishedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        excerpt: "",
        tags: "",
        content: "",
        isFeatured: false,
      });
    }
  }, [editingBlog, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData((prev) => ({
        ...prev,
        [id]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();
    onSubmit({
      ...formData,
      publishedDate: formData.publishedDate || now,
      createdAt: formData.createdAt || now,
      updatedAt: now,
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
          <div>
            <Label htmlFor="slug" className="text-white">
              Slug
            </Label>
            <Input
              id="slug"
              value={formData.slug}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageUrl" className="text-white">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="coverImageUrl" className="text-white">
                Cover Image URL
              </Label>
              <Input
                id="coverImageUrl"
                value={formData.coverImageUrl || ""}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="excerpt" className="text-white">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt || ""}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={2}
            />
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
          <div className="flex items-center gap-2">
            <input
              id="isFeatured"
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="mr-2"
            />
            <Label htmlFor="isFeatured" className="text-white">
              Featured Post
            </Label>
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
