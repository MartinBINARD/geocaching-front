import { oneCircuitResponse } from '../../../__mocks__/circuits.mocks';
import { fakeRequestId } from '../../../__mocks__/request.mocks';
import { Circuit } from '../../../core/domain/entities/circuit';

import circuitsReducer, {
  initialCircuitsState,
} from '../../../infracstructure/store/reducers/circuits';
import { fetchCircuit } from '../../../core/usecases';

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

describe('Fetch one circuit state test', () => {
  it('Should GET ONE circuit', async () => {
    const fakePayload: Circuit = oneCircuitResponse;
    const fakeParam = 'circuits/1';

    const action = fetchCircuit.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeParam
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuit/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeParam);

    expect(state).toEqual({
      ...initialCircuitsState,
      oneCircuit: fakePayload,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to return ONE circuit', () => {
    const fakePayload = null;
    const fakeParam = 'circuits/1';

    const action = fetchCircuit.rejected(fakePayload, fakeRequestId, fakeParam);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/fetch-circuit/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeParam);

    expect(state).toEqual({
      ...initialCircuitsState,
      isFetchCircuitFailed: true,
      oneCircuit: null,
    });
    expect(state.isLoading).toBeFalsy;
  });
});
