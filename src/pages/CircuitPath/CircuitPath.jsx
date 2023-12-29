/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Flag, ChevronRight, ChevronLeft } from 'lucide-react';

import Loader from '../../components/Loader/Loader';

import CircuitPathStepperMap from '../../components/CircuitPathStepperMap/CircuitPathStepperMap';
import CircuitPathStepperQuestion from '../../components/CircuitPathStepperQuestion/CircuitPathStepperQuestion';
import CircuitPathAnswerRecord from '../../components/CircuitPathAnswerRecord/CircuitPathAnswerRecord';

function CircuitPath() {
  // state to know the current step index of the user
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // state to stock all the users answers

  // state to know if the user is at the end of the circuit
  const [endCircuit, setEndCircuit] = useState(false);
  // state to show the error of the input
  const [showContent, setShowContent] = useState(false);
  // state to know if the user got all the rights answer and redirect they to the reward page
  const [congrats, setCongrats] = useState(false);
  // state to listening and show hint to the user
  const [showHint, setShowHint] = useState(false);

  // looking for the id set in the URL and redirect the user if the id of URL isnt the same than the circuit id
  const { id } = useParams();

  // state to know if we are in loading pending
  const isLoading = useSelector((state) => state.circuits.loading);
  // variable to get the circuit that is in local storage
  const localCircuit = JSON.parse(localStorage.getItem('circuitData'));
  // state to know if the user has already did this circuit
  const alreadyDid = useSelector((state) => state.circuits.alreadyDid);

  // If there's a next step, add to the currentStepIndex + 1
  const handleNextStep = () => {
    if (currentStepIndex < localCircuit.step.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowHint(false);
    }
  };

  // If there's a previous step, subract to the currentStepIndex - 1
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // if no circuit redirect they to the first page
  if (!localCircuit) {
    return <Navigate to={`/circuit/${id}`} />;
  }

  // if loading, display loader
  if (isLoading) {
    return <Loader />;
  }

  // if the id of the url and the id of the circuit are not the same, redirect to the first page
  if (localCircuit.id_circuit.toString() !== id) {
    return <Navigate to={`/circuit/${id}`} />;
  }

  // if the circuit is already did, clear the local storage
  if (alreadyDid) {
    localStorage.clear();

    return <Navigate to="/profile" />;
  }

  if (congrats) {
    return <Navigate to={`/circuit/${id}/congrats`} />;
  }

  return (
    <>
      <div className="flex justify-center gap-2 font-bold lg:text-xl w-full border-t border-b text-center border-primary py-2 my-2">
        <Flag />
        <h2>
          Étape {currentStepIndex + 1} sur {localCircuit.step.length}
        </h2>
      </div>
      {!showContent && (
        <CircuitPathStepperMap
          currentStepIndex={currentStepIndex}
          setShowContent={setShowContent}
          setEndCircuit={setEndCircuit}
        />
      )}
      {showContent && (
        <>
          <CircuitPathStepperQuestion
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            showHint={showHint}
            setShowHint={setShowHint}
            setShowContent={setShowContent}
            endCircuit={endCircuit}
            setEndCircuit={setEndCircuit}
          />
          {endCircuit && <CircuitPathAnswerRecord setCongrats={setCongrats} />}
        </>
      )}
      <section
        className={
          currentStepIndex === 0
            ? `flex flex-row-reverse w-full gap-10 justify-between text-sm my-5`
            : `flex w-full gap-10 justify-between text-sm my-5`
        }
      >
        {currentStepIndex > 0 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="btn btn-primary btn-outline"
            disabled={currentStepIndex === 0}
          >
            <ChevronLeft />
            Étape précédente
          </button>
        )}
        {currentStepIndex < localCircuit.step.length - 1 && (
          <button
            type="button"
            onClick={handleNextStep}
            className="btn btn-primary btn-outline"
            disabled={currentStepIndex === localCircuit.step.length - 1}
          >
            Étape suivante
            <ChevronRight />
          </button>
        )}
      </section>
    </>
  );
}

export default CircuitPath;
