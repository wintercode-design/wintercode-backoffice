"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import ProductCard from "./ProductCard";
import ProductDialog from "./ProductDialog";
import { Product } from "@/types/types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const sampleProducts = [
        {
          id: 1,
          name: "Premium Web Hosting",
          description:
            "lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error earum non unde tempore magnam, optio nisi natus asperiores numquam inventore porro eum delectus neque nam magni deleniti reprehenderit perspiciatis soluta.",
          price: 29.99,
          stock: 100,
          category: "Hosting",
          status: "in-stock",
          imageUrl:
            "https://images.unsplash.com/photo-1580894908361-967195033215?w=400",
        },
        {
          id: 2,
          name: "Advanced SEO Package",
          description:
            "lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error earum non unde tempore magnam, optio nisi natus asperiores numquam inventore porro eum delectus neque nam magni deleniti reprehenderit perspiciatis soluta.",
          price: 199.0,
          stock: 50,
          category: "Marketing",
          status: "in-stock",
          imageUrl:
            "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=400",
        },
      ];
      setProducts(sampleProducts);
      localStorage.setItem("products", JSON.stringify(sampleProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleSubmit = (formData: Omit<Product, "id">) => {
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...editingProduct, ...formData } : p
      );
      saveProducts(updatedProducts);
      toast({ title: "Product updated successfully!" });
    } else {
      const newProduct = { ...formData, id: Date.now() };
      saveProducts([...products, newProduct]);
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
    const updatedProducts = products.filter((p) => p.id !== id);
    saveProducts(updatedProducts);
    toast({ title: "Product deleted successfully!" });
  };

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
        {products.map((product, index) => (
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

export default Products;
