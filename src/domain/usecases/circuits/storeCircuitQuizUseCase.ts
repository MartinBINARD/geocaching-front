import { createAction } from '@reduxjs/toolkit';
import { CircuitPathStep } from '../../entities/circuit';

export const storeCircuitQuiz = createAction<CircuitPathStep[]>(
  'circuits/store-circuit-quiz'
);
