import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';

export const deleteProfileThunk = createAsyncThunk(
  'user/delete-profile',
  async () => {
    const result = await core.deleteProfile.execute();

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
