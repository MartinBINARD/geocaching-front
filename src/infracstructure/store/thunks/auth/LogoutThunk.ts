import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';

export const logoutThunk = createAsyncThunk('settings/logout', async () => {
  const result = await core.logout.execute();

  if (result.type === 'failure') {
    throw result.error;
  }

  return result.value;
});
