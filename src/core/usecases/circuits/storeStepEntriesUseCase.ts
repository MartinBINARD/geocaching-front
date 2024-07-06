import { createAction } from '@reduxjs/toolkit';
import { StepsEntriesState } from '../../domain/entities/circuit';

export const storeStepEntries = createAction<StepsEntriesState>(
  'circuits/store-steps-entries'
);
