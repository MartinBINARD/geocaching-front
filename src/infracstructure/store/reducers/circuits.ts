import { createReducer } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { SearchCircuitsRequest } from '../../../core/adapters/requests';
import {
  StepsEntriesState,
  UserCircuitAnswersResultState,
} from '../../../core/domain/entities/circuit';
import {
  Circuit,
  CircuitQuizList,
  CircuitsList,
} from '../../../core/domain/entities';

import {
  resetCircuitQuiz,
  storeStepEntries,
  sendAnswers,
} from '../../../core/usecases';

import {
  fetchCircuitsListThunk,
  fetchCircuitThunk,
  filterCircuitsListThunk,
  getCircuitQuizThunk,
} from '../thunks';

import { resetFilterCircuitsListAction } from '../actions';

interface CircuitState {
  circuitsList: CircuitsList;
  searchSelectorsFilterEntries: SearchCircuitsRequest | null;
  searchList: CircuitsList;
  isSearchNoResult: boolean;
  errorMessage: string | undefined;
  oneCircuit: Circuit | null;
  circuitQuiz: CircuitQuizList | [];
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
    .addCase(filterCircuitsListThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(filterCircuitsListThunk.fulfilled, (state, action) => {
      state.searchList = action.payload;
      state.isSearchNoResult = false;
      state.isLoading = false;

      state.searchSelectorsFilterEntries = {
        ...state.searchSelectorsFilterEntries,
        ...action.meta.arg.search,
      };
    })
    .addCase(filterCircuitsListThunk.rejected, (state, action) => {
      state.isSearchNoResult = true;
      state.isLoading = false;
      toast.error(action.error.message);
    })
    .addCase(resetFilterCircuitsListAction, (state) => {
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
    .addCase(getCircuitQuizThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getCircuitQuizThunk.fulfilled, (state, action) => {
      state.circuitQuiz = action.payload;
      state.isLoading = false;
    })
    .addCase(getCircuitQuizThunk.rejected, (state, action) => {
      toast.error(action.error.message);
      state.isLoading = false;
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
