import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchCircuitQuizRequest } from '../../../../core/adapters/requests';
import { core } from '../../../../core/build';

export const fetchCircuitQuizThunk = createAsyncThunk(
  'circuits/get-circuit-quiz',
  async (req: FetchCircuitQuizRequest) => {
    const result = await core.fetchCircuitQuiz.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
