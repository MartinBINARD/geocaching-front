import { Circuit, Search } from '../../../../domain/entities/circuit';
import { useAppSelector } from '../../../hooks/redux';

import GetSelectValueArray from '../../../../domain/usecases/utils/getSelectValueArray';
import getSelectorValueFromSearch from '../../../../domain/usecases/utils/getSelectorValueFromSearch';

type OnSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => void;

interface SelectProps {
  keyName: string;
  label: string;
  placeholder: string;
  list: Circuit[];
  search: Search;
  onSelect: OnSelectType;
}

function SelectControl({
  keyName,
  label,
  placeholder,
  list,
  search,
  onSelect,
}: SelectProps) {
  const searchSelectorsFilterEntries = useAppSelector(
    (state) => state.circuits.searchSelectorsFilterEntries
  );
  const previousValue = getSelectorValueFromSearch(
    searchSelectorsFilterEntries,
    keyName
  );
  const currentValue = getSelectorValueFromSearch(search, keyName);

  const listValue = GetSelectValueArray(keyName, list);

  return (
    <div className="form-control m-1 lg:m-2">
      <label className="label">
        <span className="label-text-alt text-primary">{label}</span>
      </label>
      <select
        name={keyName}
        className="select select-primary select-bordered"
        value={currentValue || previousValue || ''}
        onChange={onSelect}
      >
        <option>{placeholder}</option>
        {listValue.map((value) => {
          return <option key={listValue.indexOf(value)}>{value}</option>;
        })}
      </select>
    </div>
  );
}

export default SelectControl;
