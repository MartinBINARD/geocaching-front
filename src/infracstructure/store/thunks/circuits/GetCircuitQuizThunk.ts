import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetCircuitQuizRequest } from '../../../../core/adapters/requests';
import { core } from '../../../../core/build';

export const getCircuitQuizThunk = createAsyncThunk(
  'circuits/get-circuit-quiz',
  async (req: GetCircuitQuizRequest) => {
    const result = await core.getCircuitQuiz.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
