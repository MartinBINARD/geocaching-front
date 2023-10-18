/* Return array of values from object 
with entries key object and array of object */
import { Circuit } from '../@types/circuit';

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
  const arrayValues: (string | number | string[])[] = arr.map(
    (obj: Circuit) => {
      const findKeySelect: string | undefined = Object.keys(obj).find(
        (str) => str.toLocaleLowerCase() === key.toLocaleLowerCase()
      );

      return obj[findKeySelect as keyof Circuit];
    }
  );

  // Concat of any array value
  const arrayValuesConcat = arrayValues.every((v) => Array.isArray(v))
    ? arrayValues.reduce<(string | number | string[])[]>(
        (acc, curr) => acc.concat(curr),
        []
      )
    : arrayValues;

  // Removal of any duplicate values
  const arrayOnesValues = arrayValuesConcat.reduce<
    (string | number | string[])[]
  >((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  // Sort Data order
  return arrayOnesValues.sort();
}

export default GetSelectValueArray;
