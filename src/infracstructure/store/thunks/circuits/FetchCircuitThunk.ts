import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchCircuitRequest } from '../../../../core/adapters/requests';
import { core } from '../../../../core/build';

export const fetchCircuitThunk = createAsyncThunk(
  'circuits/fetch-circuit',
  async (req: FetchCircuitRequest) => {
    const result = await core.fetchCircuit.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
