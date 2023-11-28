'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useEffect, useState, useMemo } from 'react';
import { MapPinIcon } from 'lucide-react';
import { TMap } from './types';

const MapHandler = () => {
  const map = useMapEvents({})
  return null
}

const Map = (props: TMap) => {
  const { lat, lng, zoom } = props
  const [map, setMap] = useState<any>(null)
  const displayMap = useMemo(
    () => (
      <MapContainer
        style={{
          height: '100vh',
          width: '100vw'
        }}
        // @ts-ignore
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <MapHandler />
        <TileLayer
          // @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer >), [])
  return (
    <div>
      {displayMap}
      <MapPinIcon
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2000]'
        color='red'
        fill='white'
        size='16px'
      />
    </div>
  )
}

export default Map
