import { Compass, MountainSnow } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { LoginRequest } from '../../../../core/adapters/requests';

import { loginThunk } from '../../../store/thunks';
import { formToObject } from '../../../utils/formToObject';

import Footer from '../../components/Footer/Footer';
import Loader from '../../components/loader/Loader';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import TextInput from '../../components/TextInput/TextInput';

function Login() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const loginErrorMessage = useAppSelector(
    (state) => state.auth.loginErrorMessage
  );
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formObject = formToObject(form);

    dispatch(loginThunk(formObject as unknown as LoginRequest));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (user && typeof user.id === 'number') {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-5 p-4 m-auto lg:flex-row ">
        <MountainSnow className="w-12 h-12 lg:w-44 lg:h-44 m-2 lg:m-20" />
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start lg:border-l lg:border-primary lg:pl-20">
          <h2 className="font-bold text-xl text-center my-2 sm:my-5 lg:text-4xl">
            Connexion
          </h2>
          {loginErrorMessage && (
            <h4 className="text-red-500 font-semibold">{loginErrorMessage}</h4>
          )}
          <form
            className="form-control w-full max-w-xs"
            onSubmit={handleSubmit}
          >
            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="Renseignez votre email ici"
              defaultValue=""
              className="input input-bordered w-full max-w-xs"
              required
            />
            <PasswordInput className="input input-bordered w-full max-w-xs" />
            <Link className="text-sm p-2 hover:underline" to="/forgot-password">
              Mot de passe oublié ?
            </Link>
            <div className="flex justify-center py-2 lg:justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 btn btn-primary text-white mt-2 text-base normal-case"
              >
                <Compass className="w-7 h-7" />
                Connexion
              </button>
            </div>
          </form>
          <div className="mt-5">
            <Link
              className="btn normal-case bg-white m-auto text-sm border border-primary rounded-lg p-2"
              to="/register"
            >
              Pas encore inscrit ?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
