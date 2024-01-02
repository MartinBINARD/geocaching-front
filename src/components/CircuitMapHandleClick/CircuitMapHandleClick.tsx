/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { MapPinned, X } from 'lucide-react';

import Map from '../Map/Map';

interface CircuitMapHandleClickProps {
  oneMarker: LatLngTuple;
  zoom: number;
}

function CircuitMapHandleClick({
  oneMarker,
  zoom,
}: CircuitMapHandleClickProps) {
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleClickMap = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    document.body.style.overflow = showMap ? 'hidden' : 'unset';
  }, [showMap]);

  return (
    <>
      {showMap && (
        <section className="z-50 fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 lg:px-10">
          <button
            type="button"
            className="btn btn-circle btn-error bg-opacity-100 mb-4"
            onClick={handleClickMap}
          >
            <X />
          </button>

          <Map oneMarker={oneMarker} zoom={zoom} className="h-[70vh] w-full" />
        </section>
      )}

      <button
        type="button"
        onClick={handleClickMap}
        className="btn btn-primary btn-outline normal-case font-medium text-white my-4"
      >
        <MapPinned className="w-8 h-8" />
        Voir sur la carte
      </button>
    </>
  );
}

export default CircuitMapHandleClick;
