import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Github, Globe } from "lucide-react";
import { TeamMember } from "@/types/types";

const ProfileHeader = ({ member }: { member: TeamMember }) => {
  return (
    <Card className="glass-effect border-white/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50 flex-shrink-0"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{member.name}</h1>
            <h2 className="text-xl font-medium text-purple-400">
              {member.role}
            </h2>
            <p className="text-gray-300 mt-2 max-w-2xl">{member.bio}</p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Mail />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Linkedin />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Github />
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Globe />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
