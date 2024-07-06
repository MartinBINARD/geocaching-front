import { createAsyncThunk } from '@reduxjs/toolkit';

import { LoginForm, User } from '../../entities/auth';

import formatUserDataForm from '../utils/formatUserDataForm';
import api from '../../../infracstructure/config/axios';

export const login = createAsyncThunk(
  'settings/login',
  async (form: LoginForm): Promise<User> => {
    try {
      const objData = formatUserDataForm(form);

      const { data } = await api.post<User>('login', objData);

      return data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
);
