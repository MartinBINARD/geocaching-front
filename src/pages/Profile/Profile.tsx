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
    if (!isEdit) {
      dispatch(getProfile());
    }
  }, [isEdit, dispatch]);

  if (profile) {
    return (
      <>
        <h2 className="font-bold text-xl text-center my-5 lg:text-4xl">
          Mon profil
        </h2>
        <section className="flex flex-row items-center justify-center flex-wrap gap-5 max-w-4xl m-auto">
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
