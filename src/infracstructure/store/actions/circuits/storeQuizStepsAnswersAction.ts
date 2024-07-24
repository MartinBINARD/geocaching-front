import { createAction } from '@reduxjs/toolkit';

export const storeQuizStepsAnswersAction = createAction<Record<string, string>>(
  'circuits/store-steps-entries'
);
