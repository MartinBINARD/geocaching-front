import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/axios';

export const checkUserAccountConfirmation = createAsyncThunk(
  'settings/confirm-user-account',
  async (token: string): Promise<boolean> => {
    try {
      const { data } = await api.get(`verify?token=${token}`);

      return data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
