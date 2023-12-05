import { useEffect, useState } from 'react';
import { Map } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getProfile } from '../../store/reducers/user';

import ProfileDescription from '../../components/ProfileDescription/ProfileDescription';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileAward from '../../components/ProfileAward/ProfileAward';

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
                <ProfileForm {...profile} setIsEdit={setIsEdit} />
              ) : (
                <ProfileDescription {...profile} />
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

          <article className="m-auto">
            <div className="flex flex-col gap-5 text-lg">
              <Map className="w-12 h-12" />
              <p className="flex justify-between items-center">
                <span className="font-bold mr-3">
                  Nombre de circuits terminés:
                </span>
                {profile.count_finished_circuits
                  ? profile.count_finished_circuits
                  : 0}
              </p>

              <p className="">
                <span className="mr-3">Kilomètres parcouru: </span>
                {profile.km_traveled ? profile.km_traveled : 0} km
              </p>
            </div>
          </article>

          <article className="flex flex-col gap-2 self-center p-4 text-primary shadow-lg rounded-lg w-full my-10">
            <div className="flex flex-col gap-3">
              {profile.circuits ? (
                <ProfileAward circuits={profile.circuits} />
              ) : (
                <h3 className="text-center font-bold p-1">
                  Réussisez des parcours pour débloquer des récompenses.
                </h3>
              )}
            </div>
          </article>
        </section>
      </>
    )
  );
}

export default Profile;
