import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';
import { UpdatePasswordRequest } from '../../../../core/adapters/requests';

export const updatePasswordThunk = createAsyncThunk(
  'settings/update-password',
  async (req: UpdatePasswordRequest) => {
    const result = await core.updatePassword.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
