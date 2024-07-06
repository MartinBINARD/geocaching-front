import {
  oneCircuitQuizResponse,
  oneCircuitStepResponse,
} from '../../../__mocks__/circuits.mocks';
import { CircuitPathStep } from '../../../domain/entities/circuit';

import circuitsReducer, {
  initialCircuitsState,
} from '../../../userinterfaces/store/reducers/circuits';
import { storeCircuitQuiz } from '../../../domain';

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

describe('Store circuit quiz state test', () => {
  it('Should SUCCEED To store circuit quiz questions', () => {
    const fakePayload: CircuitPathStep[] = oneCircuitStepResponse;

    const action = storeCircuitQuiz(fakePayload);
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/store-circuit-quiz');
    expect(action.payload).toEqual(fakePayload);

    expect(state).toEqual({
      ...initialCircuitsState,
      circuitQuiz: oneCircuitQuizResponse,
    });
  });
});
