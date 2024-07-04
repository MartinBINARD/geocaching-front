import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Circuit } from '../../entities/circuit';
import api from '../../../services/axios';

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
