"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project } from "@/types/types";
const Content = ({ projectId }: { projectId: string }) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const projectData = JSON.parse(savedProjects).find(
        (p: Project) => p.id.toString() === projectId
      );
      setProject(projectData);
    }
  }, [projectId]);

  if (!project) {
    return <div className="text-center py-12">Loading project...</div>;
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
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>
      <div className="glass-effect p-8 rounded-lg">
        <header className="mb-6 border-b border-white/20 pb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            {project.title}
          </h1>
          <p className="text-lg text-purple-300">{project.category}</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Start Date</p>
              <p className="font-semibold">{formatDate(project.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">End Date</p>
              <p className="font-semibold">{formatDate(project.endDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
            {project.status === "Completed" ? (
              <CheckCircle className="h-6 w-6 text-green-400" />
            ) : (
              <Clock className="h-6 w-6 text-yellow-400" />
            )}
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="font-semibold">{project.status}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Content;
