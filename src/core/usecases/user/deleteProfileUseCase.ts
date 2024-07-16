import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../infracstructure/config/axios';

export const deleteProfile = createAsyncThunk(
  'user/delete-profile',
  async (): Promise<boolean> => {
    try {
      await api.delete('profile');

      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
