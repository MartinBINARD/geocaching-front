import { createReducer } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { SearchCircuitsRequest } from '../../../core/adapters/requests';
import {
  Circuit,
  CircuitQuizList,
  CircuitsList,
  UserQuizResult,
} from '../../../core/domain/entities';

import {
  fetchCircuitQuizThunk,
  fetchCircuitsListThunk,
  fetchCircuitThunk,
  filterCircuitsListThunk,
  sendUserQuizAnswersThunk,
} from '../thunks';

import {
  resetFilterCircuitsListAction,
  resetQuizStepsAnswersAction,
  storeQuizStepsAnswersAction,
} from '../actions';

interface CircuitState {
  circuitsList: CircuitsList;
  searchSelectorsFilterEntries: SearchCircuitsRequest | null;
  searchList: CircuitsList;
  isSearchNoResult: boolean;
  errorMessage: string | undefined;
  oneCircuit: Circuit | null;
  circuitQuiz: CircuitQuizList | [];
  quizStepsAnswers: Record<string, string> | null;
  userQuizResult: UserQuizResult | null;
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
  quizStepsAnswers: null,
  userQuizResult: null,
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
    .addCase(fetchCircuitQuizThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuitQuizThunk.fulfilled, (state, action) => {
      state.circuitQuiz = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchCircuitQuizThunk.rejected, (state, action) => {
      toast.error(action.error.message);
      state.isLoading = false;
    })
    .addCase(storeQuizStepsAnswersAction, (state, action) => {
      state.quizStepsAnswers = {
        ...state.quizStepsAnswers,
        ...action.payload,
      };
    })
    .addCase(resetQuizStepsAnswersAction, (state) => {
      state.quizStepsAnswers = null;
      state.userQuizResult = null;
    })
    .addCase(sendUserQuizAnswersThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(sendUserQuizAnswersThunk.fulfilled, (state, action) => {
      state.userQuizResult = action.payload;
      state.isLoading = false;
    })
    .addCase(sendUserQuizAnswersThunk.rejected, (state, action) => {
      toast.error(action.error.message);
      state.isLoading = false;
    });
});

export default circuitsReducer;
