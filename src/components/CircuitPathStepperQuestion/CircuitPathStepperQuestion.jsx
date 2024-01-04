import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import CircuitMapToggle from '../CircuitMapToggle/CircuitMapToggle';
import { storeUserCircuitAnswers } from '../../store/reducers/circuits';

function CircuitPathQuestion({ currentStepIndex, showHint, setShowHint }) {
  const [inputError, setInputError] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const circuitQuiz = useSelector((state) => state.circuits.circuitQuiz);

  const oneMarker = [
    circuitQuiz[currentStepIndex]?.latitude,
    circuitQuiz[currentStepIndex]?.longitude,
  ];
  const dispatch = useDispatch();

  const handleClickHint = () => {
    setShowHint(!showHint);
  };

  const handleChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentStepIndex]: e.target.value,
    });
    const payload = { [currentStepIndex]: e.target.value };
    dispatch(storeUserCircuitAnswers(payload));
  };

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
            className="p-2 w-44 bg-blue self-center border border-primary"
            id="answerInput"
            type="number"
            placeholder="Votre réponse"
            value={userAnswers[currentStepIndex] || ''}
            onChange={handleChange}
            required
          />
        </div>
        {inputError && <span className="text-red-500">Champ obligatoire</span>}
      </div>
    </section>
  );
}

export default CircuitPathQuestion;
