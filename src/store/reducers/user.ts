import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Profile, UpdateProfileForm } from '../../@types/user';

import api from '../../service/axios';
import formatUserDataForm from '../../utils/formatUserDataForm';

interface ProfileState {
  profile: Profile | null;
  isProfileLoading: boolean;
  errorMessage: string | null;
  isUpdateLoading: boolean;
}

const intialState: ProfileState = {
  profile: null,
  isProfileLoading: false,
  errorMessage: null,
  isUpdateLoading: false,
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
      state.isProfileLoading = true;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isProfileLoading = false;
    })
    .addCase(getProfile.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.errorMessage = action.error.message!;
      state.isProfileLoading = false;
    })
    .addCase(updateProfile.pending, (state) => {
      state.isUpdateLoading = true;
    })
    .addCase(updateProfile.fulfilled, (state) => {
      state.isUpdateLoading = false;
      state.errorMessage = null;
      toast.success('Votre profil a bien été mis à jour');
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.isUpdateLoading = false;
      state.errorMessage = action.error.message!;
      toast.error(action.error.message!);
    });
});

export default userReducer;
