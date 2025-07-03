import React from "react";
import { Edit, Trash2, Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamMember } from "@/types/types";
import Link from "next/link";

const TeamMemberCard = ({
  member,
  onEdit,
  onDelete,
}: {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Card className="glass-effect border-white/20 card-hover flex flex-col h-full">
      <CardHeader className="items-center text-center">
        <Link href={`/team/${member.id}`}>
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50"
          />
        </Link>
        <CardTitle className="text-white text-lg mt-4">{member.name}</CardTitle>
        <p className="text-purple-400 text-sm">{member.role}</p>
      </CardHeader>
      <CardContent className="text-center text-gray-300 text-sm flex-grow">
        <p>
          {member.bio?.substring(0, 100)}
          {member.bio?.length > 100 ? "..." : ""}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-center">
        <div className="flex gap-3 mb-4">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="h-5 w-5 text-gray-400 hover:text-white" />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
            </a>
          )}
          {member.github && (
            <a href={member.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-gray-400 hover:text-white" />
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(member)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(member.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;
