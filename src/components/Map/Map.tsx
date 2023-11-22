import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import FindCenter from '../../utils/FindCenter';
import ButtonLocateMe from '../ButtonLocateMe/ButtonLocateMe';

import { Circuit } from '../../@types/circuit';

interface MapsProps {
  markers: Circuit[];
  className: string;
}

function Map({ markers, className }: MapsProps) {
  /* newData is created to handle loading spinner at the end of the function
     data is not reacheable outside of useEffect hook */

  /* The loader is displayed during the data loading
        So a default coordinate point center is created by default to allow it
        If data is sent, so a center point of between markers is calculated in order
        to make the markers visible to user */
  const centerCoordintates = FindCenter(markers);

  return (
    <MapContainer center={centerCoordintates} zoom={6} className={className}>
      <TileLayer
        attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id_circuit}
          position={[marker.latitude, marker.longitude]}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      <ButtonLocateMe />
    </MapContainer>
  );
}

export default Map;
