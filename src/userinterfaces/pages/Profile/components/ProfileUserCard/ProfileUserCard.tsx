import { useAppSelector } from '../../../../../services/hooks/redux';

import ProfileUserDescription from './components/ProfileUserDescription/ProfileUserDescription';
import ProfileUserForm from './components/ProfileUserForm/ProfileUserForm';
import ProfileUserCardDeleteModal from './components/ProfileUserCardDeleteModal/ProfileUserCardDeleteModal';

interface ProfileUserCardProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ProfileUserCard({ isEdit, setIsEdit, onClick }: ProfileUserCardProps) {
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  return (
    <article className="flex flex-col gap-2 text-primary shadow-lg rounded-lg self-stretch p-4">
      <h3 className="font-semibold text-lg pt-5 pl-3">Mon profil</h3>
      {isEdit ? (
        <ProfileUserForm setIsEdit={setIsEdit} />
      ) : (
        <ProfileUserDescription />
      )}

      <button
        onClick={onClick}
        type="button"
        className={`btn btn-primary ${isEdit ? 'btn-outline' : ''}`}
        disabled={!!errorMessage}
      >
        {isEdit ? 'Annuler' : 'Modifier'}
      </button>

      <ProfileUserCardDeleteModal isEdit={isEdit} />
    </article>
  );
}

export default ProfileUserCard;
