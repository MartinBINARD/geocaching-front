import { createAsyncThunk } from '@reduxjs/toolkit';
import { core } from '../../../../core/build';

export const fetchCircuitsListThunk = createAsyncThunk(
  'circuits/fetch-circuits-list',
  async () => {
    const result = await core.fetchCircuitsList.execute();

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
