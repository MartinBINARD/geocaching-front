import { stepsEntriesResponse } from '../../../__mocks__/circuits.mocks';
import { StepsEntriesState } from '../../../domain/entities/circuit';

import circuitsReducer, {
  initialCircuitsState,
} from '../../../domain/usecases/circuits';
import { storeStepEntries } from '../../../domain';

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

describe('Store step entries from circuit quiz state test', () => {
  it('Should SUCCEED to store step entries', () => {
    const fakePayload: StepsEntriesState = stepsEntriesResponse;
    const action = storeStepEntries(fakePayload);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/store-steps-entries');
    expect(action.payload).toEqual(fakePayload);

    expect(state).toEqual({
      ...initialCircuitsState,
      stepsEntries: fakePayload,
    });
  });
});
