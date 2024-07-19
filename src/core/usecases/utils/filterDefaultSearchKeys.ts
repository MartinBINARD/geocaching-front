import { SearchCircuitsRequest } from '../../adapters/requests';

const DEFAULT_VALUES = ['Toutes', 'Tous'];

export default function filterDefaultSearchKeys(obj: SearchCircuitsRequest) {
  return Object.keys(obj)
    .filter(
      (key) => !DEFAULT_VALUES.includes(obj[key as keyof SearchCircuitsRequest])
    )
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: obj[key as keyof SearchCircuitsRequest],
      }),
      {}
    );
}
