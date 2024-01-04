/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Flag } from 'lucide-react';

import { storeCircuitQuiz } from '../../store/reducers/circuits';

import Loader from '../../components/Loader/Loader';
import CircuitPathStepperMap from '../../components/CircuitPathStepperMap/CircuitPathStepperMap';
import CircuitPathStepperQuestion from '../../components/CircuitPathStepperQuestion/CircuitPathStepperQuestion';
import CircuitPathAnswerRecord from '../../components/CircuitPathAnswerRecord/CircuitPathAnswerRecord';
import CircuitPathStepperControl from '../../components/CircuitPathStepperControl/CircuitPathStepperControl';

function CircuitPath() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepContentIndex, setCurrentStepContentIndex] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false);

  const [endCircuit, setEndCircuit] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { id } = useParams();
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

  if (congrats) {
    return <Navigate to={`/circuit/${id}/congrats`} />;
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
        <>
          <CircuitPathStepperQuestion
            currentStepIndex={currentStepIndex}
            showHint={showHint}
            setShowHint={setShowHint}
            invalidInput={invalidInput}
            setInvalidInput={setInvalidInput}
          />
          {endCircuit && <CircuitPathAnswerRecord setCongrats={setCongrats} />}
        </>
      ) : (
        <CircuitPathStepperMap currentStepIndex={currentStepIndex} />
      )}

      <CircuitPathStepperControl
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
        currentStepContentIndex={currentStepContentIndex}
        setCurrentStepContentIndex={setCurrentStepContentIndex}
        setShowHint={setShowHint}
        invalidInput={invalidInput}
        setInvalidInput={setInvalidInput}
      />
    </>
  );
}

export default CircuitPath;
