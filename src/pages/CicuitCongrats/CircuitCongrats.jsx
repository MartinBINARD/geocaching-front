import { Compass } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Congrats() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <h1 className="font-bold text-xl">Félicitations !</h1>
      <p className="text-center">
        Vous avez complêté ce parcours avec succès !
      </p>
      <p className="text-center">
        Allez découvrir votre récompense directement sur votre page de profil !
      </p>
      <Link
        className="flex items-center gap-2 bg-primary rounded-lg px-4 py-2 text-white"
        to="/profile"
      >
        <Compass className="w-7 h-7" />
        Découvrir
      </Link>
    </>
  );
}

export default Congrats;
