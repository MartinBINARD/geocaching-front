import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Circuit } from '../../../../core/domain/entities/circuit';
import FindMapCenter from '../../../utils/FindMapCenter';

import ButtonLocateMe from './components/ButtonLocateMe/ButtonLocateMe';
import MapPopup from './components/MapPopup/MapPopup';

interface MapsProps {
  markersList?: Circuit[];
  oneMarker?: LatLngTuple;
  zoom: number;
  className: string;
}

export default function Map({
  markersList,
  oneMarker,
  zoom,
  className,
}: MapsProps) {
  const centerMap = markersList ? FindMapCenter(markersList) : oneMarker;

  return (
    <MapContainer
      center={centerMap}
      zoom={zoom}
      className={className}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
      {oneMarker?.length && <Marker position={oneMarker} />}

      {markersList?.length &&
        markersList.map((marker) => (
          <Marker
            key={marker.id_circuit}
            position={[marker.latitude, marker.longitude]}
            title={marker.name}
            alt={marker.name}
          >
            <MapPopup marker={marker} />
          </Marker>
        ))}
      <ButtonLocateMe />
    </MapContainer>
  );
}
