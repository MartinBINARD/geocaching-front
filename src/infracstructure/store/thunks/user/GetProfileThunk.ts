import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';

export const getProfileThunk = createAsyncThunk(
  'user/get-profile',
  async () => {
    const result = await core.getProfile.execute();

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
