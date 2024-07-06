import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../infracstructure/config/axios';

export const logout = createAsyncThunk(
  'settings/logout',
  async (): Promise<null> => {
    try {
      const { data } = await api.get(`/logout`);

      return data?.message;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
