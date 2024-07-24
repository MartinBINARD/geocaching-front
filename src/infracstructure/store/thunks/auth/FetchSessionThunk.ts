import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';

export const fetchSessionThunk = createAsyncThunk(
  'settings/fetch-session',
  async () => {
    const result = await core.fetchSession.execute();

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
