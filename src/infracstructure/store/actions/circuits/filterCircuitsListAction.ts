import { createAction } from '@reduxjs/toolkit';
import { FilterCircuitListRequest } from '../../../../core/adapters/requests';

export const filterCircuitsListAction = createAction<FilterCircuitListRequest>(
  'circuits/search-circuits-list'
);
