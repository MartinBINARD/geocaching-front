import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCircuitsList } from '../../store/reducers/circuits';
import Loader from '../../loader/Loader';

import './PatchCircuits.scss';

function PatchCircuit() {
  const user = useSelector((state) => state.settings.user);

  const dispatch = useDispatch();

  const [circuit, setCircuit] = useState('0');
  const loading = useSelector((state) => state.circuits.loading);
  const circuitsList = useSelector((state) => state.circuits.circuitsList);
  console.log(circuitsList);

  useEffect(() => {
    dispatch(fetchCircuitsList());
  }, [dispatch]);

  const handleChange = (event) => {
    setCircuit(event.target.value);
  };

  const allCircuits = circuitsList.map((item) => {
    return (
      <option key={uuidv4()} value={item.id_circuit}>
        {item.name}
      </option>
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="patchcircuits">
        <section className="patchcircuits-container">
          <h1 className="patchcircuits-title">Modifier un circuit</h1>
          <p>Veuillez choisir le parcours à modifier :</p>
          <select
            name="circuits"
            id="circuits"
            value={circuit}
            onChange={handleChange}
          >
            <option key={uuidv4()} value="0">
              Choix du circuit
            </option>
            {allCircuits}
          </select>
          {circuit !== '0' ? (
            <Link
              className="patchcircuits-button"
              to={`/admin/patch/${circuit}`}
            >
              Modifier ce parcours
            </Link>
          ) : null}
        </section>
      </div>
      {user?.role !== 'admin' && <Navigate to="/" />}
    </>
  );
}

export default PatchCircuit;
