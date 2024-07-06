import { ciruitsListResponse } from '../../../__mocks__/circuits.mocks';
import { fakeRequestId } from '../../../__mocks__/request.mocks';
import { Circuit } from '../../../domain/entities/circuit';
import circuitsReducer, {
  initialCircuitsState,
} from '../../../userinterfaces/store/reducers/circuits';
import { fetchCircuitsList } from '../../../domain';

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

describe('Circuits list state test', () => {
  it('Should GET circuits list', async () => {
    const fakePayload: Circuit[] = ciruitsListResponse;

    const action = fetchCircuitsList.fulfilled(fakePayload, fakeRequestId);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuits-list/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);

    expect(state).toEqual({
      ...initialCircuitsState,
      circuitsList: fakePayload,
    });
    expect(state.circuitsList).toHaveLength(3);

    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to return circuits list', async () => {
    const fakePayload = [] as any;

    const action = fetchCircuitsList.rejected(fakePayload, fakeRequestId);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuits-list/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);

    expect(state).toEqual({
      ...initialCircuitsState,
      circuitsList: fakePayload,
      errorMessage: undefined,
    });
    expect(state.circuitsList).toHaveLength(0);

    expect(state.isLoading).toBeFalsy;
  });
});
