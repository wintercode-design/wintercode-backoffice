"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import EventCard from "./EventCard";
import EventDialog from "./EventDialog";
import { EventT } from "@/types/types";

function Events() {
  const [events, setEvents] = useState<EventT[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventT | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const sampleEvents: EventT[] = [
        {
          id: 1,
          name: "Tech Conference 2025",
          date: "2025-08-15",
          location: "Virtual",
          description: "A conference about the future of technology.",
          time: "12:00 - 16:00",
          category: "tech",
          imageUrl:
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400",
        },
        {
          id: 2,
          name: "Design Workshop",
          date: "2025-09-10",
          location: "Online",
          description: "Hands-on workshop for UI/UX designers.",
          time: "12:00 - 16:00",
          category: "tech",
          imageUrl:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
        },
      ];
      setEvents(sampleEvents);
      localStorage.setItem("events", JSON.stringify(sampleEvents));
    }
  }, []);

  const saveEvents = (updatedEvents: EventT[]) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleSubmit = (formData: Omit<EventT, "id">) => {
    if (editingEvent) {
      const updatedEvents = events.map((e) =>
        e.id === editingEvent.id ? { ...editingEvent, ...formData } : e
      );
      saveEvents(updatedEvents);
      toast({ title: "Event updated successfully!" });
    } else {
      const newEvent = { ...formData, id: Date.now() };
      saveEvents([...events, newEvent]);
      toast({ title: "Event created successfully!" });
    }
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (event: EventT) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    saveEvents(updatedEvents);
    toast({ title: "Event deleted successfully!" });
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
          <h1 className="text-4xl font-bold gradient-text mb-2">Events</h1>
          <p className="text-gray-400">Manage your upcoming events</p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500"
          onClick={() => {
            setEditingEvent(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EventCard
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </div>
      <EventDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingEvent={editingEvent}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Events;
