// Remove any object keys with empty string values
/* Use built-in utility Record to spécify an object
with random key with value string */
function FilteredObjectKeys(obj: Record<string, string>) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

export default FilteredObjectKeys;
