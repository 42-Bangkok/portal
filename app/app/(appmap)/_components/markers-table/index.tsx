/**
 * The first layer of a component if it fetches data should be an RSC.
 */

import { getMarkers } from "@/lib/db/appmap/markers";
import { Table } from "./table";

export const MarkersTable = async () => {
  const markers = await getMarkers(100);
  return (
    <>
      <Table data={markers} />
    </>
  );
};

MarkersTable.Skeleton = function MarkersTableSkeleton() {
  return <div>Loading...</div>;
};
