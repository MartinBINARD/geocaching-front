import { useState } from 'react';
import { MapPinned } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

import { Circuit } from '../../@types/circuit';

function CicuitLocationCard() {
  const [showMap, setShowMap] = useState<boolean>(false);

  const circuit = useAppSelector((state) => state.circuits.oneCircuit);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { parking_address } = circuit as Circuit;

  const handleClickMap = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <section className="flex items-center gap-5 lg:gap-10 p-2 px-4 border-t border-b border-primary m-auto lg:w-3/4 lg:justify-center">
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative w-4/5 h-4/5 bg-white">
            <button
              type="button"
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
              onClick={handleClickMap}
            >
              X
            </button>
            {/* TODO : Insert circuit map */}
          </div>
        </div>
      )}
    </>
  );
}

export default CicuitLocationCard;
