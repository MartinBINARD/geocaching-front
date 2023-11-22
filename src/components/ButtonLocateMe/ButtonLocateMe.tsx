import { useState } from 'react';
import { LatLngLiteral } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import { MapPin } from 'lucide-react';

import LeafletControl from '../LeafletControl/LeafletControl';

function ButtonLocateMe() {
  const zoom = 18;
  const second = 2;
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const map = useMapEvents({
    locationfound(e) {
      // create user marker
      setPosition(e.latlng);
      map.flyTo(e.latlng, zoom, { duration: second });
      setIsLoading(false);
    },
  });

  return (
    <>
      <LeafletControl position="topright">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            map.locate();
          }}
        >
          <MapPin />
        </button>
      </LeafletControl>

      {position === null ? null : (
        <Marker position={position}>
          <Popup>Vous êtes ici</Popup>
        </Marker>
      )}
    </>
  );
}

export default ButtonLocateMe;
