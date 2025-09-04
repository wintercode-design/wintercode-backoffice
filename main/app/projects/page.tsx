/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import Loading from "@/components/custom/Loading";
import { useToast } from "@/components/custom/use-toast";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/providers/appContext";
import { ProjectQuery } from "@/queries";
import { Project } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDialog from "./ProjectDialog";

function Projects() {
  const { baseURL } = useAppContext();
  const projectQuery = new ProjectQuery(baseURL);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const projectData = useQuery({
    queryKey: ["projectsFetchAll"],
    queryFn: () => projectQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<Project, "id">) =>
      projectQuery.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["projectsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create project", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<Project, "id">;
    }) => {
      const nData = { ...formData, id: null };
      const { id: _id, slug: _slug, ...fData } = nData;
      return projectQuery.update(id, fData);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["projectsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update project", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["projectsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete project", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<Project, "id">) => {
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, formData });
      toast({ title: "Project updated successfully!" });
    } else {
      createMutation.mutate(formData);
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
    deleteMutation.mutate(id);
    toast({ title: "Project deleted successfully!" });
  };

  if (projectData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (projectData.isError) {
    return <Loading status={"failed"} />;
  }

  if (projectData.isSuccess) {
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
          {projectData.data.map((project: Project, index: number) => (
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

  return <Loading />;
}

export default Projects;
