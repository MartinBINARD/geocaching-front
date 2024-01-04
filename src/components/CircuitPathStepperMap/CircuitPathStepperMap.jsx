import { useSelector } from 'react-redux';
import { Compass } from 'lucide-react';

import Map from '../Map/Map';

function CircuitPathMap({ currentStepIndex }) {
  const circuitQuiz = useSelector((state) => state.circuits.circuitQuiz);
  const stepPosition = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ];

  return (
    <section className="flex flex-col items-center">
      {circuitQuiz[currentStepIndex - 1]?.content[1].transition && (
        <p className="text-sm shadow-lg p-2 mt-2 mb-2">
          {circuitQuiz[currentStepIndex - 1]?.content[1].transition}
        </p>
      )}

      {stepPosition && (
        <Map
          oneMarker={stepPosition}
          zoom={17}
          className="w-full h-[500px] lg:w-[500px] lg:h-[500px] grow m-auto self-center rounded-lg"
        />
      )}
    </section>
  );
}

export default CircuitPathMap;
