import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchCircuit } from '../../store/reducers/circuits';

import Loader from '../../components/Loader/Loader';
import CircuitDescriptionCard from '../../components/CircuitDescriptionCard/CircuitDescriptionCard';
import CicuitLocationCard from '../../components/CircuitLocationCard/CircuitLocationCard';

function CircuitIntro() {
  const [alreadyLoad, setAlreadyLoad] = useState(false);

  const { id } = useParams<Record<string, string | undefined>>();
  const loading = useAppSelector((state) => state.circuits.loading);
  const noCircuit = useAppSelector((state) => state.circuits.noCircuit);
  const user = useAppSelector((state) => state.settings.user);
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);
  console.log('circuit', circuit);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCircuit(id as string));
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
      <>
        <CircuitDescriptionCard />

        <CicuitLocationCard />

        {user ? (
          <Link
            className="flex gap-2 items-center  mt-2 btn btn-primary text-white m-auto"
            to={`/circuit/${id}/path`}
          >
            <Compass className="w-7 h-7" /> Commencer
          </Link>
        ) : (
          <Link
            className="flex gap-2 items-center  mt-2 btn btn-primary text-white m-auto"
            to="/login"
          >
            Se connecter
          </Link>
        )}
      </>
    );
  }
}

export default CircuitIntro;
