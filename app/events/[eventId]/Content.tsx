"use client";
import Loading from "@/components/custom/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventQuery } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";

const eventQuery = new EventQuery();

const Content = ({ eventId }: { eventId: string }) => {
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: () => eventQuery.getOne(Number(eventId)),
    enabled: !!eventId,
  });

  if (isLoading) return <Loading status="loading" />;
  if (isError || !event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white">Event not found</h2>
        <Link href="/events">
          <Button variant="link" className="text-purple-400">
            Go back to Events
          </Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/events">
          <Button
            variant="outline"
            className="mb-8 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>
      </motion.div>

      <Card className="glass-effect border-white/20">
        {event.imageUrl && (
          <div className="h-96 overflow-hidden rounded-t-lg">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-white gradient-text">
            {event.name}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 text-sm pt-2">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-400" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-purple-400" />
              {event.category}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
            {event.description
              .split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;
