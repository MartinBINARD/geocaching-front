import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import api from '../../service/axios';

import { Profile } from '../../@types/user';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  errorMessage: string | null;
}

const intialState: ProfileState = {
  profile: null,
  loading: false,
  errorMessage: null,
};

export const getProfile = createAsyncThunk('user/get-profile', async () => {
  try {
    const { data } = await api.get<Profile>('profile');

    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

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
    });
});

export default userReducer;
