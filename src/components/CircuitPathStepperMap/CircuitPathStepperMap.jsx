import { Compass } from 'lucide-react';

import MapCircuit from '../MapCircuit/MapCircuit';

function CircuitPathMap({ currentStepIndex, setShowContent, setEndCircuit }) {
  const localCircuit = JSON.parse(localStorage.getItem('circuitData'));

  const handleShowContent = () => {
    setShowContent(true);
    if (currentStepIndex === parseInt(localCircuit.step.length - 1, 10)) {
      setEndCircuit(true);
    }
  };

  return (
    <section className="flex flex-col items-center">
      {localCircuit.step[currentStepIndex - 1]?.transition && (
        <p className="text-sm shadow-lg p-2 mt-2 mb-2">
          {localCircuit.step[currentStepIndex - 1].transition}
        </p>
      )}

      <MapCircuit
        longitude={localCircuit.step[currentStepIndex].longitude}
        latitude={localCircuit.step[currentStepIndex].latitude}
        className="w-full h-[500px] lg:w-[500px] lg:h-[500px] grow m-auto self-center rounded-lg"
      />
      <button
        className="flex gap-2 justify-center items-center btn btn-primary normal-case text-lg font-medium text-white mt-5"
        type="button"
        onClick={handleShowContent}
      >
        <Compass className="w-7 h-7" />
        J&apos;y suis
      </button>
    </section>
  );
}

export default CircuitPathMap;
