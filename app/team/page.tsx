"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberDialog from "./TeamMemberDialog";
import { TeamMember } from "@/types/types";

function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedMembers = localStorage.getItem("team_members");
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    } else {
      const sampleMembers: TeamMember[] = [
        {
          id: 1,
          name: "Jane Doe",
          role: "Senior Frontend Developer",
          avatarUrl:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150",
          status: "active",
          email: "jane.doe@example.com",
          linkedin: "https://linkedin.com/in/janedoe",
          github: "https://github.com/janedoe",
          website: "https://janedoe.com",
          bio: "Passionate frontend developer with 8+ years of experience creating beautiful and performant web applications.",
          certifications: [
            {
              name: "Certified React Developer",
              issuer: "React Certification Board",
              year: "2022",
              url: "https://certifications.react.com/certified-react-developer",
            },
          ],
          achievements: ["Employee of the Month", "Best UI Award"],
          skills: ["React", "TypeScript", "CSS", "UI/UX"],
          resumeUrl: "https://janedoe.com/resume.pdf",
        },
        {
          id: 2,
          name: "John Smith",
          role: "Lead Backend Engineer",
          avatarUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          status: "active",
          email: "john.smith@example.com",
          linkedin: "https://linkedin.com/in/johnsmith",
          github: "https://github.com/johnsmith",
          website: "",
          bio: "Expert in building scalable and reliable backend systems. Loves clean code and good coffee.",
          certifications: [
            {
              name: "Certified React Developer",
              issuer: "React Certification Board",
              year: "2022",
              url: "https://certifications.react.com/certified-react-developer",
            },
          ],
          achievements: ["Built scalable API for 1M+ users"],
          skills: ["Node.js", "Express", "MongoDB", "AWS"],
          resumeUrl: "https://johnsmith.com/resume.pdf",
        },
      ];
      setTeamMembers(sampleMembers);
      localStorage.setItem("team_members", JSON.stringify(sampleMembers));
    }
  }, []);

  const saveMembers = (updatedMembers: TeamMember[]) => {
    setTeamMembers(updatedMembers);
    localStorage.setItem("team_members", JSON.stringify(updatedMembers));
  };

  const handleSubmit = (formData: Omit<TeamMember, "id">) => {
    if (editingMember) {
      const updatedMembers = teamMembers.map((member) =>
        member.id === editingMember.id
          ? { ...editingMember, ...formData }
          : member
      );
      saveMembers(updatedMembers);
      toast({ title: "Team member updated successfully!" });
    } else {
      const newMember = { ...formData, id: Date.now() };
      saveMembers([...teamMembers, newMember]);
      toast({ title: "Team member added successfully!" });
    }
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedMembers = teamMembers.filter((member) => member.id !== id);
    saveMembers(updatedMembers);
    toast({ title: "Team member removed successfully!" });
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
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Team Members
          </h1>
          <p className="text-gray-400">
            Manage your team members and their profiles
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600"
          onClick={() => {
            setEditingMember(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TeamMemberCard
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No team members yet. Add your first member!
          </p>
        </motion.div>
      )}

      <TeamMemberDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingMember={editingMember}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Team;
