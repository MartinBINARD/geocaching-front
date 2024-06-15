import { LatLngTuple } from 'leaflet';
import { Circuit } from '../../entities/circuit';

function FindCenter(markers: Circuit[]): LatLngTuple {
  const lats = markers.map((m) => m.latitude);
  const lngs = markers.map((m) => m.longitude);

  return [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
  ];
}

export default FindCenter;
