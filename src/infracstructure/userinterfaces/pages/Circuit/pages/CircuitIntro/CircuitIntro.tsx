import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';

import { FetchCircuitRequest } from '../../../../../../core/adapters/requests';

import {
  storeCircuitQuiz,
  resetCircuitQuiz,
} from '../../../../../../core/usecases';
import { fetchCircuitThunk } from '../../../../../store/thunks';

import Loader from '../../../../components/loader/Loader';
import CircuitDescriptionCard from './components/CircuitDescriptionCard/CircuitDescriptionCard';
import CicuitLocationCard from './components/CircuitLocationCard/CircuitLocationCard';

function CircuitIntro() {
  const { id } = useParams();
  const isLoading = useAppSelector((state) => state.circuits.isLoading);
  const user = useAppSelector((state) => state.auth.user);
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);

  const isFetchCircuitFailed = useAppSelector(
    (state) => state.circuits.isFetchCircuitFailed
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCircuitThunk(id as FetchCircuitRequest));
  }, [dispatch, id]);

  const handleClick = () => {
    dispatch(resetCircuitQuiz());
    if (circuit && circuit.step) {
      dispatch(storeCircuitQuiz(circuit.step));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isFetchCircuitFailed) {
    return <Navigate to="/circuits" />;
  }

  if (circuit) {
    return (
      <>
        <CircuitDescriptionCard />

        <CicuitLocationCard />

        {user?.id ? (
          <Link
            className="btn btn-primary text-white my-4 mx-auto"
            to={`/circuit/${id}/path`}
            onClick={handleClick}
          >
            <Compass className="w-7 h-7" /> Commencer
          </Link>
        ) : (
          <Link className="btn btn-primary text-white my-4 mx-auto" to="/login">
            Se connecter
          </Link>
        )}
      </>
    );
  }
}

export default CircuitIntro;
