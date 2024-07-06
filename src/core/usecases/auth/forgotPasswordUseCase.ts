import { createAsyncThunk } from '@reduxjs/toolkit';
import { EmailForm } from '../../domain/entities/auth';
import api from '../../../infracstructure/config/axios';
import formatUserDataForm from '../utils/formatUserDataForm';

export const forgotPassword = createAsyncThunk(
  'settings/forgot-password',
  async (form: EmailForm): Promise<boolean> => {
    try {
      const objData = formatUserDataForm(form);

      await api.post('ask-password', objData);

      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
