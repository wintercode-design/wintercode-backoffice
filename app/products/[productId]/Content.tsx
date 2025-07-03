"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Package,
  Tag,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Product } from "@/types/types";

const Content = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      const productData = JSON.parse(savedProducts).find(
        (p: Product) => p.id.toString() === productId
      );
      setProduct(productData);
    }
  }, [productId]);

  console.log(productId);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white">Product not found</h2>
        <Link href="/products">
          <Button variant="link" className="text-purple-400">
            Go back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusInfo = (status: String) => {
    switch (status) {
      case "in-stock":
        return { icon: CheckCircle, color: "text-green-400", text: "In Stock" };
      case "low-stock":
        return {
          icon: AlertTriangle,
          color: "text-yellow-400",
          text: "Low Stock",
        };
      case "out-of-stock":
        return { icon: XCircle, color: "text-red-400", text: "Out of Stock" };
      default:
        return { icon: Package, color: "text-gray-400", text: "Unknown" };
    }
  };

  const statusInfo = getStatusInfo(product.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/products">
          <Button
            variant="outline"
            className="mb-8 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </motion.div>

      <Card className="glass-effect border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {product.imageUrl && (
            <div className="h-96 overflow-hidden md:rounded-l-lg md:rounded-t-none rounded-t-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col p-6">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-white gradient-text">
                {product.name}
              </CardTitle>
              <div className="flex items-center gap-6 text-gray-400 text-sm pt-2">
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {product.category}
                </span>
                <span className={`flex items-center gap-2 ${statusInfo.color}`}>
                  <StatusIcon className="h-4 w-4" />
                  {statusInfo.text} (Stock: {product.stock})
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <p className="text-4xl font-bold text-green-400 flex items-center">
                <DollarSign className="h-8 w-8" />
                {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Content;
