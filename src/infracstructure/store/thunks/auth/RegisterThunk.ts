import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { RegisterRequest } from '../../../../core/adapters/requests';

export const registerThunk = createAsyncThunk(
  'settings/register',
  async (req: RegisterRequest) => {
    const result = await core.register.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
