import { Dispatch, SetStateAction } from 'react';

import ProfileUserDescription from '../ProfileUserDescription/ProfileUserDescription';
import ProfileUserForm from '../ProfileUserForm/ProfileUserForm';

interface ProfileUserCardProps {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ProfileUserCard({ isEdit, setIsEdit, onClick }: ProfileUserCardProps) {
  return (
    <article className="card flex-col items-center sm:p-4">
      <div className="flex flex-col gap-2 p-4 text-primary shadow-lg rounded-lg self-stretch">
        <h3 className="font-semibold text-lg pt-5 pl-3">Mon profil</h3>
        {isEdit ? (
          <ProfileUserForm setIsEdit={setIsEdit} />
        ) : (
          <ProfileUserDescription />
        )}

        <button
          onClick={onClick}
          type="button"
          className={`btn btn-primary ${
            isEdit ? 'btn-secondary' : 'btn-primary'
          }`}
        >
          {isEdit ? 'Annuler' : 'Modifier'}
        </button>
      </div>
    </article>
  );
}

export default ProfileUserCard;
