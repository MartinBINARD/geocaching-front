import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchCircuit } from '../../store/reducers/circuits';

import Loader from '../../components/Loader/Loader';
import CircuitDescriptionCard from '../../components/CircuitDescriptionCard/CircuitDescriptionCard';
import CicuitLocationCard from '../../components/CircuitLocationCard/CircuitLocationCard';

function CircuitIntro() {
  const { id } = useParams<Record<string, string | undefined>>();
  const isLoading = useAppSelector((state) => state.circuits.isLoading);
  const user = useAppSelector((state) => state.settings.user);
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCircuit(id as string));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!circuit) {
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
