import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { ForgotPasswordRequest } from '../../../../core/adapters/requests';

export const forgotPasswordThunk = createAsyncThunk(
  'settings/forgot-password',
  async (req: ForgotPasswordRequest) => {
    const result = await core.forgotPassword.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
