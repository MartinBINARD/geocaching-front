/* eslint-disable react/button-has-type */
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchCircuitsList } from '../../store/reducers/circuits';

import SelectControl from '../SelectControl/SelectControl';
import Loader from '../Loader/Loader';

import settings from '../../assets/icon/vertical_settings.svg';
import chevronUp from '../../assets/icon/chevron-up.svg';
import chevronDown from '../../assets/icon/chevron-down.svg';

import { Circuit } from '../../@types/circuit';

interface ListProps {
  list: Circuit[];
}

function FilterCircuitsList({ list }: ListProps) {
  const [search, setSearch] = useState<object>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const circuitsList = useAppSelector((state) => state.circuits.circuitsList);

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.circuits.isLoading);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  /* Catch all multiselects event list in an object with name as key 
     and value option as value and useCallback function props function handler
     to avoid too much rerendering */

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

    // Close filter dropdown menu when submitted (mobile screen)
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full shadow-lg rounded-lg text-primary p-4 ">
      <form
        onSubmit={handleSubmit}
        className="form-control flex-row flex-nowrap justify-between items-start"
      >
        <div className="w-full mt-2">
          <button
            type="button"
            onClick={handleClick}
            className="flex flex-row flex-nowrap items-center justify-between cursor-pointer w-full lg:hidden"
          >
            <div className="flex flex-row flex-nowrap">
              <img className="h-5" src={settings} alt="filter menu setting" />
              <p className="ml-4">Filtres</p>
            </div>
            <img
              className="h5"
              src={isOpen ? chevronDown : chevronUp}
              alt="filter menu chevron"
            />
          </button>

          <div
            className={isOpen ? 'flex flex-row items-start' : 'hidden lg:flex'}
          >
            <ul className="flex flex-row flex-wrap">
              <li>
                <SelectControl
                  keyName="region"
                  label="Région"
                  placeholder="Toutes"
                  list={list}
                  onSelect={handleChange}
                />
              </li>

              <li>
                <SelectControl
                  keyName="state"
                  label="Département"
                  placeholder="Tous"
                  list={list}
                  onSelect={handleChange}
                />
              </li>

              <li>
                <SelectControl
                  keyName="city"
                  label="Ville"
                  placeholder="Toutes"
                  list={list}
                  onSelect={handleChange}
                />
              </li>

              <li>
                <SelectControl
                  keyName="theme"
                  label="Thématique"
                  placeholder="Toutes"
                  list={list}
                  onSelect={handleChange}
                />
              </li>

              <li>
                <SelectControl
                  keyName="difficulty"
                  label="Difficulté"
                  placeholder="Toutes"
                  list={list}
                  onSelect={handleChange}
                />
              </li>

              <li>
                <SelectControl
                  keyName="distance"
                  label="Distance en kilomètre"
                  placeholder="Toutes"
                  list={list}
                  onSelect={handleChange}
                />
              </li>

              <li>
                <SelectControl
                  keyName="mobility"
                  label="Mobilité"
                  placeholder="Toutes"
                  list={list}
                  onSelect={handleChange}
                />
              </li>
            </ul>

            <button type="submit" className="btn btn-ghost btn-circle mt-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default FilterCircuitsList;
