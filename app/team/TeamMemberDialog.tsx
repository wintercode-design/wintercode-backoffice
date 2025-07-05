"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status, TeamMember } from "@/types/types";

const TeamMemberDialog = ({
  isOpen,
  setIsOpen,
  editingMember,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingMember: TeamMember | null;
  onSubmit: (member: Omit<TeamMember, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    avatarUrl: "",
    bio: "",
    email: "",
    linkedin: "",
    github: "",
    website: "",
    resumeUrl: "",
    // certifications: "",
    achievements: "",
    skills: "",
    status: "active",
  });

  useEffect(() => {
    if (editingMember) {
      setFormData({
        ...editingMember,
        resumeUrl: "",
        // certifications: Array.isArray(editingMember.certifications)
        //   ? editingMember.certifications
        //       .map((c) => `${c.name}|${c.issuer}|${c.year}|${c.url}`)
        //       .join("\n")
        //   : "",
        achievements: Array.isArray(editingMember.achievements)
          ? editingMember.achievements.join("\n")
          : "",
        skills: Array.isArray(editingMember.skills)
          ? editingMember.skills.join("; ")
          : "",
      });
    } else {
      setFormData({
        name: "",
        role: "",
        avatarUrl: "",
        bio: "",
        email: "",
        linkedin: "",
        github: "",
        website: "",
        resumeUrl: "",
        // certifications: "",
        achievements: "",
        skills: "",
        status: "active",
      });
    }
  }, [editingMember, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      // certifications: formData.certifications
      //   .split("\n")
      //   .filter(Boolean)
      //   .map((line) => {
      //     const [name, issuer, year, url] = line.split("|");
      //     return { name, issuer, year, url };
      //   }),
      status: formData.status as Status,
      achievements: formData.achievements.split("\n").join(";"),
      skills: formData.skills,
      // skills: formData.skills
      //   .split(",")
      //   .map((s) => s.trim())
      //   .filter(Boolean),
    };
    onSubmit(processedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingMember ? "Edit Team Member" : "Add New Team Member"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="avatarUrl" className="text-white">
              Avatar URL
            </Label>
            <Input
              id="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="bio" className="text-white">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData((p) => ({ ...p, status: v }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-purple-400 pt-4 border-t border-white/10">
            Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin" className="text-white">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="github" className="text-white">
                GitHub URL
              </Label>
              <Input
                id="github"
                value={formData.github}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-white">
                Personal Website URL
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="resumeUrl" className="text-white">
                Resume URL (PDF)
              </Label>
              <Input
                id="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-purple-400 pt-4 border-t border-white/10">
            Details
          </h3>
          <div>
            <Label htmlFor="skills" className="text-white">
              Skills (comma-separated)
            </Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="achievements" className="text-white">
              Achievements (one per line)
            </Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={4}
            />
          </div>
          {/* <div>
            <Label htmlFor="certifications" className="text-white">
              Certifications (one per line: Name|Issuer|Year|URL)
            </Label>
            <Textarea
              id="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={4}
            />
          </div> */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-lime-500"
            >
              {editingMember ? "Update" : "Add"} Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberDialog;
