import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from '../../service/axios';
import filteredList from '../../utils/FilteredList';

import { Circuit, SearchState, Step } from '../../@types/circuit';

interface AnswerState {
  id_user: number;
  id_circuit: number;
  steps: Step[];
}

interface CircuitState {
  circuitsList: Circuit[];
  searchList: Circuit[];
  isSearchResult: boolean;
  errorMessage: string | undefined;
  oneCircuit: Circuit | null;
  answers: AnswerState | null;
  alreadyDid: boolean;
  loading: boolean;
  noCircuit: boolean;
}

const initialState: CircuitState = {
  circuitsList: [],
  searchList: [],
  isSearchResult: true,
  errorMessage: '',
  oneCircuit: null,
  answers: null,
  alreadyDid: false,
  loading: false,
  noCircuit: false,
};

export const fetchCircuitsList = createAsyncThunk(
  'circuits/fetchCircuitsList',
  async (): Promise<Circuit[]> => {
    try {
      const { data } = await api.get<Circuit[]>('circuits');

      return data;
    } catch (error: unknown) {
      /* Specify known AxiosError Type to solve eslint warning.
      Typscript cannot predict server error but do it on AxiosError Instance */
      const err = error as AxiosError;
      throw err.response ? err.response.data : err.message;
    }
  }
);

export const fetchCircuit = createAsyncThunk(
  'circuits/fetchCircuit',
  async (id: number): Promise<Circuit> => {
    try {
      const response = await api.get<Circuit>(`circuits/${id}`);
      return response.data;
    } catch (error: unknown) {
      /* Specify known AxiosError Type to solve eslint warning.
      Typscript cannot predict server error but do it on AxiosError Instance */
      const err = error as AxiosError;
      throw err.response ? err.response.data : err.message;
    }
  }
);

export const sendAnswers = createAsyncThunk(
  'circuits/sendAnswers',
  async (answers: AnswerState): Promise<AnswerState> => {
    try {
      const response = await api.post<AnswerState>(
        `circuits/${answers.id_circuit}/answer`,
        answers
      );
      return response.data;
    } catch (error: unknown) {
      /* Specify known AxiosError Type to solve eslint warning.
      Typscript cannot predict server error but do it on AxiosError Instance */
      const err = error as AxiosError;
      throw err.response ? err.response.data : err.message;
    }
  }
);

export const searchCircuitsList = createAction<SearchState>(
  'circuits/searchCircuits'
);

const circuitsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCircuitsList.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCircuitsList.fulfilled, (state, action) => {
      /* Reset isSearchResult to true in case of user navigating through
      application, previous negative search message must be not displayed */
      state.isSearchResult = true;
      state.circuitsList = action.payload;
      state.loading = false;
    })
    .addCase(fetchCircuitsList.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.loading = false;
    })
    .addCase(searchCircuitsList, (state, action) => {
      const { search, list }: SearchState = action.payload;
      const searchListResult = filteredList(search, list);

      state.isSearchResult = !!searchListResult.length;
      state.searchList = searchListResult;
    })
    .addCase(fetchCircuit.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCircuit.fulfilled, (state, action) => {
      state.oneCircuit = action.payload;
      state.loading = false;
      state.noCircuit = false;
    })
    .addCase(fetchCircuit.rejected, (state, action) => {
      toast(action.error.message);
      state.loading = false;
      state.noCircuit = true;
    })
    .addCase(sendAnswers.pending, (state) => {
      state.loading = true;
    })
    .addCase(sendAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
      state.loading = false;
    })
    .addCase(sendAnswers.rejected, (state) => {
      state.alreadyDid = true;
      toast(
        'Toutes les réponses sont bonnes mais vous avez déjà terminé ce circuit'
      );
      state.loading = false;
    });
});

export default circuitsReducer;
