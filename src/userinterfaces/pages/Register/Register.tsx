import { Compass, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { register } from '../../../store/reducers/auth';

import { RegisterForm } from '../../../@types/auth';

import Footer from '../../components/Footer/Footer';
import Loader from '../../../loader/Loader';
import TextInput from '../../components/TextInput/TextInput';

function Register() {
  const dispatch = useAppDispatch();

  const isRegistered = useAppSelector((state) => state.auth.isRegistered);
  const registerErrorMessage = useAppSelector(
    (state) => state.auth.registerErrorMessage
  );
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleSubmit = (e: React.FormEvent<RegisterForm>): void => {
    e.preventDefault();
    const form = e.target as RegisterForm;
    const formData = new FormData(form) as unknown as RegisterForm;
    dispatch(register(formData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <article className="flex flex-col-reverse justify-center items-center p-4 m-auto lg:flex-row-reverse lg:gap-20">
        <section className="flex flex-col items-center lg:p-8 lg:shadow-lg">
          <h2 className="font-bold my-4">Passeport d&apos;inscription</h2>
          {!isRegistered && (
            <h4 className="text-red-500 font-semibold w-full max-w-xs">
              {registerErrorMessage}
            </h4>
          )}
          <form
            className="flex flex-col gap-1 max-w-xs"
            onSubmit={handleSubmit}
          >
            <TextInput
              name="pseudo"
              type="text"
              label="Pseudo"
              placeholder="Renseignez votre pseudo"
              defaultValue=""
              className="input input-bordered w-full max-w-xs"
              required
            />
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
            <TextInput
              name="confirmation"
              type="password"
              label="Confirmation du mot de passe"
              placeholder="Renseignez de nouveau votre mot de passe"
              defaultValue=""
              className="input input-bordered w-full max-w-xs"
              required
            />
            <div className="flex justify-center lg:justify-end py-2">
              <button
                type="submit"
                className="flex btn gap-2 items-center btn-primary text-white mt-2 text-base normal-case"
              >
                <Compass className="w-7 h-7" />
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
        <section className="flex flex-col">
          <Globe2 className="w-12 h-12 lg:w-44 lg:h-44 mx-auto" />
          <h2 className="font-bold text-lg text-center mt-2 py-2 border-b border-primary lg:text-2xl">
            Rejoins la communauté GeoCacheTrek !
          </h2>
        </section>
      </article>
      <Footer />
    </>
  );
}

export default Register;
