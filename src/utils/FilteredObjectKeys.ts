import { Search } from '../@types/circuit';
// Remove any object keys with empty string values

/* Use built-in utility Record types to spécify an object
with random key with value string */
function FilteredObjectKeys(obj: Search) {
  return Object.keys(obj)
    .filter((key) => obj[key as keyof Search] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: obj[key as keyof Search] }), {});
}

export default FilteredObjectKeys;
