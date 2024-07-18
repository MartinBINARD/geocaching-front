import { createReducer } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import {
  SearchState,
  StepsEntriesState,
  UserCircuitAnswersResultState,
  CircuitQuizStep,
  CircuitPath,
  Search,
} from '../../../core/domain/entities/circuit';
import { CircuitsList } from '../../../core/domain/entities';

import {
  resetSearchCircuitsList,
  storeCircuitQuiz,
  resetCircuitQuiz,
  storeStepEntries,
  sendAnswers,
} from '../../../core/usecases';

import { fetchCircuitsListThunk, fetchCircuitThunk } from '../thunks';

import createCircuitQuizStepper from '../../../core/usecases/utils/createCircuitQuizStepper';
import filteredList from '../../../core/usecases/utils/FilteredList';
import { FilterCircuitListRequest } from '../../../core/adapters/requests';
import { filterCircuitsListAction } from '../actions/circuits/filterCircuitsListAction';

interface CircuitState {
  circuitsList: CircuitsList;
  searchSelectorsFilterEntries: Search | null;
  searchList: CircuitsList;
  isSearchNoResult: boolean;
  errorMessage: string | undefined;
  oneCircuit: CircuitPath | null;
  circuitQuiz: CircuitQuizStep[];
  stepsEntries: StepsEntriesState | null;
  userCircuitAnswersResult: UserCircuitAnswersResultState | null;
  isLoading: boolean;
  isFetchCircuitFailed: boolean;
}

export const initialCircuitsState: CircuitState = {
  circuitsList: [],
  searchSelectorsFilterEntries: null,
  searchList: [],
  isSearchNoResult: false,
  errorMessage: '',
  oneCircuit: null,
  circuitQuiz: [],
  stepsEntries: null,
  userCircuitAnswersResult: null,
  isLoading: false,
  isFetchCircuitFailed: false,
};

const circuitsReducer = createReducer(initialCircuitsState, (builder) => {
  builder
    .addCase(fetchCircuitsListThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuitsListThunk.fulfilled, (state, action) => {
      /* Reset isSearchResult to true in case of user navigating through
      application, previous negative search message must be not displayed */
      state.circuitsList = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchCircuitsListThunk.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isLoading = false;
    })
    .addCase(filterCircuitsListAction, (state, action) => {
      const { search, circuitsList }: FilterCircuitListRequest = action.payload;
      const searchListResult = filteredList(search, circuitsList);

      if (!searchListResult.length) {
        toast.error('Aucun résulat ne correspond à votre recherche !');
      }

      state.isSearchNoResult = !searchListResult.length;
      state.searchSelectorsFilterEntries = {
        ...state.searchSelectorsFilterEntries,
        ...search,
      };
      state.searchList = searchListResult;
    })
    .addCase(resetSearchCircuitsList, (state) => {
      state.isSearchNoResult = false;
      state.searchSelectorsFilterEntries = null;
      state.searchList = [];
    })
    .addCase(fetchCircuitThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuitThunk.fulfilled, (state, action) => {
      state.oneCircuit = action.payload;
      state.isLoading = false;
      state.isFetchCircuitFailed = false;
    })
    .addCase(fetchCircuitThunk.rejected, (state, action) => {
      toast.error(action.error.message);
      state.isLoading = false;
      state.isFetchCircuitFailed = true;
    })
    .addCase(storeCircuitQuiz, (state, action) => {
      const formatArrayStepper = createCircuitQuizStepper(
        action.payload
      ) as CircuitQuizStep[];

      state.circuitQuiz = formatArrayStepper;
    })
    .addCase(storeStepEntries, (state, action) => {
      state.stepsEntries = {
        ...state.stepsEntries,
        ...action.payload,
      };
    })
    .addCase(resetCircuitQuiz, (state) => {
      state.stepsEntries = null;
      state.userCircuitAnswersResult = null;
    })
    .addCase(sendAnswers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendAnswers.fulfilled, (state, action) => {
      state.userCircuitAnswersResult = action.payload;
      state.isLoading = false;
    })
    .addCase(sendAnswers.rejected, (state) => {
      toast.error(
        `Une erreur s'est produite lors de l'envoie de vos réponse, Veuillez essayer de nouveau.`
      );
      state.isLoading = false;
    });
});

export default circuitsReducer;
