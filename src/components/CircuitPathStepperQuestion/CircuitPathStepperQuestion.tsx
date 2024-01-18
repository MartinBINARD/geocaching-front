import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { LatLngTuple } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { storeStepEntries } from '../../store/reducers/circuits';

import CircuitMapToggle from '../CircuitMapToggle/CircuitMapToggle';
import CircuitPathQuestionHint from '../CircuitPathQuestionHint/CircuitPathQuestionHint';

interface CircuitPathQuestionProps {
  currentStepIndex: number;
  hint: {
    showHint: boolean;
    setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  };

  error: {
    invalidInput: boolean;
    setInvalidInput: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

function CircuitPathQuestion({
  currentStepIndex,
  hint,
  error,
}: CircuitPathQuestionProps) {
  const { invalidInput, setInvalidInput } = error;
  const stepsEntries = useAppSelector((state) => state.circuits.stepsEntries);

  const [userEntries, setUserEntries] = useState(stepsEntries || {});
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  const oneMarker = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ] as LatLngTuple;

  const dispatch = useAppDispatch();

  function warnInvalidInput(value: string) {
    if (value.length === 0) {
      setInvalidInput(true);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    warnInvalidInput(e.target.value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newObjectEntries = {
      ...userEntries,
      [currentStepIndex]: e.target.value,
    };

    setUserEntries(newObjectEntries);
    warnInvalidInput(e.target.value);

    if (e.target.value.length > 0) {
      setInvalidInput(false);
      dispatch(storeStepEntries(newObjectEntries));
    }
  }

  return (
    <section className="flex flex-col md:py-10 md:gap-10 min-[375px]:min-h-[62vh] min-[400px]:min-h-[72vh]">
      <p className="text-sm p-3 lg:text-base md:text-lg xl:text-xl md:leading-relaxed">
        {circuitQuiz[currentStepIndex]?.content[0].paragraph}
      </p>

      <CircuitMapToggle
        oneMarker={oneMarker}
        zoom={17}
        className="btn btn-primary btn-outline normal-case font-medium text-white mt-2 mb-8 mx-auto"
      />

      <div className="relative flex flex-1 flex-col gap-4 items-center justify-evenly border-3 border-secondary p-5 mx-1">
        <HelpCircle className="absolute top-[-20px] self-center w-10 h-10 text-secondary bg-white" />
        <p className="font-bold text-sm my-2 lg:text-base md:text-lg xl:text-xl">
          {circuitQuiz[currentStepIndex]?.content[0].question}
        </p>

        <CircuitPathQuestionHint
          currentStepIndex={currentStepIndex}
          hint={hint}
        />

        <div>
          <input
            className={`input input-bordered w-44 self-center ${
              invalidInput ? 'input-error' : 'input-primary'
            }`}
            id="answerInput"
            type="number"
            placeholder="Votre réponse"
            min="0"
            value={userEntries[currentStepIndex] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {invalidInput && (
          <span className="self-center font-bold text-error text-sm sm:text-base">
            Veuillez répondre à la question
          </span>
        )}
      </div>
    </section>
  );
}

export default CircuitPathQuestion;
