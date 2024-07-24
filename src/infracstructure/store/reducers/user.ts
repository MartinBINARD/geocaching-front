import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Profile } from '../../../core/domain/entities';
import {
  deleteProfileThunk,
  getProfileThunk,
  updateProfileThunk,
} from '../thunks';

interface ProfileState {
  profile: Profile | null;
  isProfileLoading: boolean;
  errorMessage: string | null;
  isUpdateLoading: boolean;
  isProfileDelete: boolean;
}

export const intialUserState: ProfileState = {
  profile: null,
  isProfileLoading: false,
  errorMessage: null,
  isUpdateLoading: false,
  isProfileDelete: false,
};

const userReducer = createReducer(intialUserState, (builder) => {
  builder
    .addCase(getProfileThunk.pending, (state) => {
      state.isProfileLoading = true;
    })
    .addCase(getProfileThunk.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isProfileLoading = false;
    })
    .addCase(getProfileThunk.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.errorMessage = action.error.message!;
      state.isProfileLoading = false;
    })
    .addCase(updateProfileThunk.pending, (state) => {
      state.isUpdateLoading = true;
    })
    .addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isUpdateLoading = false;
      state.errorMessage = null;
      toast.success('Votre profil a bien été mis à jour');
    })
    .addCase(updateProfileThunk.rejected, (state, action) => {
      state.profile = null;
      state.isUpdateLoading = false;
      state.errorMessage = action.error.message!;
      toast.error(action.error.message!);
    })
    .addCase(deleteProfileThunk.pending, (state) => {
      state.isProfileLoading = true;
      state.isProfileDelete = false;
    })
    .addCase(deleteProfileThunk.fulfilled, (state, action) => {
      state.isProfileLoading = false;
      state.profile = null;
      state.isProfileDelete = action.payload;
      toast.success('Votre compte utilisateur a bien été supprimé');
    })
    .addCase(deleteProfileThunk.rejected, (state, action) => {
      state.isProfileLoading = false;
      state.isProfileDelete = false;
      toast.error(action.error.message!);
    });
});

export default userReducer;
