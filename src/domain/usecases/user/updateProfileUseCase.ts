import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile, UpdateProfileForm } from '../../entities/user';
import formatUserDataForm from '../utils/formatUserDataForm';
import api from '../../../services/axios';

export const updateProfile = createAsyncThunk(
  'user/update-profile',
  async (form: UpdateProfileForm): Promise<Profile> => {
    try {
      const objData = formatUserDataForm(form);

      const { data } = await api.patch('profile', objData);

      return data;
    } catch (error) {
      throw error && `Une erreur s'est produite. Veuillez essayer de nouveau.`;
    }
  }
);
