import { MarkersTable } from "../markers-table";
import { NewMarkerDialog } from "./new-marker-dialog.component";

export const MapDashboard = async () => {
  const markersTableProps = {
    data: [
      {
        id: "1",
        title: "ร้านน้ำแดงป้าสุดา",
        description: "ราคาถูกมาก",
        lat: 1,
        lng: 1,
        createdBy: "admin",
      },
      {
        id: "1",
        title: "ร้านน้ำแดงป้าสุดา",
        description: "ราคาถูกมาก",
        lat: 1,
        lng: 1,
        createdBy: "admin",
      },
      {
        id: "1",
        title: "ร้านน้ำแดงป้าสุดา",
        description: "ราคาถูกมาก",
        lat: 1,
        lng: 1,
        createdBy: "admin",
      },
      {
        id: "1",
        title: "ร้านน้ำแดงป้าสุดา",
        description: "ราคาถูกมาก",
        lat: 1,
        lng: 1,
        createdBy: "admin",
      },
      {
        id: "1",
        title: "ร้านน้ำแดงป้าสุดา",
        description: "ราคาถูกมาก",
        lat: 1,
        lng: 1,
        createdBy: "admin",
      },
      {
        id: "1",
        title: "ร้านน้ำแดงป้าสุดา",
        description: "ราคาถูกมาก",
        lat: 1,
        lng: 1,
        createdBy: "admin",
      },
    ],
  };
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">🗺️ Around 42 BKK</h1>
        <NewMarkerDialog />
      </div>
      <MarkersTable {...markersTableProps} />
    </div>
  );
};

MapDashboard.Skeleton = function MapSkeleton() {
  return <div className="p-2">Loading...</div>;
};
