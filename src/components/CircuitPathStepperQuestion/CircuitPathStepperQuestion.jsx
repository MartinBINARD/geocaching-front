import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

import MapCircuit from '../../components/MapCircuit/MapCircuit';

function CircuitPathQuestion({
  currentStepIndex,
  setCurrentStepIndex,
  showHint,
  setShowHint,
  setShowContent,
  endCircuit,
  setEndCircuit,
}) {
  const [showMap, setShowMap] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [userAnswers, setUserAnswers] = useState(
    JSON.parse(localStorage.getItem('answers')) || {}
  );
  const localCircuit = JSON.parse(localStorage.getItem('circuitData'));

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  const handleClickMap = () => {
    setShowMap(!showMap);
  };

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
      {showMap && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-40">
          <div className="relative w-4/5 h-4/5 bg-white">
            <button
              type="button"
              onClick={handleClickMap}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600 focus:outline-none"
            >
              X
            </button>
            <MapCircuit
              longitude={localCircuit.step[currentStepIndex].longitude}
              latitude={localCircuit.step[currentStepIndex].latitude}
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      <p className="p-3 text-sm lg:text-base">
        {localCircuit.step[currentStepIndex].paragraph}
      </p>

      <button
        type="button"
        onClick={handleClickMap}
        className="btn btn-primary btn-outline normal-case font-medium text-white my-4"
      >
        Voir la carte
      </button>

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
