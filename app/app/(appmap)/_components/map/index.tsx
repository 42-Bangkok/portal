/**
 * Map component.
 * ReactLeaftlet requires dynamic import to work with NextJS app router.
 */
import { getMarkers } from "@/lib/db/appmap/markers";
import dynamic from "next/dynamic";
import { FT_BKK_LOC } from "../../constants";

const DynamicMap = dynamic(() => import("./map.component"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const Map = async () => {
  const markers = await getMarkers(100);
  const props = {
    initialPosition: FT_BKK_LOC,
    initialZoom: 17,
    markers: markers,
  };
  return <DynamicMap {...props} />;
};
