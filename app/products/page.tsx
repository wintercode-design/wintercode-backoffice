"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import ProductCard from "./ProductCard";
import ProductDialog from "./ProductDialog";
import { Product } from "@/types/types";
import { ProductQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";

const product = new ProductQuery();

function Products() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const productData = useQuery({
    queryKey: ["productFetchAll"],
    queryFn: () => product.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<Product, "id">) => product.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["productFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create product", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<Product, "id">;
    }) => product.update(id, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["productFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update product", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => product.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["productFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete product", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<Product, "id">) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, formData });
      toast({ title: "Product updated successfully!" });
    } else {
      createMutation.mutate(formData);
      toast({ title: "Product created successfully!" });
    }
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    toast({ title: "Product deleted successfully!" });
  };

  if (productData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (productData.isError) {
    return <Loading status={"failed"} />;
  }

  if (productData.isSuccess) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Products</h1>
            <p className="text-gray-400">Manage your products and services</p>
          </div>
          <Button
            className="bg-gradient-to-r from-red-500 to-orange-500"
            onClick={() => {
              setEditingProduct(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Product
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productData.data.map((product: Product, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>
        <ProductDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return <Loading />;
}

export default Products;
