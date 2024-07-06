import { createAction } from '@reduxjs/toolkit';
import { SearchState } from '../../domain/entities/circuit';

export const searchCircuitsList = createAction<SearchState>(
  'circuits/search-circuits-list'
);
