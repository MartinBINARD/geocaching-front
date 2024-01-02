import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

import CircuitMapHandleClick from '../CircuitMapHandleClick/CircuitMapHandleClick';

function CircuitPathQuestion({
  currentStepIndex,
  setCurrentStepIndex,
  showHint,
  setShowHint,
  setShowContent,
  endCircuit,
  setEndCircuit,
}) {
  const [inputError, setInputError] = useState(false);
  const [userAnswers, setUserAnswers] = useState(
    JSON.parse(localStorage.getItem('answers')) || {}
  );
  const localCircuit = JSON.parse(localStorage.getItem('circuitData'));
  const oneMarker = [
    localCircuit.step[currentStepIndex].latitude,
    localCircuit.step[currentStepIndex].longitude,
  ];

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  const handleClickHint = () => {
    setShowHint(!showHint);
  };

  const handleNext = () => {
    if (currentStepIndex < localCircuit.step.length - 1) {
      if (!document.getElementById('answerInput').value) {
        setInputError(true);
      } else {
        setCurrentStepIndex(currentStepIndex + 1);
        setShowHint(false);
        setShowContent(false);
        setInputError(false);
      }
    }

    if (currentStepIndex === parseInt(localCircuit.step.length - 1, 10)) {
      setEndCircuit(true);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <p className="p-3 text-sm lg:text-base">
        {localCircuit.step[currentStepIndex].paragraph}
      </p>

      <CircuitMapHandleClick oneMarker={oneMarker} />

      <div className="flex flex-col items-center border-3 border-secondary py-4">
        <div className="flex flex-col p-4 gap-4">
          <p className="font-bold">
            {localCircuit.step[currentStepIndex].question}
          </p>
          {localCircuit.step[currentStepIndex].hint && (
            <button type="button" onClick={handleClickHint} className="text-sm">
              Indice ?
            </button>
          )}
          {showHint && (
            <p className="text-sm text-justify">
              {localCircuit.step[currentStepIndex].hint}
            </p>
          )}
          <input
            className="p-2 w-44 bg-blue self-center border border-primary"
            id="answerInput"
            type="number"
            placeholder="Votre réponse"
            value={userAnswers[currentStepIndex] || ''}
            onChange={(e) =>
              setUserAnswers({
                ...userAnswers,
                [currentStepIndex]: e.target.value,
              })
            }
            required
          />
        </div>
        {inputError && <span className="text-red-500">Champ obligatoire</span>}
        {!endCircuit && (
          <button
            type="button"
            onClick={() => handleNext()}
            className="btn btn-primary normal-case text-xl font-medium text-white"
          >
            <Compass className="w-7 h-7" />
            Valider
          </button>
        )}
      </div>
    </section>
  );
}

export default CircuitPathQuestion;
