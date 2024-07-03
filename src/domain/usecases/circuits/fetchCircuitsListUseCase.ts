import { createAsyncThunk } from '@reduxjs/toolkit';
import { Circuit } from '../../entities/circuit';
import api from '../../../services/axios';
import { AxiosError } from 'axios';

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
