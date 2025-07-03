"use client";
import React, { useState, useEffect } from "react";
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
import { FaqT } from "@/types/types";

function FAQ() {
  const [faqs, setFaqs] = useState<FaqT[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqT | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    status: "published",
    order: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedFaqs = localStorage.getItem("faqs");
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs));
    } else {
      // Sample data
      const sampleFaqs: FaqT[] = [
        {
          id: 1,
          question: "What services do you offer?",
          answer:
            "I offer a wide range of web development services including frontend development, backend development, full-stack applications, website design, and consultation services.",
          category: "services",
          status: "published",
          order: 1,
          createdAt: "2025-01-15",
        },
        {
          id: 2,
          question: "How long does a typical project take?",
          answer:
            "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. I provide detailed timelines during the consultation phase.",
          category: "general",
          status: "published",
          order: 2,
          createdAt: "2025-01-14",
        },
        {
          id: 3,
          question: "What are your payment terms?",
          answer:
            "I typically work with a 50% upfront payment and 50% upon completion for smaller projects. For larger projects, we can arrange milestone-based payments. All payment terms are discussed and agreed upon before starting work.",
          category: "pricing",
          status: "published",
          order: 3,
          createdAt: "2025-01-13",
        },
        {
          id: 4,
          question: "Do you provide ongoing support?",
          answer:
            "Yes, I offer ongoing support and maintenance packages. This includes bug fixes, security updates, content updates, and technical support. Support packages can be customized based on your needs.",
          category: "support",
          status: "published",
          order: 4,
          createdAt: "2025-01-12",
        },
      ];
      setFaqs(sampleFaqs);
      localStorage.setItem("faqs", JSON.stringify(sampleFaqs));
    }
  }, []);

  const saveFaqs = (updatedFaqs: FaqT[]) => {
    setFaqs(updatedFaqs);
    localStorage.setItem("faqs", JSON.stringify(updatedFaqs));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingFaq) {
      const updatedFaqs = faqs.map((faq) =>
        faq.id === editingFaq.id
          ? {
              ...formData,
              id: editingFaq.id,
              order: parseInt(formData.order),
              createdAt: editingFaq.createdAt,
            }
          : faq
      );
      saveFaqs(updatedFaqs);
      toast({ title: "FAQ updated successfully!" });
    } else {
      const newFaq = {
        ...formData,
        id: Date.now(),
        order: parseInt(formData.order),
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveFaqs([...faqs, newFaq]);
      toast({ title: "FAQ created successfully!" });
    }

    setFormData({
      question: "",
      answer: "",
      category: "general",
      status: "published",
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
    const updatedFaqs = faqs.filter((faq) => faq.id !== id);
    saveFaqs(updatedFaqs);
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

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
  const publishedFaqs = faqs.filter((f) => f.status === "published").length;

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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="pricing">Pricing</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-white">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="order" className="text-white">
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                  {editingFaq ? "Update" : "Add"} FAQ
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total FAQs</p>
                <p className="text-2xl font-bold text-white">{faqs.length}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Published</p>
                <p className="text-2xl font-bold text-white">{publishedFaqs}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(faqs.map((f) => f.category)).size}
                </p>
              </div>
              <HelpCircle className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {sortedFaqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-400 text-sm">
                        #{faq.order}
                      </span>
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
                    <CardTitle
                      className="text-white text-lg cursor-pointer hover:text-blue-400 transition-colors"
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                    >
                      <div className="flex items-center justify-between">
                        {faq.question}
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </CardTitle>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(faq)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedFaq === faq.id && (
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
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
            No FAQs yet. Add your first FAQ to get started!
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default FAQ;
