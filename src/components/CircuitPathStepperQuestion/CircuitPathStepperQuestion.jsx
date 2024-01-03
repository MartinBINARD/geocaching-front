import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

import CircuitMapToggle from '../CircuitMapToggle/CircuitMapToggle';
import { storeUserCircuitAnswers } from '../../store/reducers/circuits';

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
  const [userAnswers, setUserAnswers] = useState({});
  const circuit = useSelector((state) => state.circuits.oneCircuit);
  const oneMarker = [
    circuit.step[currentStepIndex].latitude,
    circuit.step[currentStepIndex].longitude,
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeUserCircuitAnswers(userAnswers));
  }, [userAnswers, dispatch]);

  const handleClickHint = () => {
    setShowHint(!showHint);
  };

  const handleChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentStepIndex]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStepIndex < circuit.step.length - 1) {
      if (!document.getElementById('answerInput').value) {
        setInputError(true);
      } else {
        setCurrentStepIndex(currentStepIndex + 1);
        setShowHint(false);
        setShowContent(false);
        setInputError(false);
      }
    }

    if (currentStepIndex === parseInt(circuit.step.length - 1, 10)) {
      setEndCircuit(true);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <p className="p-3 text-sm lg:text-base">
        {circuit.step[currentStepIndex].paragraph}
      </p>

      <CircuitMapToggle oneMarker={oneMarker} zoom={17} />

      <div className="flex flex-col items-center border-3 border-secondary py-4">
        <div className="flex flex-col p-4 gap-4">
          <p className="font-bold">{circuit.step[currentStepIndex].question}</p>
          {circuit.step[currentStepIndex].hint && (
            <button type="button" onClick={handleClickHint} className="text-sm">
              Indice ?
            </button>
          )}
          {showHint && (
            <p className="text-sm text-justify">
              {circuit.step[currentStepIndex].hint}
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
