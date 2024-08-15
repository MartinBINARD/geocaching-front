import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import marker from '../../assets/images/marker.png';

import { CircuitsList } from '../../../../core/domain/entities';
import FindMapCenter from '../../../utils/FindMapCenter';

import ButtonLocateMe from './components/ButtonLocateMe/ButtonLocateMe';
import MapPopup from './components/MapPopup/MapPopup';

interface MapsProps {
  markersList?: CircuitsList;
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
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32],
  });

  return (
    <MapContainer
      center={centerMap}
      zoom={zoom}
      className={className}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
      {oneMarker?.length && <Marker position={oneMarker} icon={customIcon} />}

      {markersList?.length &&
        markersList.map((marker) => (
          <Marker
            key={marker.id_circuit}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
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
