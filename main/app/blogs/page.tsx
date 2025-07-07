"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import BlogCard from "./BlogCard";
import BlogDialog from "./BlogDialog";
import { Blog } from "@/types/types";
import { BlogQuery } from "@/queries";

const blogQuery = new BlogQuery();

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Fetch blogs on mount
  useEffect(() => {
    setLoading(true);
    blogQuery
      .getAll()
      .then((data) => setBlogs(data))
      .catch(() =>
        toast({ title: "Failed to fetch blogs", variant: "destructive" })
      )
      .finally(() => setLoading(false));
  }, [toast]);

  const handleSubmit = async (formData: Omit<Blog, "id">) => {
    try {
      if (editingBlog) {
        const updated = await blogQuery.update(editingBlog.id, formData);
        setBlogs((prev) =>
          prev.map((b) => (b.id === editingBlog.id ? updated : b))
        );
        toast({ title: "Blog post updated successfully!" });
      } else {
        const created = await blogQuery.create(formData);
        setBlogs((prev) => [...prev, created]);
        toast({ title: "Blog post created successfully!" });
      }
    } catch {
      toast({ title: "Failed to save blog post", variant: "destructive" });
    }
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await blogQuery.delete(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      toast({ title: "Blog post deleted successfully!" });
    } catch {
      toast({ title: "Failed to delete blog post", variant: "destructive" });
    }
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
          <h1 className="text-4xl font-bold gradient-text mb-2">Blogs</h1>
          <p className="text-gray-400">Manage your blog posts</p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-500 to-cyan-500"
          onClick={() => {
            setEditingBlog(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </motion.div>
      {loading ? (
        <div className="text-center text-gray-400">Loading blogs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard
                blog={blog}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>
      )}
      <BlogDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingBlog={editingBlog}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Blogs;
