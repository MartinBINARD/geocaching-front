import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

import { fetchCircuit } from '../../store/reducers/circuits';

// import MapCircuit from '../../components/MapCircuit/MapCircuit';
import Loader from '../../components/Loader/Loader';
import CircuitDescriptionCard from '../../components/CircuitDescriptionCard/CircuitDescriptionCard';
import CicuitLocationCard from '../../components/CircuitLocationCard/CircuitLocationCard';

function Circuit() {
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

        <CicuitLocationCard />

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
