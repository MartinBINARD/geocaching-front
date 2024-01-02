import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import FindCenter from '../../utils/FindCenter';
import ButtonLocateMe from '../ButtonLocateMe/ButtonLocateMe';

import { Circuit } from '../../@types/circuit';
import MapPopup from '../MapPopup/MapPopup';

interface MapsProps {
  markersList?: Circuit[];
  oneMarker?: LatLngTuple;
  zoom: number;
  className: string;
}

function Map({ markersList, oneMarker, zoom, className }: MapsProps) {
  const centerMap = markersList ? FindCenter(markersList) : oneMarker;

  return (
    <MapContainer
      center={centerMap}
      zoom={zoom}
      className={className}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
      {oneMarker && <Marker position={oneMarker} />}

      {markersList &&
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

Map.defaultProps = {
  oneMarker: null,
  markersList: null,
};

export default Map;
