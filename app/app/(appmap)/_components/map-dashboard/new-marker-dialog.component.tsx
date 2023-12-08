"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMapStore } from "../map/stores";
import { createMarker } from "@/lib/db/appmap/markers";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  title: z.string().min(5, { message: "Title is required" }),
  description: z.string().min(5, { message: "Description is required" }),
});

/**
 * Dialog to create a new marker
 */
export function NewMarkerDialog() {
  const [position] = useMapStore((state) => [state.position]);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async (e: any) => {
    setPending(true);
    const { data, error } = await createMarker({
      title: "test",
      description: "test",
      lat: position[0],
      lng: position[1],
      createdBy: "admin",
      featured: false,
    });
    if (data) {
      toast.success("Successfully created a new marker!");
      setOpen(false);
      setPending(false);
    } else if (error) {
      setPending(false);
      toast.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Marker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-[2000]">
        <DialogHeader>
          <DialogTitle>New Marker</DialogTitle>
          <DialogDescription>
            This will add a new marker in the center of your current map.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title of your marker"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="short description of your marker"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
