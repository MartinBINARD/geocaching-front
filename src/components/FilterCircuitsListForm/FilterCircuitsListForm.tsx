import { useCallback, useRef } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import {
  resetSearchCircuitsList,
  searchCircuitsList,
} from '../../store/reducers/circuits';

import SelectControl from '../SelectControl/SelectControl';

interface FilterCircuitsListFormProps {
  searchState: {
    search: object;
    setSearch: React.Dispatch<React.SetStateAction<object>>;
  };
  openState: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

function FilterCircuitsListForm({
  searchState,
  openState,
}: FilterCircuitsListFormProps) {
  const { search, setSearch } = searchState;
  const { isOpen, setIsOpen } = openState;

  const circuitsList = useAppSelector((state) => state.circuits.circuitsList);
  const searchSelectorsFilterEntries = useAppSelector(
    (state) => state.circuits.searchSelectorsFilterEntries
  );
  const isCurrentSearch = Object.values(search).some((v) => v.length > 0);

  const filter = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      setSearch({ ...search, [e.target.name]: e.target.value });
    },
    [search]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchCircuitsList({ search, list: circuitsList }));
    setIsOpen(false);
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filter.current?.reset();
    setSearch({});
    dispatch(resetSearchCircuitsList());
    setIsOpen(false);
  };

  return (
    <form
      ref={filter}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="form-control w-full flex-row justify-center overflow-y-auto"
    >
      <ul className={`flex flex-col ${isOpen ? 'gap-2' : 'xl:flex-row'}`}>
        <li>
          <SelectControl
            keyName="region"
            label="Région"
            placeholder="Toutes"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>

        <li>
          <SelectControl
            keyName="state"
            label="Département"
            placeholder="Tous"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>

        <li>
          <SelectControl
            keyName="city"
            label="Ville"
            placeholder="Toutes"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>

        <li>
          <SelectControl
            keyName="theme"
            label="Thématique"
            placeholder="Toutes"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>

        <li>
          <SelectControl
            keyName="difficulty"
            label="Difficulté"
            placeholder="Toutes"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>

        <li>
          <SelectControl
            keyName="distance"
            label="Distance en kilomètre"
            placeholder="Toutes"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>

        <li>
          <SelectControl
            keyName="mobility"
            label="Mobilité"
            placeholder="Toutes"
            list={circuitsList}
            search={search}
            onSelect={handleChange}
          />
        </li>
      </ul>

      <div className="flex flex-col items-center justify-start">
        <button
          type="submit"
          className={`btn btn-ghost btn-circle ${
            isCurrentSearch || searchSelectorsFilterEntries ? '' : 'xl:mt-9'
          }`}
        >
          <Search className="w-5 h-5 text-primary" />
        </button>
        {(isCurrentSearch || searchSelectorsFilterEntries) && (
          <button type="reset" className="btn btn-ghost btn-circle">
            <Trash2 className="w-5 h-5 text-error" />
          </button>
        )}
      </div>
    </form>
  );
}

export default FilterCircuitsListForm;
