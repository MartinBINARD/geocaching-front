import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { LoginRequest } from '../../../../core/adapters/requests';

export const loginThunk = createAsyncThunk(
  'settings/login',
  async (req: LoginRequest) => {
    try {
      return await core.login.execute(req);
    } catch (error) {
      throw error;
    }
  }
);
