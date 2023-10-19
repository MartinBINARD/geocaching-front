import FilteredObjectKeys from './FilteredObjectKeys';

function stringifyObjectValues(obj, key, value) {
  return typeof obj[key] !== 'string'
    ? obj[key].toString() === value
    : obj[key] === value;
}

function compareValuesObject(obj, filteredSearchObj) {
  return Object.entries(filteredSearchObj).every(([key, value]) => {
    // Check Array values obj from arr
    if (Array.isArray(obj[key])) {
      return obj[key].includes(value);
    }

    // Stringify for number value of obj
    return stringifyObjectValues(obj, key, value);
  });
}

function filteredList(searchObj, arr) {
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
