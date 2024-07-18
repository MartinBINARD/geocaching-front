import { FilterCircuitListRequest } from '../../adapters/requests';
import { Circuit, Search } from '../../domain/entities/circuit';
import FilteredObjectKeys from './FilteredObjectKeys';

function stringifyObjectValues(obj: Circuit, key: string, value: string) {
  const keyValue = obj[key as keyof Circuit];

  if (typeof keyValue !== 'string') {
    return keyValue.toString() === value;
  }

  return keyValue === value;
}

function compareValuesObject(obj: Circuit, filteredSearchObj: Search): boolean {
  return Object.entries(filteredSearchObj).every(([key, value]) => {
    // Check Array values obj from arr
    if (key === 'mobility') {
      return obj[key].find((v) => v === value);
    }

    // Stringify for number value of obj
    return stringifyObjectValues(obj, key, value);
  });
}

export default function filterCircuitsList({
  search,
  circuitsList,
}: FilterCircuitListRequest): Promise<Circuit[] | Error> {
  return new Promise((resolve, reject) => {
    const filteredSearchObj = FilteredObjectKeys(search);

    if (!Object.keys(filteredSearchObj).length) {
      resolve(circuitsList);
    }

    const result = circuitsList.filter((obj) => {
      return compareValuesObject(obj, filteredSearchObj);
    });

    if (!result.length) {
      reject(new Error('Aucun résulat ne correspond à votre recherche !'));
    }

    resolve(result);
  });
}
