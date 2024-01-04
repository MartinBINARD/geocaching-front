import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

interface CircuitPathStepperControlProps {
  currentStepIndex: number;
  setCurrentStepIndex: (currentStepIndex: number) => number;
  currentStepContentIndex: number;
  setCurrentStepContentIndex: (currentStepContentIndex: number) => number;
  setShowHint: (arg: boolean) => boolean;
}

function CircuitPathStepperControl({
  currentStepIndex,
  setCurrentStepIndex,
  currentStepContentIndex,
  setCurrentStepContentIndex,
  setShowHint,
}: CircuitPathStepperControlProps) {
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  function incrementStepContentIndex() {
    if (currentStepContentIndex < 1) {
      setCurrentStepContentIndex(currentStepContentIndex + 1);
    }
  }

  function incrementStepIndex() {
    if (
      currentStepIndex < circuitQuiz.length - 1 &&
      currentStepContentIndex === 1
    ) {
      setCurrentStepIndex(currentStepIndex + 1);
      setCurrentStepContentIndex(0);
      setShowHint(false);
    }
  }

  function decrementStepContentIndex() {
    if (currentStepContentIndex > 0) {
      setCurrentStepContentIndex(currentStepContentIndex - 1);
    }
  }

  function decrementStepIndex() {
    if (currentStepIndex > 0 && currentStepContentIndex === 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setCurrentStepContentIndex(1);
      setShowHint(false);
    }
  }

  function handleNextStep() {
    incrementStepContentIndex();
    incrementStepIndex();
  }

  function handlePreviousStep() {
    decrementStepContentIndex();
    decrementStepIndex();
  }

  return (
    <section
      className={
        currentStepIndex + currentStepContentIndex === 0
          ? `flex flex-row-reverse w-full gap-10 justify-between text-sm my-5`
          : `flex w-full gap-10 justify-between text-sm my-5`
      }
    >
      {currentStepIndex + currentStepContentIndex > 0 && (
        <button
          type="button"
          onClick={handlePreviousStep}
          className="btn btn-primary btn-outline"
        >
          <ChevronLeft />
          Étape précédente
        </button>
      )}
      {currentStepIndex + currentStepContentIndex < circuitQuiz.length && (
        <button
          type="button"
          onClick={handleNextStep}
          className="btn btn-primary"
        >
          {currentStepContentIndex === 0 ? 'Je suis arrivé' : 'Étape suivante'}
          <ChevronRight />
        </button>
      )}
    </section>
  );
}

export default CircuitPathStepperControl;
