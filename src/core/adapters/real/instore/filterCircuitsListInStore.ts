import {
  FilterCircuitListRequest,
  SearchCircuitsRequest,
} from '../../requests';
import { CircuitWithoutSteps } from '../../../domain/entities';

const DEFAULT_VALUES = ['Toutes', 'Tous'];

function filterDefaultSearchKeys(obj: SearchCircuitsRequest) {
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

function findSelectedMobilityValue(
  circuit: CircuitWithoutSteps,
  key: keyof CircuitWithoutSteps,
  value: string
) {
  const arrayValues = circuit[key] as string[];

  return arrayValues.find((v) => v === value);
}

function stringifyCircuitObjectValues(
  circuit: CircuitWithoutSteps,
  key: string,
  value: string
) {
  const keyValue = circuit[key as keyof CircuitWithoutSteps];

  if (typeof keyValue !== 'string') {
    return keyValue.toString() === value;
  }
  return keyValue === value;
}

function parseSearchObject(
  circuit: CircuitWithoutSteps,
  stringifiedSearchObj: SearchCircuitsRequest
) {
  return Object.entries(stringifiedSearchObj).every(([key, value]) => {
    if (key === 'mobility') {
      return findSelectedMobilityValue(circuit, key, value);
    }

    return stringifyCircuitObjectValues(circuit, key, value);
  });
}

export default function filterCircuitsList({
  search,
  circuitsList,
}: FilterCircuitListRequest) {
  return new Promise((resolve, reject) => {
    const filteredSearchObject = filterDefaultSearchKeys(
      search
    ) as SearchCircuitsRequest;

    const result = circuitsList.filter((circuit) => {
      return parseSearchObject(circuit, filteredSearchObject);
    });

    if (!Object.keys(filteredSearchObject).length) {
      resolve(circuitsList);
    }

    if (!result.length) {
      reject(new Error('Aucun résulat ne correspond à votre recherche !'));
    }

    resolve(result);
  });
}
