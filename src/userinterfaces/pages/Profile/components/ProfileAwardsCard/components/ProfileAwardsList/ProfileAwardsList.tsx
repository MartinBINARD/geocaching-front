import { Profile } from '../../../../../../../domain/entities/user';

import { useAppSelector } from '../../../../../../../services/hooks/redux';

function ProfileAwardsList() {
  const profile = useAppSelector((state) => state.user.profile);
  const { circuits } = profile as Profile;

  if (circuits) {
    return (
      <>
        <h3 className="text-center font-bold text-xl m-4">
          Circuits accomplis
        </h3>
        {circuits.map((circuit) => (
          <div
            key={circuit.name}
            className={`collapse ${
              circuits.length > 1 ? `collapse-arrow` : `collapse-open`
            } border-3 border-secondary shadow-md text-black`}
          >
            <input type="radio" name="my-accordion-2" defaultChecked />

            <h4 className="collapse-title text-xl font-medium">
              {circuit.name}
            </h4>
            <div className="collapse-content flex flex-nowrap">
              <p className="break-words flex-grow">{circuit.description}</p>
              <div className="divider lg:divider-horizontal" />

              {circuit.url_reward ? (
                <img
                  className="w-20 m-4"
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                    circuit.url_reward
                  }`}
                  alt={`récomponse du circuit ${circuit.name}`}
                />
              ) : (
                <p className="w-14 font-bold text-sm text-ellipsis m-4">
                  Impossible d&apos;afficher le contenu de cette image
                </p>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <h3 className="text-center font-bold p-1">
      Réussisez des parcours pour débloquer des récompenses.
    </h3>
  );
}

export default ProfileAwardsList;
