import { useDispatch, useSelector } from 'react-redux';

import { askPassword } from '../../store/reducers/settings';

import Loader from '../../components/Loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function AskNewPassword() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.settings.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const emailInput = formData.get('email');
    const emailToLowerCase = emailInput.toLowerCase();
    formData.set('email', emailToLowerCase);

    dispatch(askPassword(formData));
    form.reset();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col start-center m-auto p-4">
      <h2 className="font-bold my-5">Réinitialisation du mot de passe</h2>
      <p className="w-full max-w-xs my-5">
        Renseignez votre adresse email pour recevoir le lien de réinitialisation
        de mots de passe par email.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
