import { AlertCircle } from 'lucide-react';
import { LatLngTuple } from 'leaflet';
import { useAppSelector } from '../../../../../../../hooks/redux';

import Map from '../../../../../../components/Map/Map';

interface CircuitPathMapProp {
  currentStepIndex: number;
}

function CircuitPathStepperMap({ currentStepIndex }: CircuitPathMapProp) {
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  const stepPosition = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ] as LatLngTuple;

  const hintToLocateStepPostion =
    circuitQuiz[currentStepIndex - 1]?.content[1].transition;

  return (
    <section className="flex flex-col items-center min-[375px]:min-h-[62vh] min-[400px]:min-h-[72vh]">
      {hintToLocateStepPostion && (
        <div className="w-full rounded-lg shadow-lg p-2 my-1">
          <AlertCircle className="float-left w-5 h-5 text-secondary mx-1" />
          <p className="text-sm">{hintToLocateStepPostion}</p>
        </div>
      )}

      {stepPosition?.length && (
        <Map
          oneMarker={stepPosition}
          zoom={17}
          className={`z-0 w-full h-[42vh] min-[400px]:h-[65vh] m-auto rounded-lg ${
            hintToLocateStepPostion ? '' : 'h-[62vh]'
          }`}
        />
      )}
    </section>
  );
}

export default CircuitPathStepperMap;
