import {
  FilterCircuitListRequest,
  SearchCircuitsRequest,
} from '../../adapters/requests';
import { Circuit } from '../../domain/entities';
import filterDefaultSearchKeys from './filterDefaultSearchKeys';

function findSelectedMobilityValue(
  circuit: Circuit,
  key: keyof Circuit,
  value: string
) {
  const arrayValues = circuit[key] as string[];

  return arrayValues.find((v) => v === value);
}

function stringifyCircuitObjectValues(
  circuit: Circuit,
  key: string,
  value: string
) {
  const keyValue = circuit[key as keyof Circuit];

  if (typeof keyValue !== 'string') {
    return keyValue.toString() === value;
  }
  return keyValue === value;
}

function parseSearchObject(
  circuit: Circuit,
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
