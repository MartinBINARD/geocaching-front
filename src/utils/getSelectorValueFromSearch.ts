import { Search } from '../@types/circuit';

function getSelectorValueFromSearch(search: Search | null, keyName: string) {
  if (search) {
    const arrayEntrieSelector = Object.entries(search).find(
      ([key]) => key === keyName
    );

    return arrayEntrieSelector?.length && arrayEntrieSelector[1];
  }

  return '';
}

export default getSelectorValueFromSearch;
