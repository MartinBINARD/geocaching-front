import { Compass, Trophy } from 'lucide-react';
import { Link, redirect, useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

function Congrats() {
  const { id } = useParams();
  const userCircuitAnswersResult = useAppSelector(
    (state) => state.circuits.userCircuitAnswersResult
  );
  const isCircuitQuizWrong = userCircuitAnswersResult?.includes(false);

  if (!userCircuitAnswersResult || isCircuitQuizWrong) {
    return redirect(`circuit/${id}`);
  }

  return (
    <section className="flex flex-col items-center gap-7">
      <h1 className="font-bold text-xl">Félicitations !</h1>
      <Trophy className="w-32 h-32 text-yellow-400" />

      <p className="text-center">Tu as complêté ce parcours avec succès !</p>
      <p className="text-center">
        Va découvrir ta récompense directement sur ta page de profil !
      </p>
      <Link className="btn btn-primary" to="/profile">
        <Compass className="w-7 h-7" />
        Découvrir
      </Link>
    </section>
  );
}

export default Congrats;
