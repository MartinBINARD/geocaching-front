import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updatePasswordThunk } from '../../../store/thunks';

import { UpdatePasswordRequest } from '../../../../core/adapters/requests';
import { formToObject } from '../../../utils/formToObject';

import Loader from '../../components/loader/Loader';
import PasswordInputsChecker from '../../components/PasswordInputsChecker/PasswordInputsChecker';

function UpdatePassword() {
  const dispatch = useAppDispatch();

  const isRegistered = useAppSelector((state) => state.auth.isRegistered);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const userIdInString = searchParams.get('user_id');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formObject = formToObject(form);
    const userId = parseInt(userIdInString as string, 10);

    const credentials = {
      ...formObject,
      token,
      user_id: userId,
    };

    dispatch(updatePasswordThunk(credentials as UpdatePasswordRequest));
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
        <PasswordInputsChecker className="input input-bordered w-full max-w-xs" />
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
