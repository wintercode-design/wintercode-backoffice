"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberDialog from "./TeamMemberDialog";
import { TeamMember } from "@/types/types";
import { TeamQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const teamQuery = new TeamQuery();

function Team() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const teamData = useQuery({
    queryKey: ["teamFetchAll"],
    queryFn: () => teamQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<TeamMember, "id">) =>
      teamQuery.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["teamFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to add member", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<TeamMember, "id">;
    }) => teamQuery.update(id, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["teamFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update member", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => teamQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["teamFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to remove member", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<TeamMember, "id">) => {
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, formData });
      toast({ title: "Team member updated successfully!" });
    } else {
      createMutation.mutate(formData);
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
    deleteMutation.mutate(id);
    toast({ title: "Team member removed successfully!" });
  };

  if (teamData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (teamData.isError) {
    return <Loading status={"failed"} />;
  }

  if (teamData.isSuccess) {
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
          {teamData.data.map((member: TeamMember, index: number) => (
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
        {teamData.data.length === 0 && (
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

  return <Loading />;
}

export default Team;
