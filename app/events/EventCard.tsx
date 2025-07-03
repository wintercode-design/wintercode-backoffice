import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { EventT } from "@/types/types";
import Link from "next/link";

const EventCard = ({
  event,
  onEdit,
  onDelete,
}: {
  event: EventT;
  onEdit: (event: EventT) => void;
  onDelete: (id: number) => void;
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Card className="glass-effect border-white/20 card-hover overflow-hidden h-full flex flex-col">
      <div className="h-40">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-white text-lg">
          <Link href={`events/${event.id}`}>{event.name}</Link>
        </CardTitle>
        <div className="flex items-center text-sm text-gray-400 gap-4 pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {event.location}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(event)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(event.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
