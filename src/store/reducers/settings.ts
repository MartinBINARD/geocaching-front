import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../../service/axios';

import {
  Login,
  Register,
  ResetState,
  Session,
  User,
} from '../../@types/setting';

interface SettingState {
  /* key user receive both Login (user login form) and User
  infos type from server */
  user: User | Login | null;
  failedLogin: boolean;
  loginErrorMessage: string | null;
  isRegistered: boolean | null;
  registerError: string;
  isVerified: boolean;
  isReset: boolean;
  loading: boolean;
}

// init states
const intialState: SettingState = {
  user: null,
  failedLogin: false,
  loginErrorMessage: null,
  isRegistered: null,
  registerError: '',
  isVerified: false,
  isReset: false,
  loading: false,
};

export const register = createAsyncThunk(
  'settings/register',
  async (formData: HTMLFormElement): Promise<boolean> => {
    try {
      const objData = Object.fromEntries(formData.entries());

      await api.post<Register>('register', objData);

      return true;
    } catch (error) {
      // Send notification priority error from server or send generic message
      if (error.response.data.error) {
        console.log(error.response.data.error);
        const errorMessage = error.response.data.error;
        if (errorMessage.includes('user_email_key')) {
          throw new Error('Email déjà utilisé');
        } else if (errorMessage.includes('user_pseudo_key')) {
          throw new Error('Pseudo déjà utilisé');
        } else {
          throw new Error(errorMessage);
        }
      }
      // // Throw prior error server or generic to be dispatched in regsiterError located in card
      throw error.response ? error.response.data : error.message;
    }
  }
);

// using axios for POST at API (login)
export const login = createAsyncThunk(
  'settings/login',
  async (formData: HTMLFormElement): Promise<Login> => {
    try {
      const objData = Object.fromEntries(formData.entries());

      const { data } = await api.post<Login>('login', objData);
      // return pseudo and role of the user
      return data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
);

// using axios for GET at API (session)
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

// usings axios for GET at API (verify)
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

// using axios for GET at API (logout)
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

// using axios for POST the email for ask new password
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

// using axios for PATCH the new password
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
    // if axios POST register is pending
    .addCase(register.pending, (state) => {
      state.loading = true;
    })
    // if axios POST register is success
    .addCase(register.fulfilled, (state) => {
      state.registerError = '';
      toast.success(
        `Inscription réussie. Validez votre inscription avec le mail de confirmation !`
      );
      state.loading = false;
    })
    // if axios POST register is rejected
    .addCase(register.rejected, (state, action) => {
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.registerError = action.error.message!;
      state.loading = false;
    })
    // if axios POST login is pending
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    // if axios POST login is success
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      toast.success('Vous êtes connecté');
      state.failedLogin = false;
      state.loading = false;
    })
    // if axios POST login is rejected
    .addCase(login.rejected, (state, action) => {
      state.failedLogin = true;
      /* "!" post-fix expression operator for null and undefined compatibility 
      TypeScript can not predict error server reponse
      See documentation :
      https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
      state.loginErrorMessage = action.error.message!;
      state.loading = false;
    })
    // if axios session is success
    .addCase(session.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    // if axios session is rejected
    .addCase(session.rejected, (state) => {
      state.failedLogin = true;
      toast.error('Impossible de se connecté à la session');
    })
    // case of logout is success
    .addCase(logout.fulfilled, (state) => {
      toast.success('Vous êtes déconnecté');
      state.user = null;
      state.isVerified = false;
    })
    // case of logout is rejected
    .addCase(logout.rejected, () => {
      toast.error(
        'Impossible de vous déconnecté, veuillez essayer ultérieurement'
      );
    })
    // if axios verify is pending
    .addCase(verify.pending, (state) => {
      state.loading = true;
    })
    // if axios verify is success
    .addCase(verify.fulfilled, (state) => {
      state.isVerified = true;
      toast.success('Compte approuvé !');
      state.loading = false;
    })
    // if axios verify is rejected
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
    // if axios resetPassword is pending
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
    })
    // if axios resetPassword is success
    .addCase(resetPassword.fulfilled, (state) => {
      state.isRegistered = true;
      toast('Réinitialisation effectuée !');
      state.loading = false;
    })
    // if axios resetPassword is rejected
    .addCase(resetPassword.rejected, (state) => {
      toast('Erreur de mot de passe !');
      state.loading = false;
    });
});

export default settingsReducer;
