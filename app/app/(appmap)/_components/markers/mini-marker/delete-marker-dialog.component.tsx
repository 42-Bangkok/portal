"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { deleteMarker } from "@/lib/db/appmap/markers";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { useMapStore } from "../../map/stores";

export function DeleteMarkerDialog({ id }: { id: string }) {
  const [markers, setMarkers] = useMapStore((state) => [
    state.markers,
    state.setMarkers
  ]);
  const handleDelete = async () => {
    const { data, error } = await deleteMarker(id);
    if (data) {
      toast.success("Marker deleted");
      setMarkers(markers.filter((marker) => marker.id !== id));
    } else if (error) {
      toast.error(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <XIcon size={16} color="white" />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] z-[2000]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            marker and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
