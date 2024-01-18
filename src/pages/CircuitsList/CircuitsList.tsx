import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchCircuitsList } from '../../store/reducers/circuits';

import Map from '../../components/Map/Map';
import Loader from '../../loader/Loader';
import FilterCircuitsList from '../../components/FilterCircuitsLists/FilterCircuitsList';
import CircuitListCard from '../../components/CircuitsListCard/CircuitsListCard';

function CircuitsList() {
  const errorMessage = useAppSelector((state) => state.circuits.errorMessage);
  const isLoading = useAppSelector((state) => state.circuits.isLoading);
  /* First load all circuitsList by default or when empty search value is
  submitted. Replace all circuitsList prop by searchList when updating from store
  / submitting from FilterCircuitsList component */
  const circuitsList = useAppSelector((state) => state.circuits.circuitsList);
  const searchList = useAppSelector((state) => state.circuits.searchList);
  /* If no search result, so show warning message but show all markers on map and
  list because center point calculated with markers coordonates is required
  to build map */

  const list = searchList.length ? searchList : circuitsList;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCircuitsList());
  }, [dispatch]);

  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return isLoading || !circuitsList.length ? (
    <Loader />
  ) : (
    <section className="flex-grow-1 flex flex-col m-auto max-lg:px-1">
      <h2 className="font-bold text-4xl text-center mb-5 lg:p-4 max-lg:text-xl">
        Choisis ton parcours
      </h2>

      <div className="overflow-hidden w-full flex flex-col content-center items-center">
        <FilterCircuitsList />

        <div className="w-full flex flex-col gap-4 items-center overflow-y-hidden mt-4 xl:flex-row">
          {list?.length && (
            <Map
              markersList={list}
              zoom={6}
              className="z-0 h-[30vh] w-full rounded-lg shadow-xl xl:h-[60vh]"
            />
          )}
          <CircuitListCard list={list} />
        </div>
      </div>
    </section>
  );
}

export default CircuitsList;
