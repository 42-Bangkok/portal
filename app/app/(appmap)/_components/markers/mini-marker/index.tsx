/**
 *  Marker that is shown on the map
 */
import { JSXMarker } from "../jsx-marker";
import { TMiniMarker } from "./types";
import { MapIcon } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { DeleteMarkerDialog } from "./delete-marker-dialog.component";

export const MiniMarker = (props: TMiniMarker) => {
  return (
    <JSXMarker
      position={props.position}
      iconOptions={{
        className: "center-marker",
        iconSize: [250, 50],
        iconAnchor: [125, 25],
      }}
    >
      <Card className="w-[250px] h-[50px] p-1 rounded-l-full rounded-r-full shadow-lg">
        <CardTitle className="flex items-center justify-begining w-full h-full space-x-1">
          <p className="truncate">{props.title}</p>
        </CardTitle>
        <div className="flex gap-1 absolute top-0 right-0">
          <div className="bg-blue-500 rounded-full">
            <DeleteMarkerDialog id={props.id} />
          </div>
          <Link
            href={`https://maps.google.com/maps?q=${props.position[0]},${props.position[1]}`}
            target="_blank"
          >
            <div className="bg-blue-500 rounded-full">
              <MapIcon size={16} fill="white" />
            </div>
          </Link>
        </div>
      </Card>
    </JSXMarker>
  );
};
