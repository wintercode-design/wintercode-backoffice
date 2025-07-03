import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Users, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useToast } from "@/components/custom/use-toast";

function Email() {
  const [emailData, setEmailData] = useState({
    recipient: "all",
    subject: "",
    message: "",
    template: "custom",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailData.subject.trim() || !emailData.message.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const emailTemplates = [
    { id: "custom", name: "Custom Message" },
    { id: "newsletter", name: "Newsletter Template" },
    { id: "promotion", name: "Promotional Offer" },
    { id: "announcement", name: "Announcement" },
    { id: "welcome", name: "Welcome Message" },
  ];

  const recipientOptions = [
    { id: "all", name: "All Subscribers", count: 1247 },
    { id: "active", name: "Active Subscribers", count: 1180 },
    { id: "recent", name: "Recent Subscribers", count: 89 },
    { id: "custom", name: "Custom List", count: 0 },
  ];

  const getRecipientCount = (recipientId: string) => {
    const option = recipientOptions.find((opt) => opt.id === recipientId);
    return option ? option.count : 0;
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Send Email</h1>
        <p className="text-gray-400">
          Send emails to your subscribers and contacts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Email Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Compose Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipient" className="text-white">
                        Recipients
                      </Label>
                      <Select
                        value={emailData.recipient}
                        onValueChange={(value) =>
                          setEmailData({ ...emailData, recipient: value })
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {recipientOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name} ({option.count})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="template" className="text-white">
                        Template
                      </Label>
                      <Select
                        value={emailData.template}
                        onValueChange={(value) =>
                          setEmailData({ ...emailData, template: value })
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {emailTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={emailData.subject}
                      onChange={(e) =>
                        setEmailData({ ...emailData, subject: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Enter email subject..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={emailData.message}
                      onChange={(e) =>
                        setEmailData({ ...emailData, message: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white min-h-[200px]"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-gray-400">
                      This email will be sent to{" "}
                      {getRecipientCount(emailData.recipient)} recipients
                    </p>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Save Draft
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Email Stats & Quick Actions */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Audience Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipientOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                  >
                    <span className="text-gray-300">{option.name}</span>
                    <span className="text-white font-medium">
                      {option.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Emails Sent This Month</span>
                  <span className="text-2xl font-bold text-white">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Open Rate</span>
                  <span className="text-2xl font-bold text-green-400">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Click Rate</span>
                  <span className="text-2xl font-bold text-blue-400">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Unsubscribe Rate</span>
                  <span className="text-2xl font-bold text-red-400">2%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quick Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {emailTemplates.slice(1).map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                    onClick={() =>
                      setEmailData({ ...emailData, template: template.id })
                    }
                  >
                    {template.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Email;
