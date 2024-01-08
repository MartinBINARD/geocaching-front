import { AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

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
        <div>
          <AlertCircle className="float-left w-5 h-5 text-secondary mt-2 mx-1" />
          <p className="text-sm shadow-lg p-1 m-1">
            {circuitQuiz[currentStepIndex - 1]?.content[1].transition}
          </p>
        </div>
      )}

      {stepPosition && (
        <Map
          oneMarker={stepPosition}
          zoom={17}
          className="w-full h-[42vh] min-[400px]:h-[65vh] m-auto rounded-lg"
        />
      )}
    </section>
  );
}

export default CircuitPathMap;
