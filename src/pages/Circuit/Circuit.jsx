/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import fetchCircuit from circuits' reducer
import { fetchCircuit } from '../../store/reducers/circuits';

// import components
import MapCircuit from '../../components/MapCircuit/MapCircuit';
import Loader from '../../components/Loader/Loader';

import logo from '../../assets/logo/compass.png';

function Circuit() {
  // state to listening if the user want to see the map
  const [showMap, setShowMap] = useState(false);

  // state to stock difficulty of the circuit and display the good icon
  const [starDifficulty, setStarDifficulty] = useState(null);

  // state to stock terrain level of the circuit and display the good icon
  const [starTerrain, setStarTerrain] = useState(null);

  /* state to know if the fetch API is already load. 
  Init it with false, fill it with noCircuit reducer state when we got the circuit
  The first goal is to prevent redirecting while we don't get API answer */
  const [alreadyLoad, setAlreadyLoad] = useState(false);

  // init dispatch
  const dispatch = useDispatch();

  // Getting the id with URL
  const { id } = useParams();
  // state to know if the call API is pending
  const loading = useSelector((state) => state.circuits.loading);
  // state to know if a circuit with this id exist
  const noCircuit = useSelector((state) => state.circuits.noCircuit);
  // state to know if there is a user (with user informations)
  const user = useSelector((state) => state.settings.user);
  // state to get the circuit call
  const circuit = useSelector((state) => state.circuits.oneCircuit);

  // useEffect hook to get the right circuit
  useEffect(() => {
    dispatch(fetchCircuit(id));
  }, [dispatch, id]);

  // useEffect hook to set the right star icon for difficulty and terrain
  // useEffect(() => {
  //   if (circuit) {
  //     switch (circuit.difficulty) {
  //       case 1:
  //         setStarDifficulty(starone);
  //         break;
  //       case 2:
  //         setStarDifficulty(startwo);
  //         break;
  //       case 3:
  //         setStarDifficulty(starthree);
  //         break;
  //       case 4:
  //         setStarDifficulty(starfour);
  //         break;
  //       case 5:
  //         setStarDifficulty(starfive);
  //         break;
  //       default:
  //         setStarDifficulty(starfive);
  //     }

  //     switch (circuit.terrain) {
  //       case 1:
  //         setStarTerrain(starone);
  //         break;
  //       case 2:
  //         setStarTerrain(startwo);
  //         break;
  //       case 3:
  //         setStarTerrain(starthree);
  //         break;
  //       case 4:
  //         setStarTerrain(starfour);
  //         break;
  //       case 5:
  //         setStarTerrain(starfive);
  //         break;
  //       default:
  //         setStarTerrain(starfive);
  //     }

  //     setAlreadyLoad(noCircuit);
  //   }
  // }, [circuit, noCircuit]);

  //  UseEffect hook to init local storage
  useEffect(() => {
    // Une fois que les données du circuit sont disponibles, stockez-les dans le localStorage
    if (circuit) {
      // Convertissez l'objet circuit en chaîne JSON
      const circuitJSON = JSON.stringify(circuit);

      // Stocking the JSON circuit with the name circuitData
      localStorage.setItem('circuitData', circuitJSON);
    }
  }, [circuit]);

  // function to listening click to show Map or not
  const handleClickMap = () => {
    setShowMap(!showMap);
  };

  if (loading) {
    return <Loader />;
  }

  if (!circuit && alreadyLoad) {
    return <Navigate to="/" />;
  }

  if (circuit) {
    return (
      <article className="lg:w-1/2 lg:m-auto p-4 flex flex-col gap-2">
        <img
          className="rounded-lg"
          src={circuit.url_image}
          alt={`circuit : ${circuit.name}`}
        />
        <section className="border-b border-primary m-auto">
          <p className="text-center m-auto pt-3">
            {circuit.region}, {circuit.state} - {circuit.city}
          </p>
          <p className="text-center font-bold m-auto pb-3 pt-1">
            {circuit.theme}
          </p>
        </section>
        <section className="flex justify-between item-center p-4 shadow-lg rounded-lg">
          <div className="flex flex-col gap-1">
            <img
              className="h-8"
              src={starDifficulty}
              alt={`niveau de difficulté : ${circuit.difficulty}/5`}
            />
            <p>Difficulté</p>
          </div>
          <div className="flex flex-col gap-1">
            <img
              className="h-8"
              src={starTerrain}
              alt={`niveau de terrain : ${circuit.terrain}/5`}
            />
            <p>Terrain</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="h-8 text-center text-base font-bold">
              {circuit.distance} km
            </p>
            <p>Distance</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="h-8 text-center text-base font-bold">
              {circuit.duration}
            </p>
            <p>Durée</p>
          </div>
        </section>
        <div className="flex flex-wrap justify-center items-center gap-3 m-auto mt-5 p-2">
          <div className="flex items-center gap-2">
            <img className="h-10" src={shoes} alt="icone de chaussure" />
            <p>Mobilité :</p>
          </div>
          <p>
            {circuit.mobility?.map((item, index) => (
              <span key={item}>
                {index === 0 && item}
                {index > 0 && item.toLowerCase()}
                {index < circuit.mobility.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
        <p className="p-2 m-auto">{circuit.introduction}</p>
        <div className="flex items-center gap-5 lg:gap-10 p-2 px-4 border-t border-b border-primary m-auto lg:w-3/4 lg:justify-center">
          <div className="flex flex-col">
            <p>Parking :</p>
            <p>{circuit.parking_address}</p>
          </div>
          <button
            className="flex flex-col text-sm"
            type="button"
            onClick={handleClickMap}
          >
            <img className="h-12" src={pins} alt="Pins koala" />
            Voir le plan
          </button>
        </div>
        {showMap && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative w-4/5 h-4/5 bg-white">
              <button
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600 focus:outline-none"
                onClick={handleClickMap}
              >
                X
              </button>
              <MapCircuit
                longitude={circuit.longitude}
                latitude={circuit.latitude}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        {user ? (
          <Link
            className="flex gap-2 items-center  mt-2 btn btn-primary text-white m-auto"
            to={`/circuit/${id}/map`}
          >
            <img className="h-10" src={logo} alt="Logo CacheTrek" /> Commencer
          </Link>
        ) : (
          <Link
            className="flex gap-2 items-center  mt-2 btn btn-primary text-white m-auto"
            to="/login"
          >
            Se connecter
          </Link>
        )}
      </article>
    );
  }
}

export default Circuit;
