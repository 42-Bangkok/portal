/**
 * Map dashboard component.
 */
import { Suspense } from "react";
import { MarkersTable } from "../markers-table";
import { NewMarkerDialog } from "./new-marker-dialog.component";

export const MapDashboard = async () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">🗺️ Around 42 BKK</h1>
        <NewMarkerDialog />
      </div>
      <Suspense fallback={<MarkersTable.Skeleton />}>
        <MarkersTable />
      </Suspense>
    </div>
  );
};

MapDashboard.Skeleton = function MapSkeleton() {
  return <div className="p-2">Loading...</div>;
};
