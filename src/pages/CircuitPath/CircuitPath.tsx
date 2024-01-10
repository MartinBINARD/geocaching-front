import { useEffect, useState } from 'react';
import { Flag } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { storeCircuitQuiz } from '../../store/reducers/circuits';

import Loader from '../../loader/Loader';
import CircuitPathStepperMap from '../../components/CircuitPathStepperMap/CircuitPathStepperMap';
import CircuitPathStepperQuestion from '../../components/CircuitPathStepperQuestion/CircuitPathStepperQuestion';
import CircuitPathStepperControl from '../../components/CircuitPathStepperControl/CircuitPathStepperControl';

function CircuitPath() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [currentStepContentIndex, setCurrentStepContentIndex] =
    useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const index = {
    currentStepIndex,
    setCurrentStepIndex,
    currentStepContentIndex,
    setCurrentStepContentIndex,
  };
  const hint = { showHint, setShowHint };
  const error = { invalidInput, setInvalidInput };

  const isLoading = useAppSelector((state) => state.circuits.isLoading);
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (circuit?.step) {
      dispatch(storeCircuitQuiz(circuit.step));
    }
  }, [circuit, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <title className="flex justify-center gap-2 font-bold lg:text-xl w-full border-t border-b text-center border-primary py-2 my-2">
        <Flag />
        <h2>
          Étape {currentStepIndex + 1} sur {circuitQuiz.length}
        </h2>
      </title>

      {currentStepContentIndex === 1 ? (
        <CircuitPathStepperQuestion
          currentStepIndex={currentStepIndex}
          hint={hint}
          error={error}
        />
      ) : (
        <CircuitPathStepperMap currentStepIndex={currentStepIndex} />
      )}

      <CircuitPathStepperControl
        index={index}
        setShowHint={setShowHint}
        error={error}
      />
    </>
  );
}

export default CircuitPath;
