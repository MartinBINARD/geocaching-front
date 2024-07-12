import { useRef } from 'react';
import { HeartCrack } from 'lucide-react';

import { useAppDispatch } from '../../../../../../../hooks/redux';

import { deleteProfile } from '../../../../../../../../core/usecases';

interface ProfileUserCardDeleteModalProp {
  isEdit: boolean;
}

function ProfileUserCardDeleteModal({
  isEdit,
}: ProfileUserCardDeleteModalProp) {
  const modal = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();

  function onClickOpenModal() {
    modal.current?.showModal();
  }

  function onClickDeleteProfile() {
    dispatch(deleteProfile());
  }

  return (
    <>
      {!isEdit && (
        <button
          onClick={onClickOpenModal}
          type="button"
          className="btn btn-error"
        >
          Supprimer mon compte
        </button>
      )}

      <dialog ref={modal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Veux-tu vraiment supprimer ton compte ?
          </h3>
          <HeartCrack className="w-10 h-10 text-error my-3 mx-auto" />
          <div className="modal-action">
            <form method="dialog" className="flex justify-between">
              <button
                onClick={onClickDeleteProfile}
                type="submit"
                className="btn btn-error  mr-8 max-[375px]:w-32"
              >
                Confirmer
              </button>
              <button type="submit" className="btn btn-primary btn-outline">
                Annuler
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ProfileUserCardDeleteModal;
