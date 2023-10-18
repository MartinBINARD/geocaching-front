import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProfile } from '../../store/reducers/user';

import ProfileDescription from '../../components/ProfileDescription/ProfileDescription';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileAward from '../../components/ProfileAward/ProfileAward';

function Profile() {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  const handleClick = () => {
    setEdit(!edit);
  };

  // Refresh profile change when edit is done
  useEffect(() => {
    if (!edit) {
      dispatch(getProfile());
    }
  }, [dispatch, edit]);

  return (
    profile && (
      <>
        <h2 className="text-center font-bold text-4xl p-4 relative m-auto mb-8">
          <div>
            <span>Mon profil</span>
            {/* <img
              src={}
              alt=""
              width={200}
              className="relative mt-[-15px]"
            /> */}
          </div>
        </h2>
        <section className=" flex flex-row flex-wrap m-auto items-center justify-between max-w-4xl">
          <article className="card flex-col items-center sm:p-4">
            <div className="flex flex-col gap-2 p-4 text-primary shadow-lg rounded-lg self-stretch">
              <h3 className="font-semibold text-lg pt-5 pl-3">Mon profil</h3>
              {!edit ? (
                <ProfileDescription {...profile} />
              ) : (
                <ProfileForm {...profile} setEdit={setEdit} />
              )}

              <button
                onClick={handleClick}
                type="button"
                className={`btn btn-primary ${
                  !edit ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {!edit ? 'Modifier' : 'Annuler'}
              </button>
            </div>
          </article>

          <article className="m-auto">
            <div className="flex flex-col gap-5 text-lg">
              <img
                src={pinMapIcon}
                alt="Une illustration d'une carte"
                width={150}
                className="self-center"
              />
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
