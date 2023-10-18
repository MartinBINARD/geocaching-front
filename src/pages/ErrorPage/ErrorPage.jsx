import { Link } from 'react-router-dom';

import logo from '../../assets/logo/compass.png';

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-primary">
      <h1 className="text-xl sm:text-4xl md:text-5xl">
        Oups... Tu t&apos;es perdu papillon ?
      </h1>
      <p className="mt-5 text-lg">Cette page n&apos;existe pas</p>

      <Link
        className="flex items-center gap-2 border rounded-md py-1 px-3 border-primary bg-primary text-white text-sm m-2 sm:text-2xl sm:w-max"
        to="/"
      >
        Retourner vers la page d&apos;accueil
        <img className="h-10" src={logo} alt="logo CacheTrek" />
      </Link>
    </div>
  );
}

export default ErrorPage;
