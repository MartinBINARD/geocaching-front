import { useDispatch, useSelector } from 'react-redux';

// Import askPassword from settings recuder
import { askPassword } from '../../store/reducers/settings';

// Components
import Loader from '../../components/Loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function AskNewPassword() {
  // Init dispatch
  const dispatch = useDispatch();

  // getting the state from settings' reducer to know if the call API is pending
  const loading = useSelector((state) => state.settings.loading);

  // Function to send email to askPassword and then verify if the email is in database
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Making the email to lower case before checking at database
    const emailInput = formData.get('email');
    const emailToLowerCase = emailInput.toLowerCase();
    formData.set('email', emailToLowerCase);

    // Using dispatch to send formData to ask POST
    dispatch(askPassword(formData));
    form.reset();
  };

  // if loading so we show the loader
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-5 justify-center p-5 items-center m-auto">
      <h3 className="font-bold text-xl">Réinitialisation du mot de passe</h3>
      <p className="lg:w-1/2 m-auto">
        Renseignez votre adresse email pour la réinitialisation de votre mot de
        passe et vous recevrez un email de confirmation.
      </p>
      <p className="lg:w-1/2 m-auto">
        Cliquez sur le lien reçu par email pour choisir un nouveau mot de passe
        !
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center"
      >
        <TextInput
          type="email"
          name="email"
          label="Adresse email"
          placeholder="Renseignez votre email"
          defaultValue=""
          className="input input-bordered w-full max-w-xs"
          required
        />
        <div className="self-end py-2">
          <button type="submit" className="btn btn-primary text-white">
            Envoyer
          </button>
        </div>
      </form>
    </section>
  );
}

export default AskNewPassword;
