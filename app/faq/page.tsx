"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
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
import { FaqT, Status } from "@/types/types";
import { FaqQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const faqQuery = new FaqQuery();

function FAQ() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqT | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    status: "PUBLISHED",
    order: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const faqData = useQuery({
    queryKey: ["faqsFetchAll"],
    queryFn: () => faqQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<FaqT, "id">) => faqQuery.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["faqsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create FAQ", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<FaqT, "id"> }) =>
      faqQuery.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["faqsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update FAQ", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => faqQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["faqsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete FAQ", variant: "destructive" }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingFaq) {
      updateMutation.mutate({
        id: editingFaq.id,
        data: {
          ...formData,
          status: formData.status as Status,
          order: parseInt(formData.order),
          createdAt: editingFaq.createdAt,
        } as Omit<FaqT, "id">,
      });
      toast({ title: "FAQ updated successfully!" });
    } else {
      createMutation.mutate({
        ...formData,
        order: parseInt(formData.order),
        createdAt: new Date().toISOString().split("T")[0],
      } as Omit<FaqT, "id">);
      toast({ title: "FAQ created successfully!" });
    }
    setFormData({
      question: "",
      answer: "",
      category: "general",
      status: "PUBLISHED",
      order: "0",
    });
    setEditingFaq(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (faq: FaqT) => {
    setEditingFaq(faq);
    setFormData({
      ...faq,
      order: faq.order.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    toast({ title: "FAQ deleted successfully!" });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-blue-500";
      case "services":
        return "bg-purple-500";
      case "pricing":
        return "bg-green-500";
      case "support":
        return "bg-orange-500";
      case "technical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  if (faqData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (faqData.isError) {
    return <Loading status={"failed"} />;
  }

  if (faqData.isSuccess) {
    const faqs = faqData.data;
    const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
    const publishedFaqs = faqs.filter(
      (f: FaqT) => f.status === "PUBLISHED"
    ).length;
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
              FAQ Management
            </h1>
            <p className="text-gray-400">
              Manage frequently asked questions for your website
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-effect border-white/20 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="question" className="text-white">
                    Question
                  </Label>
                  <Input
                    id="question"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="answer" className="text-white">
                    Answer
                  </Label>
                  <Textarea
                    id="answer"
                    value={formData.answer}
                    onChange={(e) =>
                      setFormData({ ...formData, answer: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-white">
                      Category
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-white">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) =>
                        setFormData({ ...formData, status: v })
                      }
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="order" className="text-white">
                    Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                  {editingFaq ? "Update FAQ" : "Add FAQ"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFaqs.map((faq: FaqT, index: number) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-white text-lg">
                      {faq.question}
                    </CardTitle>
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(
                        faq.category
                      )}`}
                    >
                      {faq.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                        faq.status
                      )}`}
                    >
                      {faq.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(faq)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                    >
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedFaq === faq.id && (
                  <CardContent>
                    <div className="text-gray-300 mb-2">{faq.answer}</div>
                    <div className="text-xs text-gray-400">
                      Created: {faq.createdAt}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
        {faqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No FAQs yet. Add your first FAQ!
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return <Loading />;
}

export default FAQ;
