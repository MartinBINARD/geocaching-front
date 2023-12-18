import { Link, Navigate } from 'react-router-dom';
import { Compass, MountainSnow } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { login } from '../../store/reducers/settings';

import { LoginForm } from '../../@types/setting';

import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function Login() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.settings.user);
  const loginErrorMessage = useAppSelector(
    (state) => state.settings.loginErrorMessage
  );
  const isLoading = useAppSelector((state) => state.settings.isLoading);

  const handleSubmit = (e: React.FormEvent<LoginForm>): void => {
    e.preventDefault();
    const form = e.target as LoginForm;

    dispatch(login(form));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-5 p-4 m-auto lg:flex-row ">
        <MountainSnow className="w-12 h-12 lg:w-44 lg:h-44 m-2 lg:m-20" />
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start lg:border-l lg:border-primary lg:pl-20">
          <h2 className="font-bold text-xl my-2 lg:my-5">Connexion</h2>
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
            <TextInput
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Renseignez votre mot de passe"
              defaultValue=""
              className="input input-bordered w-full max-w-xs"
              required
            />
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
