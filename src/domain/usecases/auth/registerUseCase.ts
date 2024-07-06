import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../infracstructure/config/axios';

import { RegisterForm, RegisterSucces } from '../../entities/auth';

export const register = createAsyncThunk(
  'settings/register',
  async (formData: RegisterForm): Promise<RegisterSucces> => {
    try {
      const objData = Object.fromEntries(formData.entries());

      const { data } = await api.post<RegisterSucces>('register', objData);

      return data;
    } catch (error) {
      if (error.response.data.error) {
        const errorMessage = error.response.data.error;

        if (errorMessage.includes('user_email_key')) {
          throw new Error(`Cette adresse email n'est pas valide`);
        }

        if (errorMessage.includes('user_pseudo_key')) {
          throw new Error(`Ce pseudo n'est pas valide`);
        }

        throw new Error(errorMessage);
      }

      throw new Error(
        'Désolé, nous rencontrons quelques problèmes techniques. Veuillez essayer de nouveau.'
      );
    }
  }
);
