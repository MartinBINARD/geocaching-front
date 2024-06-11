/* Return array of values from object 
with entries key object and array of object */
import { Circuit } from '../domain/entities/circuit';

function getValuesArray(key: string, arr: Circuit[]) {
  return arr.map((obj: Circuit) => {
    const findKeySelect: string | undefined = Object.keys(obj).find(
      (str) => str.toLocaleLowerCase() === key.toLocaleLowerCase()
    );

    return obj[findKeySelect as keyof Circuit];
  });
}

function concatValuesArray(arr: (string | number | string[])[]) {
  return arr.every((v) => Array.isArray(v))
    ? arr.reduce<(string | number | string[])[]>(
        (acc, curr) => acc.concat(curr),
        []
      )
    : arr;
}

function removeDuplicatedValuesArray(arr: (string | number | string[])[]) {
  return arr.reduce<(string | number | string[])[]>((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
}

function GetSelectValueArray(
  key: string,
  arr: Circuit[]
): (string | number | string[])[] {
  if (!key.trim().length) {
    /* array method do not expect type boolean
    so return empty array instead of true */
    return [];
  }
  // Search for values from key selector
  const getSelectorValuesList = getValuesArray(key, arr) as (
    | string
    | number
    | string[]
  )[];

  // Concat of any array value

  const mergeSelectorValuesList = concatValuesArray(getSelectorValuesList);

  // Removal of any duplicate values
  const selectorUniqueValuesList = removeDuplicatedValuesArray(
    mergeSelectorValuesList
  );

  // Sort Data order
  return selectorUniqueValuesList.sort();
}

export default GetSelectValueArray;
