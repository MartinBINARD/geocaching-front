import { LatLngTuple } from 'leaflet';
import { CircuitsList } from '../../core/domain/entities';

export default function FindMapCenter(markers: CircuitsList): LatLngTuple {
  const lats = markers.map((m) => m.latitude);
  const lngs = markers.map((m) => m.longitude);

  return [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
  ];
}
