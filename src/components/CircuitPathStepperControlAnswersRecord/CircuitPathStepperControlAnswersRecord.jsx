import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { toast } from 'react-toastify';

import { sendAnswers } from '../../store/reducers/circuits';

function CircuitPathAnswerRecord({
  currentStepIndex,
  currentStepContentIndex,
}) {
  const [congrats, setCongrats] = useState(false);

  const circuit = useSelector((state) => state.circuits.oneCircuit);
  const userCircuitAnswersEntries = useSelector(
    (state) => state.circuits.userCircuitAnswersEntries
  );
  const userCircuitAnswersResult = useSelector(
    (state) => state.circuits.userCircuitAnswersResult
  );
  const user = useSelector((state) => state.settings.user);
  const circuitQuiz = useSelector((state) => state.circuits.circuitQuiz);

  const { id } = useParams();

  const dispatch = useDispatch();

  function isUserAnswsersReadyForCheck() {
    if (userCircuitAnswersEntries && circuitQuiz) {
      const userAnswsersArrayLength = Object.keys(
        userCircuitAnswersEntries
      ).length;
      const conditions = [currentStepIndex + 1, circuitQuiz.length];

      if (currentStepContentIndex === 1) {
        return conditions.every(
          (condition) => condition === userAnswsersArrayLength
        );
      }
    }
    return false;
  }

  useEffect(() => {
    if (userCircuitAnswersResult) {
      const incorrectAnswers = userCircuitAnswersResult
        .map((reponse, index) => ({ index, reponse }))
        .filter((item) => item.reponse === false);

      if (incorrectAnswers.length === 0) {
        setCongrats(true);
      }
    }
  }, [userCircuitAnswersResult, setCongrats]);

  const transformAnswer = () => {
    const arrayAnswers = [];
    let answerObject = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(userCircuitAnswersEntries)) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const id_step = circuit.step[key].id;
      const answer = parseInt(value, 10);

      arrayAnswers.push({
        id_step,
        answer,
      });
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const id_user = parseInt(user.id, 10);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const id_circuit = parseInt(id, 10);
    if (arrayAnswers.length === circuit.step.length) {
      answerObject = {
        id_user,
        id_circuit,
        steps: arrayAnswers,
      };
      dispatch(sendAnswers(answerObject));
    }

    return answerObject;
  };

  if (congrats) {
    return <Navigate to={`/circuit/${id}/congrats`} />;
  }

  return (
    <>
      {isUserAnswsersReadyForCheck() && (
        <button
          type="button"
          onClick={transformAnswer}
          className="btn btn-primary max-w-xs max-[425px]:w-full max-[425px]:mx-auto"
        >
          <Compass className="w-7 h-7" />
          Vérifier mes réponses
        </button>
      )}

      {userCircuitAnswersResult && userCircuitAnswersResult.includes(false) && (
        <dialog className="flex flex-col items-center">
          <p className="mt-2 mb-2 text-center">
            Arg ! Vous avez fait quelques erreurs d&apos;observation !
          </p>
          <p className="text-sm mb-2">
            Pas de panique, revenez en arrière et corrigez vos réponses
          </p>
          <table className="table-auto">
            <tbody>
              <tr>
                {userCircuitAnswersResult.map((item, index) => (
                  <td
                    key={`${item}-${Math.random()}`}
                    className="border font-semibold text-xl px-4 py-2 text-center"
                  >
                    {index + 1}
                  </td>
                ))}
              </tr>
              <tr>
                {userCircuitAnswersResult.map((item) => (
                  <td
                    key={`${item}-${Math.random()}`}
                    className="border px-4 py-2"
                  >
                    {item ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </dialog>
      )}
    </>
  );
}

export default CircuitPathAnswerRecord;
