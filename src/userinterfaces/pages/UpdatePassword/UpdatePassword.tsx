import { useLocation, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updatePassword } from '../../../domain/usecases/auth';

import {
  UpdateCredentials,
  UpdatePasswordForm,
} from '../../../domain/entities/auth';

import Loader from '../../components/loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function UpdatePassword() {
  const dispatch = useAppDispatch();

  const isRegistered = useAppSelector((state) => state.auth.isRegistered);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const userId = searchParams.get('user_id');

  const handleSubmit = (e: React.FormEvent<UpdatePasswordForm>): void => {
    e.preventDefault();
    const form = e.target as UpdatePasswordForm;
    const credentials = { form, token, userId } as UpdateCredentials;
    dispatch(updatePassword(credentials));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isRegistered) {
    <Navigate to="/login" />;
  }

  return (
    <section className="flex flex-col m-auto p-4">
      <h2 className="font-bold my-5">Choissisez votre nouveau mot de passe</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextInput
          type="password"
          name="password"
          label="Nouveau mot de passe"
          placeholder="Renseignez votre nouveau mot de passe"
          defaultValue=""
          className="input input-bordered w-full max-w-xs"
          required
        />
        <TextInput
          type="password"
          name="confirmation"
          label="Confirmer le mot de passe"
          placeholder="Confirmer votre nouveau mot de passe"
          defaultValue=""
          className="input input-bordered w-full max-w-xs"
          required
        />
        <div className="self-end py-2">
          <button type="submit" className="btn btn-primary">
            Valider
          </button>
        </div>
      </form>
    </section>
  );
}

export default UpdatePassword;
