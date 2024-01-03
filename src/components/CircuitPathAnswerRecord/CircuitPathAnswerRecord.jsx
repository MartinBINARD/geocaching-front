import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { toast } from 'react-toastify';

import { sendAnswers } from '../../store/reducers/circuits';

function CircuitPathAnswerRecord(setCongrats) {
  const [wrongMessages, setWrongMessages] = useState([]);
  const circuit = useSelector((state) => state.circuits.oneCircuit);

  const userCircuitAnswerEntries = useSelector(
    (state) => state.circuits.userCircuitAnswerEntries
  );
  const userCircuitAnswersResult = useSelector(
    (state) => state.circuits.userCircuitAnswersResult
  );
  const user = useSelector((state) => state.settings.user);

  // looking for the id set in the URL and redirect the user if the id of URL isnt the same than the circuit id
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userCircuitAnswersResult) {
      const incorrectAnswers = userCircuitAnswersResult
        .map((reponse, index) => ({ index, reponse }))
        .filter((item) => item.reponse === false);

      if (incorrectAnswers.length === 0) {
        setCongrats(true);
        setWrongMessages([]);
      } else {
        const wrongMessagesList = incorrectAnswers.map(
          (item) => `L'étape ${item.index + 1}`
        );
        setWrongMessages(wrongMessagesList);
      }
    }
  }, [userCircuitAnswersResult, setCongrats]);

  const transformAnswer = () => {
    const arrayAnswers = [];
    let answerObject = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(userCircuitAnswerEntries)) {
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
    } else {
      toast('Répondez à toutes questions !');
    }

    return answerObject;
  };

  return (
    <section className="flex flex-col items-center">
      <button
        type="button"
        onClick={transformAnswer}
        className="flex items-center gap-2 bg-primary rounded-lg text-white px-4 py-2 my-2 mx-auto"
      >
        <Compass className="w-7 h-7" />
        {!wrongMessages ? 'Clique ici' : 'Vérifier mes réponses'}
      </button>
      {userCircuitAnswersResult && userCircuitAnswersResult.includes(false) && (
        <>
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
        </>
      )}
    </section>
  );
}

export default CircuitPathAnswerRecord;
