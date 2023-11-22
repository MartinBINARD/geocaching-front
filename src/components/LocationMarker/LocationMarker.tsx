import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 17, { animate: true });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup autoPan>Vous êtes ici</Popup>
    </Marker>
  );
}

export default LocationMarker;
