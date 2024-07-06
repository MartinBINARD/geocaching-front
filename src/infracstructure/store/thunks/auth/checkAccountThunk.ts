import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { CheckAccountRequest } from '../../../../core/adapters/requests';

export const checkAccountThunk = createAsyncThunk(
  'settings/confirm-user-account',
  async (req: CheckAccountRequest) => {
    try {
      return await core.checkAccount.execute(req);
    } catch (error) {
      throw error;
    }
  }
);
