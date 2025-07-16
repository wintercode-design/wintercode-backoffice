"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/custom/use-toast";
import EventCard from "./EventCard";
import EventDialog from "./EventDialog";
import { EventT } from "@/types/types";
import { EventQuery } from "@/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading";
import { useAppContext } from "@/providers/appContext";

function Events() {
  const { baseURL } = useAppContext();
  const eventQuery = new EventQuery(baseURL);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventT | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const eventData = useQuery({
    queryKey: ["eventsFetchAll"],
    queryFn: () => eventQuery.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: Omit<EventT, "id">) => eventQuery.create(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["eventsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to create event", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: Omit<EventT, "id">;
    }) => eventQuery.update(id, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["eventsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to update event", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => eventQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["eventsFetchAll"] }),
    onError: () =>
      toast({ title: "Failed to delete event", variant: "destructive" }),
  });

  const handleSubmit = (formData: Omit<EventT, "id">) => {
    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, formData });
      toast({ title: "Event updated successfully!" });
    } else {
      createMutation.mutate(formData);
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
    deleteMutation.mutate(id);
    toast({ title: "Event deleted successfully!" });
  };

  if (eventData.isLoading) {
    return <Loading status={"loading"} />;
  }

  if (eventData.isError) {
    return <Loading status={"failed"} />;
  }

  if (eventData.isSuccess) {
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
          {eventData.data.map((event: EventT, index: number) => (
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

  return <Loading />;
}

export default Events;
