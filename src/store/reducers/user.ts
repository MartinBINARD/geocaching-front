import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Profile, UpdateProfileForm } from '../../@types/user';

import api from '../../service/axios';
import formatUserDataForm from '../../utils/formatUserDataForm';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  errorMessage: string | null;
  isProfileEdit: boolean;
}

const intialState: ProfileState = {
  profile: null,
  loading: false,
  errorMessage: null,
  isProfileEdit: false,
};

export const getProfile = createAsyncThunk('user/get-profile', async () => {
  try {
    const { data } = await api.get<Profile>('profile');

    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

export const updateProfile = createAsyncThunk(
  'user/update-profile',
  async (form: UpdateProfileForm): Promise<void> => {
    try {
      const objData = formatUserDataForm(form);

      await api.patch('profile', objData);
    } catch (error) {
      throw error && `Une erreur s'est produite. Veuillez essayer de nouveau.`;
    }
  }
);

const userReducer = createReducer(intialState, (builder) => {
  builder
    .addCase(getProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    .addCase(getProfile.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.errorMessage = action.error.message!;
      state.loading = false;
    })
    .addCase(updateProfile.pending, (state) => {
      state.isProfileEdit = true;
    })
    .addCase(updateProfile.fulfilled, (state) => {
      state.isProfileEdit = false;
      toast.success('Votre profil a bien été mis à jour');
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.isProfileEdit = true;
      state.errorMessage = action.error.message!;
    });
});

export default userReducer;
