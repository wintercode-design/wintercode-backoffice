"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import BlogCard from "./BlogCard";
import BlogDialog from "./BlogDialog";
import { Blog } from "@/types/types";

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      const sampleBlogs: Blog[] = [
        {
          id: 1,
          title: "The Future of Web Development",
          author: "Admin",
          category: "Tech",
          status: "published",
          publishedDate: "2025-01-20",
          tags: ["webdev", "future", "react"],
          content: "Full blog content here...",
        },
        {
          id: 2,
          title: "Mastering TailwindCSS",
          author: "Admin",
          category: "Design",
          status: "published",
          publishedDate: "2025-01-18",
          tags: ["css", "tailwind", "design"],
          content: "Full blog content here...",
        },
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem("blogs", JSON.stringify(sampleBlogs));
    }
  }, []);

  const saveBlogs = (updatedBlogs: Blog[]) => {
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleSubmit = (formData: Omit<Blog, "id">) => {
    if (editingBlog) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === editingBlog.id ? { ...editingBlog, ...formData } : blog
      );
      saveBlogs(updatedBlogs);
      toast({ title: "Blog post updated successfully!" });
    } else {
      const newBlog = {
        ...formData,
        id: Date.now(),
        publishedDate: new Date().toISOString().split("T")[0],
      };
      saveBlogs([...blogs, newBlog]);
      toast({ title: "Blog post created successfully!" });
    }
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    saveBlogs(updatedBlogs);
    toast({ title: "Blog post deleted successfully!" });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard blog={blog} onEdit={handleEdit} onDelete={handleDelete} />
          </motion.div>
        ))}
      </div>
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
