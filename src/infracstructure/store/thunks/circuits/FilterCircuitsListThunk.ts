import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterCircuitListRequest } from '../../../../core/adapters/requests';
import { core } from '../../../../core/build';

export const filterCircuitsListThunk = createAsyncThunk(
  'circuits/filter-circuits-list',
  async (req: FilterCircuitListRequest) => {
    const result = await core.filterCircuitsList.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
