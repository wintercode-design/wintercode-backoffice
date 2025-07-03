"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import ProfileHeader from "../ProfileHeader";
import ProfileSection from "../ProfileSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TeamMember } from "@/types/types";
const Content = ({ memberId }: { memberId: string }) => {
  const [member, setMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const savedMembers = localStorage.getItem("team_members");
    if (savedMembers) {
      const memberData = JSON.parse(savedMembers).find(
        (m: TeamMember) => m.id.toString() === memberId
      );
      setMember(memberData);
    }
  }, [memberId]);

  if (!member) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white">Member not found</h2>
        <Link href="/team">
          <Button variant="link" className="text-purple-400">
            Go back to Team page
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/team">
          <Button
            variant="outline"
            className="mb-8 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Team
          </Button>
        </Link>
        <ProfileHeader member={member} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileSection title="Achievements">
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {member.achievements?.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Award className="inline h-4 w-4 mr-2 text-yellow-400" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection title="Certifications">
            <div className="space-y-4">
              {member.certifications?.map((cert, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white flex items-center">
                      <BadgeCheck className="h-5 w-5 mr-2 text-blue-400" />
                      {cert.name}
                    </h4>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 ml-7">
                    {cert.issuer} - {cert.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </ProfileSection>
        </div>

        <div className="space-y-8">
          <ProfileSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {member.skills?.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </ProfileSection>

          {member.resumeUrl && (
            <ProfileSection title="Resume">
              <a
                href={member.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-teal-500 to-lime-500">
                  <FileText className="h-4 w-4 mr-2" />
                  View Resume
                </Button>
              </a>
            </ProfileSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
