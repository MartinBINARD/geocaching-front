import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getProfile } from '../../store/reducers/user';

import ProfileCircuitsCard from '../../components/ProfileCircuitsCard/ProfileCircuitsCard';
import ProfileAwardsCard from '../../components/ProfileAwardsCard/ProfileAwardsCard';
import ProfileUserCard from '../../components/ProfileUserCard/ProfileUserCard';

function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const profile = useAppSelector((state) => state.user.profile);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);
  const isProfileDelete = useAppSelector((state) => state.user.isProfileDelete);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!errorMessage) {
      setIsEdit(!isEdit);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setIsEdit(true);
    }
  }, [setIsEdit, errorMessage]);

  useEffect(() => {
    if (!isEdit && !isProfileDelete) {
      dispatch(getProfile());
    }
  }, [isEdit, isProfileDelete, dispatch]);

  if (profile) {
    return (
      <>
        <h2 className="text-center font-bold text-4xl p-4 relative m-auto sm:mb-8">
          Mon profil
        </h2>
        <section className=" flex flex-row flex-wrap m-auto items-center justify-center max-w-4xl">
          <ProfileUserCard
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onClick={handleClick}
          />

          <ProfileCircuitsCard />

          <ProfileAwardsCard />
        </section>
      </>
    );
  }
}

export default Profile;
