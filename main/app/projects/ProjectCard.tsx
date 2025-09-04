import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Project } from "@/types/types";
import Link from "next/link";

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  return (
    <Card className="glass-effect border-white/20 card-hover h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-white text-lg hover:text-purple-400 transition-colors">
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </CardTitle>
        <p className="text-sm text-gray-400">{project.category}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: project.description }}
            className="text-gray-300 text-sm mb-4 line-clamp-4"
          />
          <div className="flex items-center text-xs text-gray-400 gap-4 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {formatDate(project.startDate)} -{" "}
              {formatDate(project.endDate)}
            </span>
            <span
              className={`px-2 py-1 rounded-full ${
                project.status === "RESOLVED"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(project)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
