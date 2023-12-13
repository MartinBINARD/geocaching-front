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
  isLoginSuccess: boolean;
  loginErrorMessage: string | null;
  isRegistered: boolean | null;
  registerError: string;
  isVerified: boolean;
  isReset: boolean;
  loading: boolean;
}

const intialState: SettingState = {
  user: null,
  isLoginSuccess: true,
  loginErrorMessage: null,
  isRegistered: null,
  registerError: '',
  isVerified: false,
  isReset: false,
  loading: false,
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

export const verify = createAsyncThunk(
  'settings/verify',
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
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.registerError = '';
      toast.success(action.payload.message);
      state.loading = false;
    })
    .addCase(register.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.registerError = action.error.message!;
      state.loading = false;
    })
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;

      toast.success('Vous êtes connecté');
      state.isLoginSuccess = true;
      state.loading = false;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoginSuccess = false;
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.loginErrorMessage = action.error.message!;
      state.loading = false;
    })
    .addCase(session.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(session.rejected, (state) => {
      state.isLoginSuccess = false;
      toast.error('Impossible de se connecté à la session');
    })
    .addCase(logout.fulfilled, (state) => {
      toast.success('Vous êtes déconnecté');
      state.user = null;
      state.isVerified = false;
    })
    .addCase(logout.rejected, () => {
      toast.error(
        'Impossible de vous déconnecté, veuillez essayer ultérieurement'
      );
    })
    .addCase(verify.pending, (state) => {
      state.loading = true;
    })
    .addCase(verify.fulfilled, (state) => {
      state.isVerified = true;
      toast.success('Compte approuvé !');
      state.loading = false;
    })
    .addCase(verify.rejected, (state) => {
      state.isVerified = false;
      toast.error('Une erreur est survenue');
      state.loading = false;
    })
    .addCase(askPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(askPassword.fulfilled, (state) => {
      state.loading = false;
      toast.success('Vérifiez vos email !');
    })
    .addCase(askPassword.rejected, (state) => {
      state.loading = false;
      toast.error('Email invalide');
    })
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.isRegistered = true;
      toast('Réinitialisation effectuée !');
      state.loading = false;
    })
    .addCase(resetPassword.rejected, (state) => {
      toast('Erreur de mot de passe !');
      state.loading = false;
    });
});

export default settingsReducer;
