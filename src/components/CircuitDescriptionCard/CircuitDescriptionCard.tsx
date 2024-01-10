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
      <section className="m-auto">
        <img
          className="rounded-lg m-auto"
          src={url_image}
          alt={`circuit : ${name}`}
        />
        <p className="text-center m-auto pt-3">
          {region}, {state} - {city}
        </p>
        <p className="text-center font-bold m-auto pb-3 pt-1">{theme}</p>
      </section>

      <section className="grid grid-cols-2 shadow-lg rounded-lg xl:grid-cols-4">
        <div className="flex flex-col items-center gap-1 m-4">
          <Brain className="w-8 h-8 text-secondary" />
          <p className="font-bold">Difficulté : {difficulty}/5</p>
        </div>

        <div className="flex flex-col items-center gap-1 m-4">
          <MountainSnow className="w-8 h-8 text-secondary" />
          <p className="font-bold">Terrain : {terrain}/5</p>
        </div>

        <div className="flex flex-col items-center gap-1 m-4">
          <DraftingCompass className="w-8 h-8 text-secondary" />
          <p className="font-bold">Distance : {distance} km</p>
        </div>

        <div className="flex flex-col items-center gap-1 m-4">
          <Hourglass className="w-8 h-8 text-secondary" />
          <p className="font-bold">Durée : {duration}</p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center items-center gap-3 m-auto mt-5 p-2">
        <div className="flex items-center gap-2">
          <Footprints className="w-24 h-24 text-secondary" />
          <p className="font-bold">Mobilité :</p>
        </div>

        <p>
          {Object.values(mobility).map((value, index) => (
            <span className="font-bold" key={value}>
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
