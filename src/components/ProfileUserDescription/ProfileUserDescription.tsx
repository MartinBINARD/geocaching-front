import { useAppSelector } from '../../hooks/redux';
import { Profile } from '../../@types/user';

function ProfileUserDescription() {
  const profile = useAppSelector((state) => state.user.profile);
  const { pseudo, email, region, state, city, presentation } =
    profile as Profile;

  return (
    <div className="flex flex-col gap-5 text-sm p-3 sm:text-base">
      <p className="flex gap-2 items-baseline flex-wrap">
        <span className="font-bold">Pseudo: </span>
        <span className="align-center">{pseudo}</span>
      </p>
      <p className="flex gap-2 items-baseline flex-wrap">
        <span className="font-bold">Email: </span>
        <span className="align-center">{email}</span>
      </p>
      <p className="flex gap-2 items-baseline flex-wrap">
        <span className="font-bold">Région: </span>
        <span className="align-center">{region || 'non renseignée'}</span>
      </p>
      <p className="flex gap-2 items-baseline flex-wrap">
        <span className="font-bold">Département: </span>
        {state || 'non renseigné'}
      </p>
      <p className="flex gap-2 items-baseline flex-wrap">
        <span className="font-bold">Ville: </span>
        {city || 'non renseignée'}
      </p>
      <p className="flex gap-2 items-baseline flex-wrap">
        <span className="font-bold">Présentation: </span>
        {presentation || 'Aucune présentation'}
      </p>
    </div>
  );
}

export default ProfileUserDescription;
