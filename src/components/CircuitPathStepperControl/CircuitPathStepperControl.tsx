import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

interface CircuitPathStepperControlProps {
  index: {
    currentStepIndex: number;
    setCurrentStepIndex: (currentStepIndex: number) => number;
    currentStepContentIndex: number;
    setCurrentStepContentIndex: (currentStepContentIndex: number) => number;
  };
  error: {
    invalidInput: boolean;
    setInvalidInput: (invalidInput: boolean) => boolean;
  };
  setShowHint: (showHint: boolean) => boolean;
}

function CircuitPathStepperControl({
  index,
  setShowHint,
  error,
}: CircuitPathStepperControlProps) {
  const {
    currentStepIndex,
    setCurrentStepIndex,
    currentStepContentIndex,
    setCurrentStepContentIndex,
  } = index;
  const { invalidInput, setInvalidInput } = error;
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);
  const userCircuitAnswersEntries = useAppSelector(
    (state) => state.circuits.userCircuitAnswersEntries
  );

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
      setInvalidInput(false);
    }
  }

  function decrementStepIndex() {
    if (currentStepIndex > 0 && currentStepContentIndex === 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setCurrentStepContentIndex(1);
      setShowHint(false);
    }
  }

  function handlePreviousStep() {
    decrementStepContentIndex();
    decrementStepIndex();
  }

  function handleFirstPartNextStep() {
    if (currentStepContentIndex === 0) {
      incrementStepContentIndex();
      incrementStepIndex();
    }
  }

  function handleSecondPartNextStep() {
    if (currentStepContentIndex === 1) {
      if (
        !userCircuitAnswersEntries ||
        !userCircuitAnswersEntries[currentStepIndex]
      ) {
        setInvalidInput(true);
      }

      if (
        userCircuitAnswersEntries &&
        userCircuitAnswersEntries[currentStepIndex]
      ) {
        setInvalidInput(false);
        incrementStepContentIndex();
        incrementStepIndex();
      }
    }
  }

  function handleNextStep() {
    handleFirstPartNextStep();
    handleSecondPartNextStep();
  }

  return (
    <section
      className={`flex flex-wrap-reverse w-full px-1 my-2 ${
        currentStepIndex + currentStepContentIndex === 0
          ? 'flex-row-reverse justify-center'
          : 'justify-between'
      }`}
    >
      {currentStepIndex + currentStepContentIndex > 0 && (
        <button
          type="button"
          onClick={handlePreviousStep}
          className="btn btn-primary btn-outline max-w-xs max-[425px]:w-full max-[425px]:mx-auto max-[425px]:mt-3"
        >
          <ChevronLeft />
          Étape précédente
        </button>
      )}
      {currentStepIndex + currentStepContentIndex < circuitQuiz.length && (
        <button
          type="button"
          onClick={handleNextStep}
          className="btn btn-primary max-w-xs max-[425px]:w-full max-[425px]:mx-auto"
          disabled={invalidInput}
        >
          {currentStepContentIndex === 0 ? 'Je suis arrivé' : 'Étape suivante'}
          <ChevronRight />
        </button>
      )}
    </section>
  );
}

export default CircuitPathStepperControl;
