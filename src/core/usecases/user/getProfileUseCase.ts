import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../infracstructure/config/axios';
import { Profile } from '../../domain/entities/user';

export const getProfile = createAsyncThunk('user/get-profile', async () => {
  try {
    const { data } = await api.get<Profile>('profile');

    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});
