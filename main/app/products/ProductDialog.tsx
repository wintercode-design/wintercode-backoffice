"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Product, Status } from "@/types/types";
import React, { useEffect, useState } from "react";

const ProductDialog = ({
  isOpen,
  setIsOpen,
  editingProduct,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingProduct: Product | null;
  onSubmit: (formData: Omit<Product, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
    description: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (editingProduct) {
      const { stock, price, ...productData } = editingProduct;
      setFormData({
        price: price.toString(),
        stock: stock.toString(),
        ...productData,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
        description: "",
        status: "ACTIVE",
      });
    }
  }, [editingProduct, isOpen]);

  interface FormData {
    name: string;
    price: string;
    stock: string;
    category: string;
    imageUrl: string;
    description: string;
    status: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: formData.status as Status,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-effect border-white/20 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingProduct ? "Edit Product" : "Create New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">
              Product Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-white">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-white">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              rows={10}
              required
            />
          </div>
          <div>
            <Label htmlFor="status" className="text-white">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(v) => handleSelectChange("status", v)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="ACTIVE">Published</SelectItem>
                <SelectItem value="INACTIVE">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="imageUrl" className="text-white">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-orange-500"
            >
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
