import { SearchCircuitsRequest } from '../../core/adapters/requests';

type currentSearchType = object;
type previousSearchType = SearchCircuitsRequest | null;

interface saveSelectedValueInterface {
  currentSearch: currentSearchType;
  previousSearch: previousSearchType;
  keyName: string;
}

function getSelectorValueFromSearch(
  search: currentSearchType | previousSearchType,
  keyName: string
) {
  if (search) {
    const arrayEntrieSelector = Object.entries(search).find(
      ([key]) => key === keyName
    );

    return arrayEntrieSelector?.length && arrayEntrieSelector[1];
  }

  return '';
}

export default function saveSelectedValue({
  currentSearch,
  previousSearch,
  keyName,
}: saveSelectedValueInterface) {
  const currentValue = getSelectorValueFromSearch(currentSearch, keyName);
  const previousValue = getSelectorValueFromSearch(previousSearch, keyName);

  return currentValue || previousValue;
}
