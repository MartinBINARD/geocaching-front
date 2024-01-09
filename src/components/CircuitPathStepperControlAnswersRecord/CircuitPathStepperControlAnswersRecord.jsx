import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertCircle, CheckCircle, Compass, XCircle } from 'lucide-react';

import { sendAnswers } from '../../store/reducers/circuits';

function CircuitPathAnswerRecord({
  currentStepIndex,
  currentStepContentIndex,
}) {
  const [congrats, setCongrats] = useState(false);

  const stepsEntries = useSelector((state) => state.circuits.stepsEntries);
  const userCircuitAnswersResult = useSelector(
    (state) => state.circuits.userCircuitAnswersResult
  );
  const user = useSelector((state) => state.settings.user);
  const circuit = useSelector((state) => state.circuits.oneCircuit);
  const circuitQuiz = useSelector((state) => state.circuits.circuitQuiz);

  const { id } = useParams();

  const dispatch = useDispatch();

  function isUserAnswsersReadyForCheck() {
    if (stepsEntries && circuitQuiz) {
      const userAnswsersArrayLength = Object.keys(stepsEntries).length;
      const conditions = [currentStepIndex + 1, circuitQuiz.length];

      if (currentStepContentIndex === 1) {
        return conditions.every(
          (condition) => condition === userAnswsersArrayLength
        );
      }
    }
    return false;
  }

  function handleClick() {
    const userId = user?.id;
    const circuitId = circuit?.id_circuit;
    const userCircuitEntries = { userId, circuitId, stepsEntries };
    dispatch(sendAnswers(userCircuitEntries));
  }

  function openModal() {
    document.getElementById('modal-answers-record').showModal();
  }

  useEffect(() => {
    if (userCircuitAnswersResult && userCircuitAnswersResult.includes(false)) {
      openModal();
    }
  }, [userCircuitAnswersResult]);

  if (congrats) {
    return <Navigate to={`/circuit/${id}/congrats`} />;
  }

  return (
    <>
      {isUserAnswsersReadyForCheck() && (
        <button
          type="button"
          onClick={handleClick}
          className="btn btn-primary max-w-xs max-[425px]:w-full max-[425px]:mx-auto"
        >
          <Compass className="w-7 h-7" />
          Vérifier mes réponses
        </button>
      )}

      {userCircuitAnswersResult?.length && (
        <dialog id="modal-answers-record" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Oups ! Tu as fait quelques erreurs d&apos;observation !
            </h3>
            <div className="py-4">
              <AlertCircle className="float-left w-6 h-6 text-secondary mr-2" />
              <p>
                Pas de panique, ferme cete fenêtre pour revenir en arrière et
                corriger tes réponses.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <tbody>
                  <tr>
                    {userCircuitAnswersResult.map((item, index) => (
                      <td
                        key={`${item}-${Math.random()}`}
                        className="font-semibold text-xl text-center border"
                      >
                        {index + 1}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {userCircuitAnswersResult.map((item) => (
                      <td key={`${item}-${Math.random()}`} className="border">
                        {item ? (
                          <CheckCircle className="w-6 h-6 text-success mx-auto my-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-error mx-auto my-1" />
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog" className="flex justify-between">
                <Link
                  type="submit"
                  role="button"
                  className="btn btn-outline mr-8 max-[375px]:w-32"
                  to="/circuits"
                >
                  Quitter le parcours
                </Link>

                <button type="submit" className="btn btn-primary">
                  Fermer
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default CircuitPathAnswerRecord;
