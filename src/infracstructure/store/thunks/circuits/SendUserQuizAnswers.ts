import { createAsyncThunk } from '@reduxjs/toolkit';
import { SendUserQuizAnswersRequest } from '../../../../core/adapters/requests';
import { core } from '../../../../core/build';

export const sendUserQuizAnswersThunk = createAsyncThunk(
  'circuits/send-user-quiz-answsers',
  async (req: SendUserQuizAnswersRequest) => {
    const result = await core.sendUserQuizAnswers.execute(req);

    if (result.type === 'failure') {
      throw result.error;
    }

    return result.value;
  }
);
