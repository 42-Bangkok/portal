/**
Leaflet uses a lot of z-[x] this will prevent a lot of components to work properly this is why it is a seperate page without NavBar
*/

"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState, useMemo, useEffect } from "react";
import { MapPinIcon } from "lucide-react";
import { TMap } from "./types";
import { useMapStore } from "./stores";
import { MiniMarker } from "../markers/mini-marker";

const Map = (props: TMap) => {
  const { initialPosition, initialZoom } = props;
  const [position, setPosition, markers, setMarkers] = useMapStore((state) => [
    state.position,
    state.setPosition,
    state.markers,
    state.setMarkers,
  ]);
  // const [map, setMap] = useState<any>(null);
  const MapHandler = () => {
    const map = useMapEvents({
      move: () => {
        const { lat, lng } = map.getCenter();
        setPosition([lat, lng]);
      },
    });
    return null;
  };
  useEffect(() => {
    setMarkers(props.markers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DisplayMap = useMemo(
    () => (
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
        }}
        // @ts-ignore
        center={initialPosition}
        zoom={initialZoom}
        scrollWheelZoom={true}
        // ref={setMap}
      >
        <MapHandler />
        {markers.map((marker) => (
          <MiniMarker
            key={marker.id}
            id={marker.id}
            position={[marker.lat, marker.lng]}
            title={marker.title}
            description={marker.description}
            featured={marker.featured}
          />
        ))}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [markers]
  );
  return (
    <div className="h-full">
      {DisplayMap}
      <MapPinIcon
        className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2000]"
        color="red"
        fill="white"
        size="16px"
      />
    </div>
  );
};

export default Map;
