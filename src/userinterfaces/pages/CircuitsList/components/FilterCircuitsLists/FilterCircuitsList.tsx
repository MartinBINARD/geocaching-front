/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { MoveLeft, Plus, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';

import { resetSearchCircuitsList } from '../../../../../domain/usecases/circuits';

import Loader from '../../../../components/loader/Loader';
import FilterCircuitsListForm from './components/FilterCircuitsListForm/FilterCircuitsListForm';

function FilterCircuitsList() {
  const [search, setSearch] = useState<object>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openState = { isOpen, setIsOpen };
  const searchState = { search, setSearch };
  const isLoading = useAppSelector((state) => state.circuits.isLoading);
  const isSearchNoResult = useAppSelector(
    (state) => state.circuits.isSearchNoResult
  );
  const searchSelectorsFilterEntries = useAppSelector(
    (state) => state.circuits.searchSelectorsFilterEntries
  );
  const isCurrentSearch = Object.values(search).some((v) => v.length > 0);

  const dispatch = useAppDispatch();

  const stopScrollingModal = (isModalOpen: boolean): void => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  };

  const resetSelectorsFilterWhenNoResult = () => {
    if (isSearchNoResult) {
      setSearch({});
      dispatch(resetSearchCircuitsList());
    }
  };

  useEffect(() => {
    stopScrollingModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    resetSelectorsFilterWhenNoResult();
  }, [dispatch, isSearchNoResult]);

  const handleClick = () => {
    setIsOpen(!isOpen);
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

        {isCurrentSearch || searchSelectorsFilterEntries ? (
          <div className="indicator">
            <span className="indicator-item badge badge-secondary" />
            <h3 className="font-bold text-base">Filtres</h3>
          </div>
        ) : (
          <h3 className="font-bold text-base">Filtres</h3>
        )}
      </button>

      <aside
        className={`absolute z-50 top-0 left-0 right-0 bottom-0 flex flex-col justify-start bg-white ease-in-out duration-200 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full xl:translate-x-0 xl:static'
        }`}
      >
        <div
          className={`w-full flex flex-row items-center justify-between p-2 ${
            isOpen ? '' : 'xl:hidden'
          }`}
        >
          <button type="button" onClick={handleClick}>
            <MoveLeft className="w-10 h-10" />
          </button>
          <h3 className="font-bold text-xl my-3">Filtres</h3>
          <button type="button" onClick={handleClick}>
            <Plus className="w-10 h-10 rotate-45" />
          </button>
        </div>

        <div className="w-full bg-slate-300 h-1 mb-2 xl:hidden">
          <div className=" w-11/12 bg-primary h-1" />
        </div>

        <FilterCircuitsListForm
          searchState={searchState}
          openState={openState}
        />
      </aside>
    </section>
  );
}

export default FilterCircuitsList;
