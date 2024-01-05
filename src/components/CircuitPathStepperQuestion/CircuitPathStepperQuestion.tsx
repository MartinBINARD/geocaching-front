import { useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { storeUserCircuitAnswers } from '../../store/reducers/circuits';

import CircuitMapToggle from '../CircuitMapToggle/CircuitMapToggle';

interface CircuitPathQuestionProps {
  currentStepIndex: number;
  hint: {
    showHint: boolean;
    setShowHint: (showHint: boolean) => boolean;
  };

  error: {
    invalidInput: boolean;
    setInvalidInput: (invalidInput: boolean) => boolean;
  };
}

function CircuitPathQuestion({
  currentStepIndex,
  hint,
  error,
}: CircuitPathQuestionProps) {
  const { showHint, setShowHint } = hint;
  const { invalidInput, setInvalidInput } = error;
  const userCircuitAnswersEntries = useAppSelector(
    (state) => state.circuits.userCircuitAnswersEntries
  );
  const [userAnswers, setUserAnswers] = useState(
    userCircuitAnswersEntries || {}
  );
  const circuitQuiz = useAppSelector((state) => state.circuits.circuitQuiz);

  const oneMarker = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ] as LatLngTuple;
  const dispatch = useAppDispatch();

  function handleClickHint() {
    setShowHint(!showHint);
  }

  function warnInvalidInput(value: string) {
    if (value.length === 0) {
      setInvalidInput(true);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    warnInvalidInput(e.target.value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newObjectAnswsers = {
      ...userAnswers,
      [currentStepIndex]: e.target.value,
    };

    setUserAnswers(newObjectAnswsers);
    warnInvalidInput(e.target.value);

    if (e.target.value.length > 0) {
      setInvalidInput(false);
      dispatch(storeUserCircuitAnswers(newObjectAnswsers));
    }
  }

  return (
    <section className="flex flex-col items-center">
      <p className="p-3 text-sm lg:text-base">
        {circuitQuiz[currentStepIndex]?.content[0].paragraph}
      </p>

      <CircuitMapToggle oneMarker={oneMarker} zoom={17} />

      <div className="flex flex-col items-center border-3 border-secondary py-4">
        <div className="flex flex-col p-4 gap-4">
          <p className="font-bold">
            {circuitQuiz[currentStepIndex]?.content[0].question}
          </p>

          {circuitQuiz[currentStepIndex].content[0].hint && (
            <button type="button" onClick={handleClickHint} className="text-sm">
              Indice ?
            </button>
          )}
          {showHint && (
            <p className="text-sm text-justify">
              {circuitQuiz[currentStepIndex].content[0].hint}
            </p>
          )}

          <input
            className={`input input-bordered w-44 self-center ${
              invalidInput ? 'input-error' : 'input-primary'
            }`}
            id="answerInput"
            type="number"
            placeholder="Votre réponse"
            min="0"
            value={userAnswers[currentStepIndex] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {invalidInput && (
          <span className="font-bold text-error">
            Veuillez répondre à la question
          </span>
        )}
      </div>
    </section>
  );
}

export default CircuitPathQuestion;
