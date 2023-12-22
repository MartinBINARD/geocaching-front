import {
  Brain,
  DraftingCompass,
  Footprints,
  Hourglass,
  MountainSnow,
} from 'lucide-react';

import { useAppSelector } from '../../hooks/redux';

import { Circuit } from '../../@types/circuit';

function CircuitDescriptionCard() {
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    url_image,
    name,
    region,
    state,
    city,
    theme,
    difficulty,
    terrain,
    distance,
    duration,
    mobility,
    introduction,
  } = circuit as Circuit;

  return (
    <article>
      <img className="rounded-lg" src={url_image} alt={`circuit : ${name}`} />

      <section className="border-b border-primary m-auto">
        <p className="text-center m-auto pt-3">
          {region}, {state} - {city}
        </p>
        <p className="text-center font-bold m-auto pb-3 pt-1">{theme}</p>
      </section>

      <section className="flex justify-between item-center p-4 shadow-lg rounded-lg">
        <div className="flex flex-col items-center gap-1">
          <Brain className="w-8 h-8 text-secondary" />
          <p>
            Difficulté :<span className="font-bold ml-1">{difficulty}/5</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <MountainSnow className="w-8 h-8 text-secondary" />
          <p>
            Terrain :<span className="font-bold ml-1">{terrain}/5</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <DraftingCompass className="w-8 h-8 text-secondary" />
          <p>
            Distance :<span className="font-bold ml-1">{distance} km</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Hourglass className="w-8 h-8 text-secondary" />
          <p>
            Durée :<span className="font-bold ml-1">{duration}</span>
          </p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center items-center gap-3 m-auto mt-5 p-2">
        <div className="flex items-center gap-2">
          <Footprints className="w-24 h-24 text-secondary" />
          <p>Mobilité :</p>
        </div>

        <p>
          {Object.values(mobility).map((value, index) => (
            <span key={value}>
              {value}
              {index < mobility.length - 1 && ', '}
            </span>
          ))}
        </p>

        <p className="p-2 m-auto">{introduction}</p>
      </section>
    </article>
  );
}

export default CircuitDescriptionCard;
