import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Quote } from "@/types/types";
import Link from "next/link";

const QuoteCard = ({
  quote,
  onEdit,
  onDelete,
}: {
  quote: Quote;
  onEdit: (quote: Quote) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Card className="glass-effect border-white/20 card-hover h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-white text-lg hover:text-purple-400 transition-colors">
          <Link href={`/quotes/${quote.id}`}>
            {quote.companyName || "No Company Name"}
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-400">
          {quote.contactPerson || quote.email}
        </p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {quote.businessDescription || "No description provided."}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(quote)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(quote.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
