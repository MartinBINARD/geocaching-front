/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import toast from toastify lib
import { toast } from 'react-toastify';
// import some icon from lucide lib
import { Flag, ChevronRight, ChevronLeft } from 'lucide-react';
// import componants
import MapCircuit from '../../components/MapCircuit/MapCircuit';
import Loader from '../../components/Loader/Loader';
// import JS file to animate the text
import animationManager from '../../utils/animationManager';
// import sendAnswers from circuits' reducer to send all the user's answer to the back servor
import { sendAnswers } from '../../store/reducers/circuits';

// import some icon & logo
import logo from '../../assets/logo/compass.png';

function CircuitPath() {
  // state to know the current step index of the user
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // state to stock all the users answers
  const [userAnswers, setUserAnswers] = useState(
    JSON.parse(localStorage.getItem('answers')) || {}
  );

  // state to know if the user is at the end of the circuit
  const [endCircuit, setEndCircuit] = useState(false);
  // state to show the error of the input
  const [inputError, setInputError] = useState(false);
  // state to listening if the user click to say that they are on the right location and show the paragraph and the question to they
  const [showContent, setShowContent] = useState(false);
  // state to listening if the user want to see the map
  const [showMap, setShowMap] = useState(false);
  // state to know if the user got all the rights answer and redirect they to the reward page
  const [congrats, setCongrats] = useState(false);
  // state to know if the user got some bad answer and show they which are wrong
  const [wrongMessages, setWrongMessages] = useState([]);
  // state that will be set with an object of koala's picture depend of the circuit's theme
  const [picture, setPicture] = useState({});
  // state to listening and show hint to the user
  const [showHint, setShowHint] = useState(false);

  // init dispatch
  const dispatch = useDispatch();
  // looking for the id set in the URL and redirect the user if the id of URL isnt the same than the circuit id
  const { id } = useParams();

  // state to get all user infos
  const user = useSelector((state) => state.settings.user);
  // state to know if we are in loading pending
  const loading = useSelector((state) => state.circuits.loading);
  // state to know all the good and wrong answer send by the API response
  const checkAnswer = useSelector((state) => state.circuits.answers);
  // variable to get the circuit that is in local storage
  const localCircuit = JSON.parse(localStorage.getItem('circuitData'));
  // state to know if the user has already did this circuit
  const alreadyDid = useSelector((state) => state.circuits.alreadyDid);

  // useEffect hook to set user answers in the local storage
  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  // function to transform all the answer on a correct object to send at the API
  const transformAnswer = () => {
    const arrayAnswers = [];
    let answerObject = {};

    for (const [key, value] of Object.entries(userAnswers)) {
      const id_step = localCircuit.step[key].id;
      const answer = parseInt(value, 10);

      arrayAnswers.push({
        id_step,
        answer,
      });
    }

    const id_user = parseInt(user.id, 10);
    const id_circuit = parseInt(id, 10);
    if (arrayAnswers.length === localCircuit.step.length) {
      answerObject = {
        id_user,
        id_circuit,
        steps: arrayAnswers,
      };
      dispatch(sendAnswers(answerObject));
    } else {
      // toasting if the user forgot some questions
      toast('Répondez à toutes questions !');
    }

    return answerObject;
  };

  // useEffect hook to checkAnswer and show the user the wrong answer or setCongrats to true
  useEffect(() => {
    if (checkAnswer) {
      const incorrectAnswers = checkAnswer
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
  }, [checkAnswer]);

  // function that show hint to the user
  const handleClickHint = () => {
    setShowHint(!showHint);
  };

  // If there's a next step, add to the currentStepIndex + 1
  const handleNextStep = () => {
    if (currentStepIndex < localCircuit.step.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowHint(false);
    }
  };

  // function to get validate answer and continue the circuit
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
    // looking for the last step and set endCircuit to true
    if (currentStepIndex === parseInt(localCircuit.step.length - 1, 10)) {
      setEndCircuit(true);
    }
  };

  // If there's a previous step, subract to the currentStepIndex - 1
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // function that hide the map and show the paragraph/question's step
  const handleShowContent = () => {
    setShowContent(true);
    if (currentStepIndex === parseInt(localCircuit.step.length - 1, 10)) {
      setEndCircuit(true);
    }
  };

  // function to show the map at the paragraph/question "side"
  const handleClickMap = () => {
    setShowMap(!showMap);
  };

  // useEffect hook to managing koala's picture depend of the circuit theme
  // useEffect(() => {
  //   const prehistory = {
  //     happy: prehappy,
  //     sad: presad,
  //     talk: pretalk,
  //     think: prethink,
  //   };
  //   const neutral = {
  //     happy: neuhappy,
  //     sad: neusad,
  //     talk: neutalk,
  //     think: neuthink,
  //   };
  //   const curiosity = {
  //     happy: cuhappy,
  //     sad: cusad,
  //     talk: cutalk,
  //     think: cuthink,
  //   };

  //   if (localCircuit.theme === 'Préhistoire') {
  //     setPicture(prehistory);
  //   } else if (localCircuit.theme === 'Curiosités') {
  //     setPicture(curiosity);
  //   } else {
  //     setPicture(neutral);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect hook to use the animate text function
  useEffect(() => {
    if (showContent) {
      animationManager.animateText();
    } else if (!showContent) {
      animationManager.animateText();
    }
  }, [showContent]);

  // if no circuit redirect they to the first page
  if (!localCircuit) {
    return <Navigate to={`/circuit/${id}`} />;
  }

  // if loading, display loader
  if (loading) {
    return <Loader />;
  }

  // if the id of the url and the id of the circuit are not the same, redirect to the first page
  if (localCircuit.id_circuit.toString() !== id) {
    return <Navigate to={`/circuit/${id}`} />;
  }

  // if the circuit is already did, clear the local storage
  if (alreadyDid) {
    localStorage.clear();
  }

  return (
    <>
      <div className="flex justify-center gap-2 font-bold lg:text-xl w-full border-t border-b text-center border-primary py-2 my-2">
        <Flag fill="#004f4a" />
        <h2>
          Étape {currentStepIndex + 1} sur {localCircuit.step.length}
        </h2>
      </div>
      {!showContent && (
        <>
          {localCircuit.step[currentStepIndex - 1]?.transition ? (
            <p className="p-2 text-sm shadow-lg mt-2 mb-2 animate-text">
              {localCircuit.step[currentStepIndex - 1].transition}
            </p>
          ) : null}

          <MapCircuit
            longitude={localCircuit.step[currentStepIndex].longitude}
            latitude={localCircuit.step[currentStepIndex].latitude}
            className="w-full h-[500px] lg:w-[500px] lg:h-[500px] grow m-auto self-center rounded-lg"
          />
          <button
            className="flex gap-2 justify-center items-center btn btn-primary normal-case text-lg font-medium text-white mt-5"
            type="button"
            onClick={handleShowContent}
          >
            <img className="h-10" src={logo} alt="Logo CacheTrek" />
            J&apos;y suis
          </button>
        </>
      )}
      {showContent && (
        <>
          {showMap && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-40">
              <div className="relative w-4/5 h-4/5 bg-white">
                <button
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600 focus:outline-none"
                  onClick={handleClickMap}
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

          {currentStepIndex % 2 && !endCircuit ? (
            <img className="w-3/4" src={picture.talk} alt="koala qui parle" />
          ) : null}
          {currentStepIndex % 2 === 0 && !endCircuit ? (
            <img className="w-3/4" src={picture.think} alt="koala qui pense" />
          ) : null}
          {endCircuit && !wrongMessages.length ? (
            <img className="w-3/4" src={picture.happy} alt="koala content" />
          ) : null}
          {endCircuit && wrongMessages.length ? (
            <img className="w-3/4" src={picture.sad} alt="koala triste" />
          ) : null}

          <p className="m-auto p-3 text-sm lg:text-base animate-text leading-6">
            {localCircuit.step[currentStepIndex].paragraph}
          </p>
          <button
            className="btn btn-primary btn-sm normal-case font-medium text-white mb-10"
            type="button"
            onClick={handleClickMap}
          >
            Voir la carte
          </button>
          <div className="relative p-2">
            <div className="flex flex-col items-center border-3 border-secondary py-4">
              {/* <img
                className="h-12 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
                src={question}
                alt="icon de question"
              /> */}
              <div className="flex flex-col p-4 gap-4">
                <p className="font-bold">
                  {localCircuit.step[currentStepIndex].question}
                </p>
                {localCircuit.step[currentStepIndex].hint ? (
                  <button className="text-sm" onClick={handleClickHint}>
                    Indice ?
                  </button>
                ) : null}
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
              {inputError && (
                <span className="text-red-500">Champ obligatoire</span>
              )}
              <div className="flex">
                {endCircuit ? null : (
                  <button
                    className="flex gap-2 btn btn-primary normal-case text-xl font-medium text-white"
                    onClick={() => handleNext()}
                  >
                    {' '}
                    <img className="h-10" src={logo} alt="Logo caching'o" />
                    Valider
                  </button>
                )}
              </div>
            </div>
          </div>
          {endCircuit && (
            <>
              <button
                className="m-2 flex gap-2 bg-primary rounded-lg text-white items-center px-4 py-2"
                onClick={transformAnswer}
              >
                <img className="h-10" src={logo} alt="logo CacheTrek" />
                {!wrongMessages ? 'Clique ici' : 'Vérifier mes réponses'}
              </button>
              {checkAnswer && checkAnswer.includes(false) ? (
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
                        {checkAnswer.map((item, index) => (
                          <td
                            key={`${item}-${Math.random()}`}
                            className="border px-4 py-2 text-center font-semibold text-xl"
                          >
                            {index + 1}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {checkAnswer.map((item, index) => (
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
              ) : null}
            </>
          )}
        </>
      )}
      <div className="flex w-full gap-10 mt-5 mb-5 justify-between text-sm">
        <div>
          {currentStepIndex !== 0 ? (
            <button
              onClick={handlePrevStep}
              className="flex items-center hover:-translate-x-1 transition ease-in-out duration-300"
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft />
              Étape précédente
            </button>
          ) : null}
        </div>
        <div>
          {currentStepIndex === localCircuit.step.length - 1 ? null : (
            <button
              onClick={handleNextStep}
              className="flex items-center hover:translate-x-1 transition ease-in-out duration-300"
              disabled={currentStepIndex === localCircuit.step.length - 1}
            >
              Étape suivante
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
      {congrats ? <Navigate to={`/circuit/${id}/congrats`} /> : null}
      {alreadyDid ? <Navigate to="/profile" /> : null}
    </>
  );
}

export default CircuitPath;
