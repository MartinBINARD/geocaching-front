import {
  goodSearchEntries,
  searchCircuitsListResponse,
  wrongSearchEntries,
} from '../../../__mocks__/circuits.mocks';
import { Circuit, SearchState } from '../../../domain/entities/circuit';
import circuitsReducer, {
  initialCircuitsState,
} from '../../../infracstructure/store/reducers/circuits';
import { searchCircuitsList } from '../../../domain';

jest.mock('../../../infracstructure/config/axios', () => ({
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
    const fakePayload: Circuit[] = searchCircuitsListResponse;
    const fakeSearchEntries: SearchState = goodSearchEntries;

    const action = searchCircuitsList(fakeSearchEntries);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/search-circuits-list');
    expect(action.payload).toEqual(fakeSearchEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      searchList: fakePayload,
      searchSelectorsFilterEntries: fakeSearchEntries.search,
    });
    expect(state.searchList).toHaveLength(2);
  });

  it('Should FAILED to return research on circuits list', async () => {
    const fakePayload: Circuit[] = [];
    const fakeSearchEntries: SearchState = wrongSearchEntries;

    const action = searchCircuitsList(fakeSearchEntries);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/search-circuits-list');
    expect(action.payload).toEqual(fakeSearchEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      isSearchNoResult: true,
      searchList: fakePayload,
      searchSelectorsFilterEntries: fakeSearchEntries.search,
    });
    expect(state.searchList).toHaveLength(0);
  });
});
