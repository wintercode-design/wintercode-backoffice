"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogQuery } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const blogQuery = new BlogQuery();

const Content = ({ blogId }: { blogId: string }) => {
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => blogQuery.getOne(Number(blogId)),
    enabled: !!blogId,
  });

  if (isLoading) return <Loading status="loading" />;
  if (isError || !blog) {
    return <div className="text-center py-12">Blog post not found.</div>;
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
            {blog.tags.split(",").map((tag: string) => (
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
};

export default Content;
