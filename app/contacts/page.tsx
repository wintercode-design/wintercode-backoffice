"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  Reply,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/custom/use-toast";
import { Contact } from "@/types/types";

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      // Sample data
      const sampleContacts: Contact[] = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          subject: "Project Inquiry",
          message:
            "Hi, I'm interested in discussing a potential web development project. Could we schedule a call?",
          status: "unread",
          priority: "high",
          createdAt: "2025-01-15T10:30:00Z",
          replied: false,
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah.j@company.com",
          phone: "+1 (555) 987-6543",
          subject: "Collaboration Opportunity",
          message:
            "Hello! I represent a startup looking for a frontend developer. Would you be interested in a collaboration?",
          status: "read",
          priority: "medium",
          createdAt: "2025-01-14T14:20:00Z",
          replied: true,
        },
        {
          id: 3,
          name: "Mike Chen",
          email: "mike.chen@email.com",
          phone: "",
          subject: "Question about your blog post",
          message:
            "Great article on React Hooks! I have a question about the useEffect implementation you mentioned.",
          status: "read",
          priority: "low",
          createdAt: "2025-01-13T09:15:00Z",
          replied: false,
        },
      ];
      setContacts(sampleContacts);
      localStorage.setItem("contacts", JSON.stringify(sampleContacts));
    }
  }, []);

  const saveContacts = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const markAsRead = (id: number) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, status: "read" } : contact
    );
    saveContacts(updatedContacts);
  };

  const handleDelete = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    saveContacts(updatedContacts);
    toast({ title: "Contact message deleted successfully!" });
  };

  const handleReply = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReplyDialogOpen(true);
    if (contact.status === "unread") {
      markAsRead(contact.id);
    }
  };

  const sendReply = () => {
    if (!replyMessage.trim()) return;

    if (!selectedContact) return;

    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContact.id
        ? { ...contact, replied: true }
        : contact
    );
    saveContacts(updatedContacts);

    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });

    setReplyMessage("");
    setIsReplyDialogOpen(false);
    setSelectedContact(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = contacts.filter(
    (contact) => contact.status === "unread"
  ).length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Contact Messages
            </h1>
            <p className="text-gray-400">
              Manage contact form submissions
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Messages</p>
                  <p className="text-2xl font-bold text-white">
                    {contacts.length}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-white">{unreadCount}</p>
                </div>
                <Mail className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Replied</p>
                  <p className="text-2xl font-bold text-white">
                    {contacts.filter((c) => c.replied).length}
                  </p>
                </div>
                <Reply className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">High Priority</p>
                  <p className="text-2xl font-bold text-white">
                    {contacts.filter((c) => c.priority === "high").length}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`glass-effect border-white/20 card-hover ${
                contact.status === "unread" ? "ring-2 ring-blue-500/50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-white text-lg">
                        {contact.name}
                      </CardTitle>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(
                          contact.priority
                        )}`}
                      >
                        {contact.priority}
                      </span>
                      {contact.status === "unread" && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                      {contact.replied && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          Replied
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 font-medium mb-1">
                      {contact.subject}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReply(contact)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{contact.message}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {contacts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">No contact messages yet.</p>
        </motion.div>
      )}

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="glass-effect border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Reply to {selectedContact?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Original message:</p>
              <p className="text-gray-300">{selectedContact?.message}</p>
            </div>

            <div>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
                className="bg-white/10 border-white/20 text-white min-h-[120px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsReplyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={sendReply}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Send Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Contacts;
