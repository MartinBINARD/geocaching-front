import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getProfile } from '../../store/reducers/user';

import ProfileDescription from '../../components/ProfileDescription/ProfileDescription';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileCircuitsCard from '../../components/ProfileCircuitsCard/ProfileCircuitsCard';
import ProfileAwardsCard from '../../components/ProfileAwardsCard/ProfileAwardsCard';

function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const profile = useAppSelector((state) => state.user.profile);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsEdit(!isEdit);
  };

  // Refresh profile change when edit is done
  useEffect(() => {
    if (!isEdit) {
      dispatch(getProfile());
    }
  }, [dispatch, isEdit]);

  return (
    profile && (
      <>
        <h2 className="text-center font-bold text-4xl p-4 relative m-auto mb-8">
          <div>
            <span>Mon profil</span>
          </div>
        </h2>
        <section className=" flex flex-row flex-wrap m-auto items-center justify-between max-w-4xl">
          <article className="card flex-col items-center sm:p-4">
            <div className="flex flex-col gap-2 p-4 text-primary shadow-lg rounded-lg self-stretch">
              <h3 className="font-semibold text-lg pt-5 pl-3">Mon profil</h3>
              {isEdit ? (
                <ProfileForm setIsEdit={setIsEdit} />
              ) : (
                <ProfileDescription />
              )}

              <button
                onClick={handleClick}
                type="button"
                className={`btn btn-primary ${
                  isEdit ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {isEdit ? 'Annuler' : 'Modifier'}
              </button>
            </div>
          </article>

          <ProfileCircuitsCard />

          <ProfileAwardsCard />
        </section>
      </>
    )
  );
}

export default Profile;
