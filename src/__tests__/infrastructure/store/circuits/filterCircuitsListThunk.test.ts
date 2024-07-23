import {
  filterCircuitsListResponse,
  rightFilterEntries,
  wrongFilterEntries,
} from '../../../../__mocks__/circuits.mocks';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';
import { FilterCircuitListRequest } from '../../../../core/adapters/requests';
import { CircuitsList } from '../../../../core/domain/entities';
import circuitsReducer, {
  initialCircuitsState,
} from '../../../../infracstructure/store/reducers/circuits';
import { filterCircuitsListThunk } from '../../../../infracstructure/store/thunks';

jest.mock('../../../../infracstructure/config/axios', () => ({
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

describe('Search circuits list state test', () => {
  it('Should SUCCEED to return research on circuits list', async () => {
    const fakePayload: CircuitsList = filterCircuitsListResponse;
    const fakeSearchEntries =
      rightFilterEntries as unknown as FilterCircuitListRequest;

    const action = filterCircuitsListThunk.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeSearchEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/filter-circuits-list/fulfilled');
    expect(action.payload).toEqual(fakePayload);

    expect(state).toEqual({
      ...initialCircuitsState,
      searchList: fakePayload,
      searchSelectorsFilterEntries: fakeSearchEntries.search,
    });
    expect(state.searchList).toHaveLength(2);
  });

  it('Should FAILED to return research on circuits list', async () => {
    const fakePayload = null;
    const fakeSearchEntries =
      wrongFilterEntries as unknown as FilterCircuitListRequest;

    const action = filterCircuitsListThunk.rejected(
      fakePayload,
      fakeRequestId,
      fakeSearchEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/filter-circuits-list/rejected');
    expect(action.payload).toEqual(undefined);

    expect(state).toEqual({
      ...initialCircuitsState,
      isSearchNoResult: true,
    });
    expect(state.searchList).toHaveLength(0);
  });
});
