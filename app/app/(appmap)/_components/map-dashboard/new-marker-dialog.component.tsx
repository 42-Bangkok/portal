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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMapStore } from "../map/stores";
import { createMarker } from "@/lib/db/appmap/markers";
import { toast } from "sonner";

export function NewMarkerDialog() {
  const [position] = useMapStore((state) => [state.position]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(position);
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
    } else if (error) {
      toast.error(error);
    }
  };
  return (
    <Dialog>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="title of your marker"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="short description of your marker"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
