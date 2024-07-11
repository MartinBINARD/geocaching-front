import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { User } from '../../../core/domain/entities/User';

import {
  fetchSession,
  logout,
  forgotPassword,
  updatePassword,
} from '../../../core/domain';
import { checkAccountThunk } from '../thunks/auth/checkAccountThunk';
import { loginThunk } from '../thunks/auth/LoginThunk';
import { registerThunk } from '../thunks/auth/RegisterThunk';

interface AuthState {
  user: User | null;
  loginErrorMessage: string | null;
  isRegistered: boolean | null;
  registerErrorMessage: string;
  isAccountConfirmed: boolean;
  isReset: boolean;
  isLoading: boolean;
}

export const intialAuthState: AuthState = {
  user: null,
  loginErrorMessage: null,
  isRegistered: null,
  registerErrorMessage: '',
  isAccountConfirmed: false,
  isReset: false,
  isLoading: false,
};

const authReducer = createReducer(intialAuthState, (builder) => {
  builder
    .addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerThunk.fulfilled, (state, action) => {
      state.registerErrorMessage = '';
      toast.success(action.payload.message);
      state.isLoading = false;
    })
    .addCase(registerThunk.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.registerErrorMessage = action.error.message!;
      state.isLoading = false;
    })
    .addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      toast.success('Vous êtes connecté');
    })
    .addCase(loginThunk.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.loginErrorMessage = action.error.message!;
      state.isLoading = false;
    })
    .addCase(fetchSession.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(fetchSession.rejected, () => {
      toast.error('Impossible de se connecté à la session');
    })
    .addCase(logout.fulfilled, (state, action) => {
      toast.success(action.payload);
      state.user = null;
    })
    .addCase(logout.rejected, () => {
      toast.error(
        'Impossible de vous déconnecté, veuillez essayer ultérieurement'
      );
    })
    .addCase(checkAccountThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkAccountThunk.fulfilled, (state) => {
      state.isAccountConfirmed = true;
      toast.success('Compte approuvé !');
      state.isLoading = false;
    })
    .addCase(checkAccountThunk.rejected, (state) => {
      state.isAccountConfirmed = false;
      toast.error('Une erreur est survenue');
      state.isLoading = false;
    })
    .addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Vérifiez vos email !');
    })
    .addCase(forgotPassword.rejected, (state) => {
      state.isLoading = false;
      toast.error('Email invalide');
    })
    .addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updatePassword.fulfilled, (state) => {
      state.isRegistered = true;
      state.isLoading = false;
      toast('Réinitialisation effectuée !');
    })
    .addCase(updatePassword.rejected, (state) => {
      state.isRegistered = false;
      state.isLoading = false;
      toast('Erreur de mot de passe !');
    });
});

export default authReducer;
