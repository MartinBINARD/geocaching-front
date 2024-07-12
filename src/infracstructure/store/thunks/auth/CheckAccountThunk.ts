import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { CheckAccountRequest } from '../../../../core/adapters/requests';

export const checkAccountThunk = createAsyncThunk(
  'settings/confirm-user-account',
  async (req: CheckAccountRequest) => {
    const result = await core.checkAccount.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
