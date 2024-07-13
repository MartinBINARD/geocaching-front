import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateCredentials } from '../../domain/entities/auth';
import formatUserUpdateCredentials from '../utils/formatUserUpdateCredentials';
import api from '../../../infracstructure/config/axios';

export const updatePassword = createAsyncThunk(
  'settings/update-password',
  async (credentials: UpdateCredentials): Promise<boolean> => {
    try {
      const objData = formatUserUpdateCredentials(credentials);

      await api.patch('reset-password', objData);

      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
