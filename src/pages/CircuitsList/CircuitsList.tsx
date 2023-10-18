import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Map from '../../components/Map/Map';
import Loader from '../../components/Loader/Loader';
import { fetchCircuitsList } from '../../store/reducers/circuits';
import FilterCircuitsList from '../../components/FilterCircuitsLists/FilterCircuitsList';
import CircuitListCard from '../../components/CircuitsListCard/CircuitsListCard';

function CircuitsList() {
  const errorMessage = useAppSelector((state) => state.circuits.errorMessage);
  const loading = useAppSelector((state) => state.circuits.loading);
  /* First load all circuitsList by default or when empty search value is
  submitted. Replace all circuitsList prop by searchList when updating from store
  / submitting from FilterCircuitsList component */
  const circuitsList = useAppSelector((state) => state.circuits.circuitsList);
  const searchList = useAppSelector((state) => state.circuits.searchList);
  /* If no search result, so show warning message but show all markers on map and
  list because center point calculated with markers coordonates is required
  to build map */
  const isSearchResult = useAppSelector(
    (state) => state.circuits.isSearchResult
  );

  const list = searchList.length ? searchList : circuitsList;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCircuitsList());
  }, [dispatch]);

  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return loading || !circuitsList.length ? (
    <Loader />
  ) : (
    <section className="flex-grow-1 flex flex-col m-auto max-lg:px-1">
      <h2 className="font-bold text-4xl text-center mb-5 lg:p-4 max-lg:text-xl">
        Choisis ton parcours
      </h2>

      <div className="overflow-hidden w-full flex flex-col content-center items-center">
        <FilterCircuitsList list={circuitsList} />
        {!isSearchResult && (
          <p className="text-center break-words text-lg text-secondary font-extrabold pt-2 lg:pt-4">
            Aucun résulat ne correspond à votre recherche !
          </p>
        )}
        <div className="w-full overflow-y-hidden flex justify-between mt-4 max-lg:flex-wrap">
          <Map
            data={list}
            className="h-[60vh] w-full lg:w-1/2 rounded-lg shadow-xl max-md:h-[30vh]"
          />
          <CircuitListCard list={list} />
        </div>
      </div>
    </section>
  );
}

export default CircuitsList;
