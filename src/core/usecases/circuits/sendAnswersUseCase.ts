import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  UserCircuitAnswersResultState,
  UserCircuitEntriesState,
} from '../../domain/entities/circuit';
import formatUserCircuitEntries from '../utils/formatUserCircuitEntries';
import api from '../../../infracstructure/config/axios';

export const sendAnswers = createAsyncThunk(
  'circuits/send-answers',
  async (
    userCircuitEntries: UserCircuitEntriesState
  ): Promise<UserCircuitAnswersResultState> => {
    try {
      const { circuitId } = userCircuitEntries;
      const objectData = formatUserCircuitEntries(userCircuitEntries);

      const { data } = await api.post<UserCircuitAnswersResultState>(
        `circuits/${circuitId}/answer`,
        objectData
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
