import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Compass, MapPinned } from 'lucide-react';

import { fetchCircuit } from '../../store/reducers/circuits';

// import MapCircuit from '../../components/MapCircuit/MapCircuit';
import Loader from '../../components/Loader/Loader';
import CircuitDescriptionCard from '../../components/CircuitDescriptionCard/CircuitDescriptionCard';

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

  useEffect(() => {
    dispatch(fetchCircuit(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (circuit) {
      setAlreadyLoad(noCircuit);
    }
  }, [circuit, noCircuit]);

  useEffect(() => {
    if (circuit) {
      const circuitJSON = JSON.stringify(circuit);

      localStorage.setItem('circuitData', circuitJSON);
    }
  }, [circuit]);

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
      <main className="lg:w-1/2 lg:m-auto p-4 flex flex-col gap-2">
        <CircuitDescriptionCard />

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
      </main>
    );
  }
}

export default Circuit;
