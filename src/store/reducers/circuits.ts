import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from '../../service/axios';
import filteredList from '../../utils/FilteredList';

import {
  Circuit,
  SearchState,
  UserCircuitAnswersState,
  UserCircuitAnswersResultState,
  UserCircuitAnswersEntriesState,
  CircuitQuizStep,
  CircuitPathStep,
} from '../../@types/circuit';
import createCircuitQuizStepper from '../../utils/createCircuitQuizStepper';

interface CircuitState {
  circuitsList: Circuit[];
  searchList: Circuit[];
  isSearchResult: boolean;
  errorMessage: string | undefined;
  oneCircuit: Circuit | null;
  circuitQuiz: CircuitQuizStep[];
  userCircuitAnswerEntries: UserCircuitAnswersEntriesState | null;
  userCircuitAnswersResult: UserCircuitAnswersResultState | null;
  isLoading: boolean;
  noCircuit: boolean;
}

const initialState: CircuitState = {
  circuitsList: [],
  searchList: [],
  isSearchResult: true,
  errorMessage: '',
  oneCircuit: null,
  circuitQuiz: [],
  userCircuitAnswerEntries: null,
  userCircuitAnswersResult: null,
  isLoading: false,
  noCircuit: false,
};

export const fetchCircuitsList = createAsyncThunk(
  'circuits/fetch-circuits-list',
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

export const searchCircuitsList = createAction<SearchState>(
  'circuits/search-circuits-list'
);

export const fetchCircuit = createAsyncThunk(
  'circuits/fetch-circuit',
  async (id: string): Promise<Circuit> => {
    try {
      const { data } = await api.get<Circuit>(`circuits/${id}`);

      return data;
    } catch (error: unknown) {
      /* Specify known AxiosError Type to solve eslint warning.
      Typscript cannot predict server error but do it on AxiosError Instance */
      const err = error as AxiosError;
      throw err.response ? err.response.data : err.message;
    }
  }
);

export const storeCircuitQuiz = createAction<CircuitPathStep[]>(
  'circuits/store-ciruit-quiz'
);

export const storeUserCircuitAnswers =
  createAction<UserCircuitAnswersEntriesState>('circuits/store-user-answser');

export const sendAnswers = createAsyncThunk(
  'circuits/send-answers',
  async (
    answersEntries: UserCircuitAnswersState
  ): Promise<UserCircuitAnswersResultState> => {
    try {
      const { data } = await api.post<UserCircuitAnswersResultState>(
        `circuits/${answersEntries.id_circuit}/answer`,
        answersEntries
      );

      return data;
    } catch (error: unknown) {
      /* Specify known AxiosError Type to solve eslint warning.
      Typscript cannot predict server error but do it on AxiosError Instance */
      const err = error as AxiosError;
      throw err.response ? err.response.data : err.message;
    }
  }
);

const circuitsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCircuitsList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuitsList.fulfilled, (state, action) => {
      /* Reset isSearchResult to true in case of user navigating through
      application, previous negative search message must be not displayed */
      state.isSearchResult = true;
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

      state.isSearchResult = !!searchListResult.length;
      state.searchList = searchListResult;
    })
    .addCase(fetchCircuit.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCircuit.fulfilled, (state, action) => {
      state.oneCircuit = action.payload;
      state.isLoading = false;
      state.noCircuit = false;
    })
    .addCase(fetchCircuit.rejected, (state, action) => {
      toast(action.error.message);
      state.isLoading = false;
      state.noCircuit = true;
    })
    .addCase(storeCircuitQuiz, (state, action) => {
      const formatArrayStepper = createCircuitQuizStepper(
        action.payload
      ) as CircuitQuizStep[];

      state.circuitQuiz = formatArrayStepper;
    })
    .addCase(storeUserCircuitAnswers, (state, action) => {
      state.userCircuitAnswerEntries = {
        ...state.userCircuitAnswerEntries,
        ...action.payload,
      };
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
