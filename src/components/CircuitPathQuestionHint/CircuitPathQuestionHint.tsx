import { useAppSelector } from '../../hooks/redux';

interface CircuitPathQuestionHintProps {
  currentStepIndex: number;
  hint: {
    showHint: boolean;
    setShowHint: (showHint: boolean) => boolean;
  };
}

function CircuitPathQuestionHint({
  currentStepIndex,
  hint,
}: CircuitPathQuestionHintProps) {
  const { showHint, setShowHint } = hint;
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  function handleClickHint() {
    setShowHint(!showHint);
  }

  return (
    <>
      {circuitQuiz[currentStepIndex].content[0].hint && (
        <button
          type="button"
          onClick={handleClickHint}
          className="btn btn-sm btn-outline btn-secondary max-w-xs mx-auto"
        >
          {showHint ? 'Cacher' : 'Voir'} l&apos;indice
        </button>
      )}
      {showHint && (
        <p className="text-secondary text-sm self-center">
          {circuitQuiz[currentStepIndex].content[0].hint}
        </p>
      )}
    </>
  );
}

export default CircuitPathQuestionHint;
