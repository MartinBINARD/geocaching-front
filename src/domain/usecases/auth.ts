import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../../services/axios';

import {
  EmailForm,
  LoginForm,
  RegisterForm,
  RegisterSucces,
  UpdateCredentials,
  Session,
  User,
} from '../entities/auth';

import formatUserDataForm from './utils/formatUserDataForm';
import formatUserUpdateCredentials from './utils/formatUserUpdateCredentials';

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

export const checkUserAccountConfirmation = createAsyncThunk(
  'settings/confirm-user-account',
  async (token: string): Promise<boolean> => {
    try {
      const { data } = await api.get(`verify?token=${token}`);

      return data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const logout = createAsyncThunk(
  'settings/logout',
  async (): Promise<null> => {
    try {
      const { data } = await api.get(`/logout`);

      return data?.message;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'settings/forgot-password',
  async (form: EmailForm): Promise<void> => {
    try {
      const objData = formatUserDataForm(form);

      await api.post('ask-password', objData);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const updatePassword = createAsyncThunk(
  'settings/update-password',
  async (credentials: UpdateCredentials): Promise<void> => {
    try {
      const objData = formatUserUpdateCredentials(credentials);

      await api.patch('reset-password', objData);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

const authReducer = createReducer(intialAuthState, (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.registerErrorMessage = '';
      toast.success(action.payload.message);
      state.isLoading = false;
    })
    .addCase(register.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.registerErrorMessage = action.error.message!;
      state.isLoading = false;
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      toast.success('Vous êtes connecté');
    })
    .addCase(login.rejected, (state, action) => {
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
    .addCase(checkUserAccountConfirmation.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkUserAccountConfirmation.fulfilled, (state) => {
      state.isAccountConfirmed = true;
      toast.success('Compte approuvé !');
      state.isLoading = false;
    })
    .addCase(checkUserAccountConfirmation.rejected, (state) => {
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
      toast('Réinitialisation effectuée !');
      state.isLoading = false;
    })
    .addCase(updatePassword.rejected, (state) => {
      toast('Erreur de mot de passe !');
      state.isLoading = false;
    });
});

export default authReducer;
