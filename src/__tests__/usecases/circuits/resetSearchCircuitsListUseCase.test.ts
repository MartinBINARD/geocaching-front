import circuitsReducer, {
  initialCircuitsState,
} from '../../../domain/usecases/circuits';
import { resetSearchCircuitsList } from '../../../domain/usecases/circuits/resetSearchCircuitsListUseCase';

jest.mock('../../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

describe('Circuits store', () => {
  it('Should return the initial circuits state on first call', () => {
    expect(circuitsReducer(undefined, { type: '@@INIT' })).toBe(
      initialCircuitsState
    );
  });
});

describe('Reset search circuits list state test', () => {
  it('Should SUCCEED to return RESET research on circuits list', async () => {
    const action = resetSearchCircuitsList();
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/reset-search-circuits-list');
    expect(action.payload).toEqual(undefined);

    expect(state.isSearchNoResult).toBeFalsy;
    expect(state.searchSelectorsFilterEntries).toBeNull;
    expect(state.searchList).toHaveLength(0);
  });
});
