"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Tag, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Offer, Status } from "@/types/types";
import { OfferQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const offerQuery = new OfferQuery();

function Offers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    discountPercentage: "",
    validUntil: "",
    status: "ACTIVE",
    category: "service",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const offerData = useQuery({
    queryKey: ["offersFetchAll"],
    queryFn: () => offerQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Offer, "id">) => offerQuery.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["offersFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create offer", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Offer, "id"> }) =>
      offerQuery.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["offersFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update offer", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => offerQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["offersFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete offer", variant: "destructive" }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const originalPrice = parseInt(formData.originalPrice);
    const discountedPrice = parseInt(formData.discountedPrice);
    const discountPercentage = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
    if (editingOffer) {
      updateMutation.mutate({
        id: editingOffer.id,
        data: {
          ...formData,
          discountPercentage,
          validUntil: new Date(formData.validUntil).toISOString(),
          status: formData.status as Status,
          originalPrice: parseFloat(formData.originalPrice),
          discountedPrice: parseFloat(formData.discountedPrice),
          createdAt: editingOffer.createdAt,
        } as Omit<Offer, "id">,
      });
      toast({ title: "Offer updated successfully!" });
    } else {
      createMutation.mutate({
        ...formData,
        discountPercentage,
        validUntil: new Date(formData.validUntil).toISOString(),
        originalPrice: parseFloat(formData.originalPrice),
        discountedPrice: parseFloat(formData.discountedPrice),
        createdAt: new Date().toISOString().split("T")[0],
      } as Omit<Offer, "id">);
      toast({ title: "Offer created successfully!" });
    }
    setFormData({
      title: "",
      description: "",
      originalPrice: "",
      discountedPrice: "",
      discountPercentage: "",
      validUntil: "",
      status: "ACTIVE",
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
    deleteMutation.mutate(id);
    toast({ title: "Offer deleted successfully!" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500";
      case "ARCHIVED":
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

  if (offerData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (offerData.isError) {
    return <Loading status={"failed"} />;
  }

  if (offerData.isSuccess) {
    const offers = offerData.data;
    const activeOffers = offers.filter(
      (o: Offer) => o.status === "ACTIVE" && !isExpired(o.validUntil)
    ).length;
    const expiredOffers = offers.filter(
      (o: Offer) => o.status === "ARCHIVED" || isExpired(o.validUntil)
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
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="originalPrice" className="text-white">
                      Original Price
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
                      Discounted Price
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
                <div className="grid grid-cols-2 gap-4">
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
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="discountPercentage" className="text-white">
                      Discount %
                    </Label>
                    <Input
                      id="discountPercentage"
                      type="number"
                      value={formData.discountPercentage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountPercentage: e.target.value,
                        })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                >
                  {editingOffer ? "Update Offer" : "Create Offer"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer: Offer, index: number) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20">
                <CardContent className="p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-5 w-5 text-orange-400" />
                    <span className="font-bold text-white text-lg">
                      {offer.title}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(
                        offer.category
                      )}`}
                    >
                      {offer.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {offer.description}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-green-400 font-bold">
                        ${offer.discountedPrice}
                      </span>
                      <span className="line-through text-gray-500 ml-2">
                        ${offer.originalPrice}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Valid until: {formatDate(offer.validUntil)}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(offer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(offer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
              No offers yet. Add your first offer!
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return <Loading />;
}

export default Offers;
