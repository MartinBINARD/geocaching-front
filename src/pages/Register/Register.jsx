import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Footer from '../../components/Footer/Footer';
import SettingsInput from '../../components/SettingsInput/SettingsInput';
import Loader from '../../components/Loader/Loader';

// Getting register call API from settings reducer
import { register } from '../../store/reducers/settings';

import logo from '../../assets/logo/compass.png';

function Register() {
  // Initialization of dispatch
  const dispatch = useDispatch();

  // State to know if the user is registered
  const isRegistered = useSelector((state) => state.settings.isRegistered);
  // Display error to user
  const registerError = useSelector((state) => state.settings.registerError);
  // State to know if register is pending
  const loading = useSelector((state) => state.settings.loading);

  // Funtion to get all form data elements and push them to reducer (and then call API)
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    dispatch(register(formData));
  };

  // When register is pending
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <article className="flex flex-col-reverse gap-20 lg:flex-row-reverse lg:w-3/4 justify-center items-center p-4 m-auto">
        <section className="lg:w-1/3 lg:p-8 lg:shadow-lg flex flex-col items-center">
          <h2 className="font-bold my-4">Passeport d&apos;inscription</h2>
          {!isRegistered && (
            <h4 className="text-red-500 font-semibold">{registerError}</h4>
          )}
          <form
            className="flex flex-col gap-1 max-w-xs"
            onSubmit={handleSubmit}
          >
            <SettingsInput
              name="pseudo"
              type="text"
              label="Pseudo"
              placeholder="Renseignez votre pseudo"
            />
            <SettingsInput
              name="email"
              type="email"
              label="Email"
              placeholder="Renseignez votre email ici"
            />
            <SettingsInput
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Renseignez votre mot de passe"
            />
            <SettingsInput
              name="confirmation"
              type="password"
              label="Confirmation du mot de passe"
              placeholder="Renseignez de nouveau votre mot de passe"
            />
            <div className="flex justify-center lg:justify-end py-2">
              <button
                type="submit"
                className="flex btn gap-2 items-center btn-primary text-white mt-2 text-base normal-case"
              >
                <img className="h-10" src={logo} alt="logo CacheTrek" />
                Inscription
              </button>
            </div>
          </form>
          <Link
            className="btn normal-case m-auto mt-5 text-sm self-start border border-primary bg-white rounded-lg p-2"
            to="/login"
          >
            Déjà inscrit ?
          </Link>
        </section>
        <section className="flex flex-col gap-4 lg:w-1/3">
          {/* <img className="w-1/3 self-center" src={icon} alt="icon passeport" /> */}
          <h2 className="font-bold text-xl mt-2 py-2 border-b border-primary w-3/4">
            Rejoins la communauté Caching&apos;O !
          </h2>
          <p>
            Tu es un explorateur novice ou expérimenté ? Pars à l’aventure et
            découvre le monde qui t’entoure !
          </p>
          <p>
            Renseigne ton pseudo et ton email puis valide ton passeport
            Caching&apos;O grâce à l&apos;email de confirmation !
          </p>
        </section>
      </article>
      <Footer />
    </>
  );
}

export default Register;
