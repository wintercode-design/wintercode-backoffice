"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import AdCard from "./AdCard";
import AdDialog from "./AdDialog";
import AdStats from "./AdStats";
import { AdsT, Status } from "@/types/types";
import { AdQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";

function Ads() {
  const { baseURL } = useAppContext();
  const adQuery = new AdQuery(baseURL);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdsT | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const adData = useQuery({
    queryKey: ["adsFetchAll"],
    queryFn: () => adQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<AdsT, "id">) => adQuery.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create ad", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<AdsT, "id">;
    }) => adQuery.update(id, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update ad", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete ad", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<AdsT, "id">) => {
    if (editingAd) {
      updateMutation.mutate({ id: editingAd.id, formData });
      toast({ title: "Ad updated successfully!" });
    } else {
      createMutation.mutate(formData);
      toast({ title: "Ad created successfully!" });
    }
    setEditingAd(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (ad: AdsT) => {
    setEditingAd(ad);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    toast({ title: "Ad deleted successfully!" });
  };

  const handleToggleStatus = (id: number) => {
    if (!adData.data) return;
    const ad = adData.data.find((a: AdsT) => a.id === id);
    if (!ad) return;
    const updatedStatus: Status =
      ad.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    updateMutation.mutate({ id, formData: { ...ad, status: updatedStatus } });
    toast({ title: "Ad status updated!" });
  };

  if (adData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (adData.isError) {
    return <Loading status={"failed"} />;
  }

  if (adData.isSuccess) {
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
              Custom Ads
            </h1>
            <p className="text-gray-400">
              Manage promotional banners and advertisements
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            onClick={() => {
              setEditingAd(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ad
          </Button>
        </motion.div>
        <AdStats ads={adData.data} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {adData.data.map((ad: AdsT, index: number) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AdCard
                ad={ad}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            </motion.div>
          ))}
        </div>
        {adData.data.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No advertisements yet. Create your first ad campaign!
            </p>
          </motion.div>
        )}
        <AdDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          editingAd={editingAd}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return <Loading />;
}

export default Ads;
