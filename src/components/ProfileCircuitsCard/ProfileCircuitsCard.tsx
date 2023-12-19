import { Map } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

import { Profile } from '../../@types/user';

function ProfileCircuitsCard() {
  const profile = useAppSelector((state) => state.user.profile);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { count_finished_circuits, km_traveled } = profile as Profile;

  return (
    <article className="m-auto">
      <div className="flex flex-col gap-5 text-lg">
        <Map className="w-12 h-12" />
        <p className="flex justify-between items-center">
          <span className="font-bold mr-3">Nombre de circuits terminés:</span>
          {count_finished_circuits || 0}
        </p>

        <p className="">
          <span className="mr-3">Kilomètres parcouru: </span>
          {km_traveled || 0} km
        </p>
      </div>
    </article>
  );
}

export default ProfileCircuitsCard;
