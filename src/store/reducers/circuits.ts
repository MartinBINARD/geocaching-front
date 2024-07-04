import { createReducer } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import {
  Circuit,
  SearchState,
  StepsEntriesState,
  UserCircuitAnswersResultState,
  CircuitQuizStep,
  CircuitPath,
  Search,
} from '../../domain/entities/circuit';

import {
  fetchCircuitsList,
  searchCircuitsList,
  resetSearchCircuitsList,
  fetchCircuit,
  storeCircuitQuiz,
  resetCircuitQuiz,
  storeStepEntries,
  sendAnswers,
} from '../../domain';

import createCircuitQuizStepper from '../../domain/usecases/utils/createCircuitQuizStepper';
import filteredList from '../../domain/usecases/utils/FilteredList';

interface CircuitState {
  circuitsList: Circuit[];
  searchSelectorsFilterEntries: Search | null;
  searchList: Circuit[];
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
    .addCase(fetchCircuitsList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuitsList.fulfilled, (state, action) => {
      /* Reset isSearchResult to true in case of user navigating through
      application, previous negative search message must be not displayed */
      state.circuitsList = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchCircuitsList.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isLoading = false;
    })
    .addCase(searchCircuitsList, (state, action) => {
      const { search, list }: SearchState = action.payload;
      const searchListResult = filteredList(search, list);

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
    .addCase(fetchCircuit.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuit.fulfilled, (state, action) => {
      state.oneCircuit = action.payload;
      state.isLoading = false;
      state.isFetchCircuitFailed = false;
    })
    .addCase(fetchCircuit.rejected, (state, action) => {
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
