"use client";
import Loading from "@/components/custom/Loading";
import { useToast } from "@/components/custom/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/providers/appContext";
import { ContactQuery } from "@/queries";
import { Contact, Priority } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Reply, Star, Trash2 } from "lucide-react";
import { useState } from "react";

function Contacts() {
  const { baseURL } = useAppContext();
  const contactQuery = new ContactQuery(baseURL);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactData = useQuery({
    queryKey: ["contactsFetchAll"],
    queryFn: () => contactQuery.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contactsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete contact", variant: "destructive" }),
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    toast({ title: "Contact message deleted successfully!" });
  };

  const handleReply = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReplyDialogOpen(true);
    // Optionally, mark as read here with a mutation if needed
  };

  const sendReply = () => {
    if (!replyMessage.trim() || !selectedContact) return;
    // Optionally, update contact as replied with a mutation if needed
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
    setReplyMessage("");
    setIsReplyDialogOpen(false);
    setSelectedContact(null);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-green-500";
      case "URGENT":
        return "bg-red-500";
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

  if (contactData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (contactData.isError) {
    return <Loading status={"failed"} />;
  }

  if (contactData.isSuccess) {
    const contacts = contactData.data;
    const unreadCount = contacts.filter(
      (contact: Contact) => contact.status === "PENDING"
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
                    <p className="text-2xl font-bold text-white">
                      {unreadCount}
                    </p>
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
                      {contacts.filter((c: Contact) => c.replied).length}
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
                      {
                        contacts.filter((c: Contact) => c.priority === "HIGH")
                          .length
                      }
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="space-y-4">
          {contacts.map((contact: Contact, index: number) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20">
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`w-2 h-2 rounded-full ${getPriorityColor(
                          contact.priority
                        )}`}
                      ></span>
                      <span className="text-xs text-gray-400">
                        {contact.priority}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                    <div className="font-bold text-white text-lg mb-1">
                      {contact.subject}
                    </div>
                    <div className="text-gray-400 text-sm mb-1">
                      {contact.name} &lt;{contact.email}&gt;
                    </div>
                    <div className="text-gray-400 text-sm mb-1">
                      {contact.message}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReply(contact)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Reply className="h-4 w-4 mr-1" /> Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(contact.id)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="glass-effect border-white/20 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-white">Reply to Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">
                <span className="font-bold">To:</span> {selectedContact?.name}{" "}
                &lt;{selectedContact?.email}&gt;
              </div>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                rows={5}
                placeholder="Type your reply here..."
              />
              <Button
                onClick={sendReply}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Send Reply
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return <Loading />;
}

export default Contacts;
