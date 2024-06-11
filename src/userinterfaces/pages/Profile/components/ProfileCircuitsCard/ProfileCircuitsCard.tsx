import { Map } from 'lucide-react';
import { useAppSelector } from '../../../../../services/hooks/redux';

import { Profile } from '../../../../../domain/entities/user';

function ProfileCircuitsCard() {
  const profile = useAppSelector((state) => state.user.profile);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { count_finished_circuits, km_traveled } = profile as Profile;

  return (
    <article className="flex flex-col gap-5 text-lg m-auto">
      <Map className="w-12 h-12" />
      <p className="flex justify-between items-center">
        <span className="font-bold mr-3">Nombre de circuits terminés:</span>
        {count_finished_circuits || 0}
      </p>

      <p>
        <span className="font-bold mr-3">Kilomètres parcouru: </span>
        {km_traveled || 0} km
      </p>
    </article>
  );
}

export default ProfileCircuitsCard;
