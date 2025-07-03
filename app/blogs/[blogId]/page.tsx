"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Blog } from "@/types/types";

async function BlogDetail({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      const blogData = JSON.parse(savedBlogs).find(
        (p: Blog) => p.id.toString() === blogId
      );
      setBlog(blogData);
    }
  }, [blogId]);

  if (!blog) {
    return <div className="text-center py-12">Loading blog post...</div>;
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/blogs">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Link>
      </Button>
      <article className="glass-effect p-8 rounded-lg">
        <header className="mb-8 border-b border-white/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-400 gap-6 text-sm">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" /> {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {formatDate(blog.publishedDate)}
            </span>
          </div>
        </header>
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
          <p>{blog.content}</p>
        </div>
        <footer className="mt-8 pt-8 border-t border-white/20">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-gray-400" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </motion.div>
  );
}

export default BlogDetail;
