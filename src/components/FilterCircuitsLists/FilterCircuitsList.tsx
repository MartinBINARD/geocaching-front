/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MoveLeft,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { Circuit } from '../../@types/circuit';

import { searchCircuitsList } from '../../store/reducers/circuits';

import SelectControl from '../SelectControl/SelectControl';
import Loader from '../../loader/Loader';

interface ListProps {
  list: Circuit[];
}

function FilterCircuitsList({ list }: ListProps) {
  const [search, setSearch] = useState<object>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const circuitsList = useAppSelector((state) => state.circuits.circuitsList);
  const isLoading = useAppSelector((state) => state.circuits.isLoading);
  const filter = useRef<HTMLFormElement>(null);
  const isSearch = Object.values(search).some((v) => v.length > 0);

  const dispatch = useAppDispatch();

  const stopScrollingModal = (isModalOpen: boolean): void => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  };

  useEffect(() => {
    stopScrollingModal(isOpen);
  }, [isOpen]);

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
    setIsOpen(false);
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filter.current?.reset();
    setSearch({});
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full shadow-lg rounded-lg text-primary xl:p-4">
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-primary btn-outline flex flex-row flex-nowrap items-center justify-between cursor-pointer w-full xl:hidden"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <h3 className="font-bold text-base">Filtres</h3>
      </button>

      <aside
        className={`absolute z-50 top-0 left-0 right-0 bottom-0 flex flex-col justify-start bg-white ease-in-out duration-200 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full xl:translate-x-0 xl:static'
        }`}
      >
        <div
          className={`w-full flex flex-row items-center justify-between p-4 ${
            isOpen ? '' : 'xl:hidden'
          }`}
        >
          <button type="button" onClick={handleClick}>
            <MoveLeft className="w-7 h-7" />
          </button>
          <h3 className="font-bold text-lg">Filtres</h3>
          <button type="button" onClick={handleClick}>
            <Plus className="w-7 h-7 rotate-45" />
          </button>
        </div>

        <div className="w-full bg-slate-300 h-1 mb-2 xl:hidden">
          <div className=" w-11/12 bg-primary h-1" />
        </div>

        <form
          ref={filter}
          onSubmit={handleSubmit}
          className="form-control w-full flex-row justify-center overflow-y-auto"
        >
          <ul className={`flex flex-col ${isOpen ? 'gap-2' : 'xl:flex-row'}`}>
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

          <div className="flex flex-col items-center justify-start">
            <button
              type="submit"
              className={`btn btn-ghost btn-circle ${
                isSearch ? '' : 'xl:mt-9'
              }`}
            >
              <Search className="w-5 h-5 text-primary" />
            </button>
            {isSearch && (
              <button
                type="reset"
                onClick={handleReset}
                className="btn btn-ghost btn-circle"
              >
                <Trash2 className="w-5 h-5 text-error" />
              </button>
            )}
          </div>
        </form>
      </aside>
    </section>
  );
}

export default FilterCircuitsList;
