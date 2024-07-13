import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ForgotPasswordRequest } from '../../../../core/adapters/requests';

import { formToObject } from '../../../utils/formatLoginForm';
import { forgotPasswordThunk } from '../../../store/thunks';

import Loader from '../../components/loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function ForgotPassword() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formObject = formToObject(form);

    dispatch(
      forgotPasswordThunk(formObject as unknown as ForgotPasswordRequest)
    );
    form.reset();
  };

  if (isLoading) {
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

export default ForgotPassword;
