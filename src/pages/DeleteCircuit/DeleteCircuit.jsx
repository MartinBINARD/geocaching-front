import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// import fetchCircuitsList from circuits' reducer to get all the circuits in the selector
import { fetchCircuitsList } from '../../store/reducers/circuits';
// import deleteCircuit from admin reducer to delete a circuit
import { deleteCircuit } from '../../store/reducers/admin';
// import Loader componant
import Loader from '../../components/Loader/Loader';

// import scss file
import './DeleteCircuit.scss';

function DeleteCircuit() {
  const user = useSelector((state) => state.settings.user);
  // init dispatch
  const dispatch = useDispatch();

  // state to know the circuit id selected
  const [circuit, setCircuit] = useState('0');
  // state to know if the "modal" is show
  const [showModal, setShowModal] = useState(false);
  // state to know if the circuit is delete
  const [suppressed, setSuppressed] = useState(false);

  // state from the reducer to know is the call API is pending
  const loading = useSelector((state) => state.circuits.loading);
  // state to get all the circuits available
  const circuitsList = useSelector((state) => state.circuits.circuitsList);

  // useEffect hook the get all the circuits
  useEffect(() => {
    dispatch(fetchCircuitsList());
  }, [dispatch]);

  // function to listening the circuit selected by the user and set his id to "circuit" state
  const handleChange = (event) => {
    setCircuit(event.target.value);
  };

  // variable that map all the circuits and put them to the option selector
  const allCircuits = circuitsList.map((item) => {
    return (
      <option key={uuidv4()} value={item.id_circuit}>
        {item.name}
      </option>
    );
  });

  // function to show the "modal"
  const handleClick = () => {
    setShowModal(true);
  };

  // function to delete a circuit
  const onDelete = () => {
    dispatch(deleteCircuit(circuit));
    setShowModal(false);
    setSuppressed(true);
  };

  // function to hide the "modal"
  const onCancel = () => {
    setShowModal(false);
  };

  // if loading, display the loader
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="deletecircuit">
        <section className="deletecircuit-container">
          <h1 className="deletecircuit-title">Supprimer</h1>
          <p>Veuillez choisir le parcours à supprimer :</p>
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
            <button
              className="deletecircuit-delete"
              type="button"
              onClick={handleClick}
            >
              Supprimer ce parcours
            </button>
          ) : null}
          {showModal && circuit > 0 ? (
            <div>
              <div>
                <p>Êtes-vous sûr de vouloir supprimer ce circuit ?</p>
                <button
                  className="deletecircuit-button"
                  type="button"
                  onClick={onDelete}
                >
                  Oui
                </button>
                <button
                  className="deletecircuit-button"
                  type="button"
                  onClick={onCancel}
                >
                  Non
                </button>
              </div>
            </div>
          ) : null}
          {suppressed ? <Navigate to="/admin" /> : null}
        </section>
      </div>
      {user?.role !== 'admin' && <Navigate to="/" />}
    </>
  );
}

export default DeleteCircuit;
