import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/types";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Card className="glass-effect border-white/20 card-hover overflow-hidden">
      <div className="h-40">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-white text-lg truncate">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <p className="text-sm text-gray-400">{product.category}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-green-400">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">Stock: {product.stock}</p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button size="sm" variant="ghost" onClick={() => onEdit(product)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
