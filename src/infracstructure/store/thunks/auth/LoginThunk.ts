import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { LoginRequest } from '../../../../core/adapters/requests';

export const loginThunk = createAsyncThunk(
  'settings/login',
  async (req: LoginRequest) => {
    const result = await core.login.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
