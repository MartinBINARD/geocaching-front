import { AlertCircle } from 'lucide-react';
import { LatLngTuple } from 'leaflet';
import { useAppSelector } from '../../hooks/redux';

import Map from '../Map/Map';

interface CircuitPathMapProp {
  currentStepIndex: number;
}

function CircuitPathMap({ currentStepIndex }: CircuitPathMapProp) {
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  const stepPosition = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ] as LatLngTuple;

  return (
    <section className="flex flex-col items-center">
      {circuitQuiz[currentStepIndex - 1]?.content[1].transition && (
        <div>
          <AlertCircle className="float-left w-5 h-5 text-secondary mt-2 mx-1" />
          <p className="text-sm shadow-lg p-1 m-1">
            {circuitQuiz[currentStepIndex - 1]?.content[1].transition}
          </p>
        </div>
      )}

      {stepPosition?.length && (
        <Map
          oneMarker={stepPosition}
          zoom={17}
          className="z-0 w-full h-[42vh] min-[400px]:h-[65vh] m-auto rounded-lg"
        />
      )}
    </section>
  );
}

export default CircuitPathMap;
