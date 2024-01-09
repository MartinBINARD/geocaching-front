/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Flag } from 'lucide-react';

import { storeCircuitQuiz } from '../../store/reducers/circuits';

import Loader from '../../components/Loader/Loader';
import CircuitPathStepperMap from '../../components/CircuitPathStepperMap/CircuitPathStepperMap';
import CircuitPathStepperQuestion from '../../components/CircuitPathStepperQuestion/CircuitPathStepperQuestion';
import CircuitPathStepperControl from '../../components/CircuitPathStepperControl/CircuitPathStepperControl';

function CircuitPath() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepContentIndex, setCurrentStepContentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const index = {
    currentStepIndex,
    setCurrentStepIndex,
    currentStepContentIndex,
    setCurrentStepContentIndex,
  };
  const hint = { showHint, setShowHint };
  const error = { invalidInput, setInvalidInput };

  const isLoading = useSelector((state) => state.circuits.isLoading);
  const circuit = useSelector((state) => state.circuits.oneCircuit);
  const circuitQuiz = useSelector((state) => state.circuits.circuitQuiz);

  const dispatch = useDispatch();

  useEffect(() => {
    if (circuit) {
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
