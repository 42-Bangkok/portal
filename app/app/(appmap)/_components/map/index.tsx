import { getMarkers } from "@/lib/db/appmap/markers";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./map.component"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const Map = async () => {
  const markers = await getMarkers(100);
  const props = {
    initialPosition: [13.7275902, 100.7783393] as [number, number],
    initialZoom: 17,
    markers: markers,
  };
  return <DynamicMap {...props} />;
};
