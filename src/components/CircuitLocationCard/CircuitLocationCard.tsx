/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { MapPinned, X } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

import { Circuit } from '../../@types/circuit';

import Map from '../Map/Map';

function CicuitLocationCard() {
  const [showMap, setShowMap] = useState<boolean>(false);

  const circuit = useAppSelector((state) => state.circuits.oneCircuit);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { parking_address, latitude, longitude } = circuit as Circuit;

  const handleClickMap = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    document.body.style.overflow = showMap ? 'hidden' : 'unset';
  }, [showMap]);

  return (
    <>
      <section className="flex items-center justify-between gap-5 lg:gap-10 p-2 border-t border-b border-primary">
        <div className="flex flex-col">
          <p>Parking :</p>
          <p>{parking_address}</p>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-primary flex flex-col items-center text-sm"
          onClick={handleClickMap}
        >
          <MapPinned className="w-8 h-8" />
          Voir le plan
        </button>
      </section>

      {showMap && (
        <section className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 lg:px-10">
          <button
            type="button"
            className="btn btn-circle btn-error bg-opacity-100 mb-4"
            onClick={handleClickMap}
          >
            <X />
          </button>

          <Map oneMarker={[latitude, longitude]} className="h-[70vh] w-full" />
        </section>
      )}
    </>
  );
}

export default CicuitLocationCard;
