"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import QuoteCard from "./QuoteCard";
import QuoteDialog from "./QuoteDialog";
import { Quote } from "@/types/types";
import { QuoteQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const quoteQuery = new QuoteQuery();

function Quotes() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const quoteData = useQuery({
    queryKey: ["quotesFetchAll"],
    queryFn: () => quoteQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<Quote, "id">) => quoteQuery.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["quotesFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create quote", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<Quote, "id">;
    }) => quoteQuery.update(id, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["quotesFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update quote", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => quoteQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["quotesFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete quote", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<Quote, "id">) => {
    if (editingQuote) {
      updateMutation.mutate({ id: editingQuote.id, formData });
      toast({ title: "Quote updated successfully!" });
    } else {
      createMutation.mutate(formData);
      toast({ title: "Quote created successfully!" });
    }
    setEditingQuote(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    toast({ title: "Quote deleted successfully!" });
  };

  if (quoteData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (quoteData.isError) {
    return <Loading status={"failed"} />;
  }

  if (quoteData.isSuccess) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Quotes</h1>
            <p className="text-gray-400">Manage your client quotes</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500"
            onClick={() => {
              setEditingQuote(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quoteData.data.map((quote: Quote, index: number) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <QuoteCard
                quote={quote}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>
        <QuoteDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          editingQuote={editingQuote}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return <Loading />;
}

export default Quotes;
