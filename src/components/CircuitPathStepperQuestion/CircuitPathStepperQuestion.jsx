import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { storeUserCircuitAnswers } from '../../store/reducers/circuits';

import CircuitMapToggle from '../CircuitMapToggle/CircuitMapToggle';

function CircuitPathQuestion({ currentStepIndex, hint, error }) {
  const { showHint, setShowHint } = hint;
  const { invalidInput, setInvalidInput } = error;
  const userCircuitAnswersEntries = useSelector(
    (state) => state.circuits.userCircuitAnswersEntries
  );
  const [userAnswers, setUserAnswers] = useState(
    userCircuitAnswersEntries || {}
  );
  const circuitQuiz = useSelector((state) => state.circuits.circuitQuiz);

  const oneMarker = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ];
  const dispatch = useDispatch();

  function handleClickHint() {
    setShowHint(!showHint);
  }

  function warnInvalidInput(value) {
    if (value.length === 0) {
      setInvalidInput(true);
    }
  }

  function handleBlur(e) {
    warnInvalidInput(e.target.value);
  }

  function handleChange(e) {
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

      {oneMarker && <CircuitMapToggle oneMarker={oneMarker} zoom={17} />}

      <div className="flex flex-col items-center border-3 border-secondary py-4">
        <div className="flex flex-col p-4 gap-4">
          <p className="font-bold">
            {circuitQuiz[currentStepIndex]?.content[0].question}
          </p>

          {circuitQuiz[currentStepIndex].hint && (
            <button type="button" onClick={handleClickHint} className="text-sm">
              Indice ?
            </button>
          )}
          {showHint && (
            <p className="text-sm text-justify">
              {circuitQuiz[currentStepIndex].hint}
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
