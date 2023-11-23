import { useState } from 'react';
import { LatLngLiteral } from 'leaflet';
import { Circle, Marker, Popup, useMapEvents } from 'react-leaflet';

import { LocateFixed } from 'lucide-react';

import LeafletControl from '../LeafletControl/LeafletControl';

function ButtonLocateMe() {
  const zoom = 15;
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
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            map.locate();
          }}
        >
          <LocateFixed />
        </button>
      </LeafletControl>

      {position === null ? null : (
        <Marker position={position} title="Vous êtes ici" alt="votre position">
          <Popup>Vous êtes ici</Popup>
          <Circle
            center={{
              lat: position.lat,
              lng: position.lng,
            }}
            radius={150}
            color="red"
            opacity={0.1}
          />
        </Marker>
      )}
    </>
  );
}

export default ButtonLocateMe;
