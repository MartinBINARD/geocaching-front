import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { resetPassword } from '../../store/reducers/settings';

// import componants
import SettingsInput from '../../components/SettingsInput/SettingsInput';
import Loader from '../../components/Loader/Loader';

function ResetPassword() {
  // init dispatch
  const dispatch = useDispatch();

  // state from the reducer to know if the register is done
  const isRegistered = useSelector((state) => state.settings.isRegistered);
  // state to know if the API is pending
  const loading = useSelector((state) => state.settings.loading);

  // function and variable to get the token and the id in the url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const userId = searchParams.get('user_id');

  // function to get the formData and send it to the back servor
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // using dispatch to send formData to ask POST
    dispatch(resetPassword({ formData, token, userId }));
  };

  // if the API call is pending, display Loader componant
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col m-auto p-4">
      <section>
        <h2 className="font-bold my-5">
          Choissisez votre nouveau mot de passe
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <SettingsInput
            type="password"
            name="password"
            label="Nouveau mot de passe"
            placeholder="Renseignez votre nouveau mot de passe"
            required
          />
          <SettingsInput
            type="password"
            name="confirmation"
            label="Confirmer le mot de passe"
            placeholder="Confirmer votre nouveau mot de passe"
            required
          />
          <div className="card-actions justify-end py-2">
            <button type="submit" className="btn btn-primary">
              Valider
            </button>
          </div>
        </form>
        {isRegistered && <Navigate to="/login" />}
      </section>
    </div>
  );
}

export default ResetPassword;
