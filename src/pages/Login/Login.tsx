import { Link, Navigate } from 'react-router-dom';
import { Compass, MountainSnow } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { login } from '../../store/reducers/settings';

import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function Login() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.settings.user);
  const failedLogin = useAppSelector((state) => state.settings.failedLogin);
  const errorMessage = useAppSelector(
    (state) => state.settings.loginErrorMessage
  );
  const loading = useAppSelector((state) => state.settings.loading);

  // Form login processing
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as HTMLFormElement;

    // Making the email to lower case before checking at database
    const emailInput = formData.get('email') as string;
    const emailToLowerCase = emailInput.toLowerCase();
    formData.set('email', emailToLowerCase);

    // Using dispatch to send formData to Login POST
    dispatch(login(formData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5  lg:flex-row m-auto w-full p-4">
        <MountainSnow className="w-44 h-44 m-5" />
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start lg:border-l lg:border-primary lg:pl-20">
          <h2 className="font-bold text-xl my-5">Connexion</h2>
          {failedLogin ? (
            <h4 className="text-red-500 font-semibold">{errorMessage}</h4>
          ) : null}
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
            <Link className="p-2 hover:underline text-sm" to="/ask-password">
              Mot de passe oublié ?
            </Link>
            <div className="flex lg:justify-end justify-center py-2">
              <button
                type="submit"
                className="flex gap-2 items-center btn btn-primary text-white mt-2 text-base normal-case"
              >
                <Compass className="w-7 h-7" />
                Connexion
              </button>
            </div>
          </form>
          <div className="mt-5">
            <Link
              className="btn normal-case bg-white m-auto text-sm self-start border border-primary rounded-lg p-2"
              to="/register"
            >
              Pas encore inscrit ?
            </Link>
            {user ? <Navigate to="/profile" /> : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
