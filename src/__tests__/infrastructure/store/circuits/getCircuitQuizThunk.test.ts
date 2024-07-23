import circuitsReducer, {
  initialCircuitsState,
} from '../../../../infracstructure/store/reducers/circuits';
import { getCircuitQuizThunk } from '../../../../infracstructure/store/thunks';

import { Circuit, CircuitQuizList } from '../../../../core/domain/entities';

import {
  CircuitQuizListResponse,
  circuitQuizLoadingError,
  circuitQuizStepsStructureError,
  oneCircuitResponse,
  oneCircuitWithoutSteps,
  wrongCircuitStepStructure,
} from '../../../../__mocks__/circuits.mocks';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';

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

describe('GET circuit quiz list', () => {
  it('Should SUCCEED to return circuit quiz list', async () => {
    const fakePayload = CircuitQuizListResponse as unknown as CircuitQuizList;
    const fakeSearchEntries: Circuit = oneCircuitResponse;

    const action = getCircuitQuizThunk.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeSearchEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/get-circuit-quiz/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    1;
    expect(state).toEqual({
      ...initialCircuitsState,
      circuitQuiz: fakePayload,
    });
  });

  it('Should FAILED to return circuit quiz list due to circuit loading ERROR', async () => {
    const fakePayload = circuitQuizLoadingError as unknown as Error;
    const fakeSearchEntries: any = oneCircuitWithoutSteps;

    const action = getCircuitQuizThunk.rejected(
      fakePayload,
      fakeRequestId,
      fakeSearchEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/get-circuit-quiz/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.error.message).toEqual(circuitQuizLoadingError.message);

    expect(state).toEqual(initialCircuitsState);
  });

  it('Should FAILED to return circuit quiz list due to steps structure ERROR', async () => {
    const fakePayload = circuitQuizStepsStructureError as unknown as Error;
    const fakeSearchEntries: any = wrongCircuitStepStructure;

    const action = getCircuitQuizThunk.rejected(
      fakePayload,
      fakeRequestId,
      fakeSearchEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/get-circuit-quiz/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.error.message).toEqual(
      circuitQuizStepsStructureError.message
    );

    expect(state).toEqual(initialCircuitsState);
  });
});
