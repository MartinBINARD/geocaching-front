import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../../service/axios';

import {
  LoginForm,
  RegisterForm,
  RegisterSucces,
  ResetState,
  Session,
  User,
} from '../../@types/setting';

import formatUserDataFrom from '../../utils/formatUserDataForm';

interface SettingState {
  user: User | null;
  isLogin: boolean;
  loginErrorMessage: string | null;
  isRegistered: boolean | null;
  registerErrorMessage: string;
  isAccountConfirmed: boolean;
  isReset: boolean;
  isLoading: boolean;
}

const intialState: SettingState = {
  user: null,
  isLogin: false,
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
      const objData = formatUserDataFrom(form);

      const { data } = await api.post<User>('login', objData);

      return data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
);

export const session = createAsyncThunk(
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
      await api.get(`verify?token=${token}`);
      return true;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const logout = createAsyncThunk(
  'settings/logout',
  async (): Promise<null> => {
    try {
      await api.get(`/logout`);
      return null;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const askPassword = createAsyncThunk(
  'settings/askPassword',
  async (formData: HTMLFormElement): Promise<void> => {
    try {
      const objData = Object.fromEntries(formData.entries());

      await api.post('ask-password', objData);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const resetPassword = createAsyncThunk(
  'settings/resetPassword',
  async ({ formData, token, userId }: ResetState): Promise<void> => {
    try {
      const objData = Object.fromEntries(formData.entries());

      objData.token = token;
      objData.user_id = userId;
      await api.patch('reset-password', objData);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

const settingsReducer = createReducer(intialState, (builder) => {
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

      toast.success('Vous êtes connecté');
      state.isLogin = true;
      state.isLoading = false;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLogin = false;
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.loginErrorMessage = action.error.message!;
      state.isLoading = false;
    })
    .addCase(session.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(session.rejected, (state) => {
      state.isLogin = false;
      toast.error('Impossible de se connecté à la session');
    })
    .addCase(logout.fulfilled, (state) => {
      toast.success('Vous êtes déconnecté');
      state.user = null;
      state.isLogin = false;
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
    .addCase(askPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(askPassword.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Vérifiez vos email !');
    })
    .addCase(askPassword.rejected, (state) => {
      state.isLoading = false;
      toast.error('Email invalide');
    })
    .addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.isRegistered = true;
      toast('Réinitialisation effectuée !');
      state.isLoading = false;
    })
    .addCase(resetPassword.rejected, (state) => {
      toast('Erreur de mot de passe !');
      state.isLoading = false;
    });
});

export default settingsReducer;
