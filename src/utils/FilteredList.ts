import { Circuit, Search } from '../@types/circuit';
import FilteredObjectKeys from './FilteredObjectKeys';

function stringifyObjectValues(obj: Circuit, key: string, value: string) {
  return typeof obj[key as keyof Circuit] !== 'string'
    ? obj[key as keyof Circuit].toString() === value
    : obj[key as keyof Circuit] === value;
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

function filteredList(searchObj: Search, arr: Circuit[]): Circuit[] {
  // Remove any object keys with empty string value in order to remove side effect
  const filteredSearchObj = FilteredObjectKeys(searchObj);

  return arr.filter((obj) => {
    // if no search entries then return the whole array of object
    if (!Object.keys(filteredSearchObj).length) {
      return true;
    }

    // If key search entries found then compare search value with values object
    return compareValuesObject(obj, filteredSearchObj);
  });
}

export default filteredList;
