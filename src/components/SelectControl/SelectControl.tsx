import { Circuit } from '../../@types/circuit';
import { useAppSelector } from '../../hooks/redux';
import getCurrentSelectorValueFromSearch from '../../utils/getCurrentSelectorValueFromSearch';
import GetSelectValueArray from '../../utils/getSelectValueArray';

type OnSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => void;

interface SelectProps {
  keyName: string;
  label: string;
  placeholder: string;
  list: Circuit[];
  onSelect: OnSelectType;
}

function SelectControl({
  keyName,
  label,
  placeholder,
  list,
  onSelect,
}: SelectProps) {
  const listValue = GetSelectValueArray(keyName, list);
  const searchSelectorsFilterEntries = useAppSelector(
    (state) => state.circuits.searchSelectorsFilterEntries
  );

  const currentValue = getCurrentSelectorValueFromSearch(
    searchSelectorsFilterEntries,
    keyName
  );

  return (
    <div className="form-control m-1 lg:m-2">
      <label className="label">
        <span className="label-text-alt text-primary">{label}</span>
      </label>
      <select
        name={keyName}
        className="select select-primary select-bordered"
        defaultValue={currentValue}
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
