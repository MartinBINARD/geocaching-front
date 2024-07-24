import { useAppSelector } from '../../../hooks/redux';
import { CircuitsList } from '../../../../core/domain/entities';

import getSelectValueArray from '../../../utils/getSelectValueArray';
import saveSelectedValue from '../../../utils/saveSelectedValue';

type OnSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => void;

interface Search {
  city?: string;
  description?: string;
  distance?: number;
  mobility?: string[] | string;
  region?: string;
  state?: string;
  theme?: string;
}

interface SelectProps {
  keyName: string;
  label: string;
  placeholder: string;
  list: CircuitsList;
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

  const selectedValue = saveSelectedValue({
    currentSearch: search,
    previousSearch: searchSelectorsFilterEntries,
    keyName,
  });

  const listValue = getSelectValueArray(keyName, list);

  return (
    <div className="form-control m-1 lg:m-2">
      <label className="label">
        <span className="label-text-alt text-primary">{label}</span>
      </label>
      <select
        name={keyName}
        className="select select-primary select-bordered"
        value={selectedValue}
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
