import { createAsyncThunk } from '@reduxjs/toolkit';

import { Session } from '../../domain/entities/auth';

import api from '../../../infracstructure/config/axios';

export const fetchSession = createAsyncThunk(
  'settings/fetchSession',
  async (): Promise<Session> => {
    try {
      const { data } = await api.get<Session>('session');

      return data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
