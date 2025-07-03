"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import ProjectCard from "./ProjectCard";
import ProjectDialog from "./ProjectDialog";
import { Project } from "@/types/types";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const sampleProjects: Project[] = [
        {
          id: 1,
          title: "E-commerce Platform",
          category: "Web Development",
          status: "Completed",
          startDate: "2024-08-01",
          endDate: "2025-01-15",
          description: "A full-featured e-commerce site.",
        },
        {
          id: 2,
          title: "Mobile Banking App",
          category: "Mobile App",
          status: "In Progress",
          startDate: "2024-11-01",
          endDate: "2025-05-30",
          description: "A secure mobile banking application.",
        },
      ];
      setProjects(sampleProjects);
      localStorage.setItem("projects", JSON.stringify(sampleProjects));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleSubmit = (formData: Omit<Project, "id">) => {
    if (editingProject) {
      const updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? { ...editingProject, ...formData } : p
      );
      saveProjects(updatedProjects);
      toast({ title: "Project updated successfully!" });
    } else {
      const newProject = { ...formData, id: Date.now() };
      saveProjects([...projects, newProject]);
      toast({ title: "Project created successfully!" });
    }
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    saveProjects(updatedProjects);
    toast({ title: "Project deleted successfully!" });
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
          <h1 className="text-4xl font-bold gradient-text mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-500"
          onClick={() => {
            setEditingProject(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </div>
      <ProjectDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingProject={editingProject}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Projects;
