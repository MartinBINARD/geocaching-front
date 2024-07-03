import {
  oneCircuitQuizResponse,
  oneCircuitStepResponse,
} from '../../../__mocks__/circuits.mocks';
import { CircuitPathStep } from '../../../domain/entities/circuit';

import circuitsReducer, {
  initialCircuitsState,
} from '../../../domain/usecases/circuits';
import { storeCircuitQuiz } from '../../../domain/usecases/circuits/storeCircuitQuizUseCase';

jest.mock('../../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

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
