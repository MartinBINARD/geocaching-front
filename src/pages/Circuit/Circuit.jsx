import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Brain,
  Compass,
  DraftingCompass,
  Footprints,
  Hourglass,
  MapPinned,
  MountainSnow,
} from 'lucide-react';

import { fetchCircuit } from '../../store/reducers/circuits';

// import MapCircuit from '../../components/MapCircuit/MapCircuit';
import Loader from '../../components/Loader/Loader';

function Circuit() {
  const [showMap, setShowMap] = useState(false);

  /* state to know if the fetch API is already load. 
  Init it with false, fill it with noCircuit reducer state when we got the circuit
  The first goal is to prevent redirecting while we don't get API answer */
  const [alreadyLoad, setAlreadyLoad] = useState(false);

  const { id } = useParams();
  const loading = useSelector((state) => state.circuits.loading);
  const noCircuit = useSelector((state) => state.circuits.noCircuit);
  const user = useSelector((state) => state.settings.user);
  const circuit = useSelector((state) => state.circuits.oneCircuit);

  const dispatch = useDispatch();

  // useEffect hook to get the right circuit
  useEffect(() => {
    dispatch(fetchCircuit(id));
  }, [dispatch, id]);

  // useEffect hook to set the right star icon for difficulty and terrain
  useEffect(() => {
    if (circuit) {
      setAlreadyLoad(noCircuit);
    }
  }, [circuit, noCircuit]);

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
          <div className="flex flex-col items-center gap-1">
            <Brain
              className="w-8 h-8 text-secondary"
              alt="niveau de difficulté intellectuelle"
            />
            <p>
              Difficulté :
              <span className="font-bold ml-1">{circuit.difficulty}/5</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MountainSnow
              className="w-8 h-8 text-secondary"
              alt="niveau de difficulté intellectuelle"
            />
            <p>
              Terrain :
              <span className="font-bold ml-1">{circuit.terrain}/5</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <DraftingCompass
              className="w-8 h-8 text-secondary"
              alt="distance kilométrique"
            />
            <p>
              Distance :
              <span className="font-bold ml-1">{circuit.distance} km</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Hourglass
              className="w-8 h-8 text-secondary"
              alt="estimation de la durée"
            />
            <p>
              Durée :<span className="font-bold ml-1">{circuit.duration}</span>
            </p>
          </div>
        </section>

        <section className="flex flex-wrap justify-center items-center gap-3 m-auto mt-5 p-2">
          <div className="flex items-center gap-2">
            <Footprints
              className="w-24 h-24 text-secondary"
              alt="icone de chaussure"
            />
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
        </section>

        <p className="p-2 m-auto">{circuit.introduction}</p>

        <section className="flex items-center gap-5 lg:gap-10 p-2 px-4 border-t border-b border-primary m-auto lg:w-3/4 lg:justify-center">
          <div className="flex flex-col">
            <p>Parking :</p>
            <p>{circuit.parking_address}</p>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-primary flex flex-col items-center text-sm"
            onClick={handleClickMap}
          >
            <MapPinned
              className="w-8 h-8"
              alt="position du circuit sur la carte"
            />
            Voir le plan
          </button>
        </section>

        {showMap && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative w-4/5 h-4/5 bg-white">
              <button
                type="button"
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
                onClick={handleClickMap}
              >
                X
              </button>
              {/* <MapCircuit
                longitude={circuit.longitude}
                latitude={circuit.latitude}
                className="w-full h-full"
              /> */}
            </div>
          </div>
        )}

        {user ? (
          <Link
            className="flex gap-2 items-center  mt-2 btn btn-primary text-white m-auto"
            to={`/circuit/${id}/map`}
          >
            <Compass className="w-7 h-7" alt="Logo CacheTrek" /> Commencer
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
