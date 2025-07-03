"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Tag, Calendar, DollarSign } from "lucide-react";
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
import { Offer } from "@/types/types";

function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    discountPercentage: "",
    validUntil: "",
    status: "active",
    category: "service",
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedOffers = localStorage.getItem("offers");
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    } else {
      // Sample data
      const sampleOffers: Offer[] = [
        {
          id: 1,
          title: "Website Development Package",
          description:
            "Complete website development with modern design and responsive layout",
          originalPrice: 2000,
          discountedPrice: 1500,
          discountPercentage: 25,
          validUntil: "2025-02-28",
          status: "active",
          category: "service",
          createdAt: "2025-01-15",
        },
        {
          id: 2,
          title: "Logo Design Special",
          description:
            "Professional logo design with 3 concepts and unlimited revisions",
          originalPrice: 500,
          discountedPrice: 350,
          discountPercentage: 30,
          validUntil: "2025-02-15",
          status: "active",
          category: "design",
          createdAt: "2025-01-10",
        },
        {
          id: 3,
          title: "SEO Optimization Bundle",
          description:
            "Complete SEO audit and optimization for better search rankings",
          originalPrice: 800,
          discountedPrice: 600,
          discountPercentage: 25,
          validUntil: "2025-01-31",
          status: "expired",
          category: "service",
          createdAt: "2025-01-05",
        },
      ];
      setOffers(sampleOffers);
      localStorage.setItem("offers", JSON.stringify(sampleOffers));
    }
  }, []);

  const saveOffers = (updatedOffers: Offer[]) => {
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const originalPrice = parseInt(formData.originalPrice);
    const discountedPrice = parseInt(formData.discountedPrice);
    const discountPercentage = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );

    if (editingOffer) {
      const updatedOffers = offers.map((offer) =>
        offer.id === editingOffer.id
          ? {
              ...formData,
              id: editingOffer.id,
              discountPercentage,
              originalPrice: parseFloat(formData.originalPrice),
              discountedPrice: parseFloat(formData.discountedPrice),
              createdAt: editingOffer.createdAt,
            }
          : offer
      );
      saveOffers(updatedOffers);
      toast({ title: "Offer updated successfully!" });
    } else {
      const newOffer = {
        ...formData,
        id: Date.now(),
        discountPercentage,
        originalPrice: parseFloat(formData.originalPrice),
        discountedPrice: parseFloat(formData.discountedPrice),
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveOffers([...offers, newOffer]);
      toast({ title: "Offer created successfully!" });
    }

    setFormData({
      title: "",
      description: "",
      originalPrice: "",
      discountedPrice: "",
      discountPercentage: "",
      validUntil: "",
      status: "active",
      category: "service",
    });
    setEditingOffer(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    const { originalPrice, discountedPrice, discountPercentage, ...offerData } =
      offer;
    setFormData({
      ...offerData,
      discountPercentage: discountPercentage.toString(),
      originalPrice: originalPrice.toString(),
      discountedPrice: discountedPrice.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id);
    saveOffers(updatedOffers);
    toast({ title: "Offer deleted successfully!" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-red-500";
      case "draft":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "service":
        return "bg-blue-500";
      case "design":
        return "bg-purple-500";
      case "development":
        return "bg-green-500";
      case "consultation":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  const activeOffers = offers.filter(
    (o) => o.status === "active" && !isExpired(o.validUntil)
  ).length;
  const expiredOffers = offers.filter(
    (o) => o.status === "expired" || isExpired(o.validUntil)
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
            Special Offers
          </h1>
          <p className="text-gray-400">
            Manage your promotional offers and discounts
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="h-4 w-4 mr-2" />
              New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingOffer ? "Edit Offer" : "Create New Offer"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-white">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
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
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="originalPrice" className="text-white">
                    Original Price ($)
                  </Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="discountedPrice" className="text-white">
                    Discounted Price ($)
                  </Label>
                  <Input
                    id="discountedPrice"
                    type="number"
                    value={formData.discountedPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountedPrice: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="validUntil" className="text-white">
                    Valid Until
                  </Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) =>
                      setFormData({ ...formData, validUntil: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
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
                  className="bg-gradient-to-r from-orange-500 to-red-500"
                >
                  {editingOffer ? "Update" : "Create"} Offer
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
                <p className="text-gray-400 text-sm">Total Offers</p>
                <p className="text-2xl font-bold text-white">{offers.length}</p>
              </div>
              <Tag className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Offers</p>
                <p className="text-2xl font-bold text-white">{activeOffers}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expired</p>
                <p className="text-2xl font-bold text-white">{expiredOffers}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 card-hover">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-white text-lg">
                        {offer.title}
                      </CardTitle>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                          offer.status
                        )}`}
                      >
                        {isExpired(offer.validUntil) ? "expired" : offer.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(
                          offer.category
                        )}`}
                      >
                        {offer.category}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{offer.description}</p>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(offer)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(offer.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-xs">Original</p>
                        <p className="text-gray-400 line-through">
                          ${offer.originalPrice}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs">Discounted</p>
                        <p className="text-2xl font-bold text-green-400">
                          ${offer.discountedPrice}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg">
                        <p className="text-lg font-bold">
                          {offer.discountPercentage}% OFF
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Valid until {formatDate(offer.validUntil)}
                    </span>
                    <span>Created {formatDate(offer.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {offers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No offers yet. Create your first promotional offer!
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Offers;
