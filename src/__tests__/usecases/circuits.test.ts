import {
  CircuitPathStep,
  StepsEntriesState,
  UserCircuitAnswersResultState,
  UserCircuitEntriesState,
} from '../../domain/entities/circuit';
import circuitsReducer, {
  initialCircuitsState,
  resetCircuitQuiz,
  sendAnswers,
  storeCircuitQuiz,
  storeStepEntries,
} from '../../domain/usecases/circuits';
import {
  oneCircuitQuizResponse,
  oneCircuitStepResponse,
  userCircuitEntriesResponse,
  userCircuitAnswerResultResponse,
  stepsEntriesResponse,
} from '../../__mocks__/circuits.mocks';

const fakeRequestId = 'fakeRequestId';

jest.mock('../../services/axios', () => ({
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

describe('RESET circuit quiz state test', () => {
  it('Should SUCCEED to RESET circuit quiz questions', () => {
    const action = resetCircuitQuiz();
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/reset-circuit-quiz');
    expect(action.payload).toEqual(undefined);

    expect(state).toEqual({
      ...initialCircuitsState,
      stepsEntries: null,
      userCircuitAnswersResult: null,
    });
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

describe('Send user answers from circuit quiz state test', () => {
  it('Should SUCCEED to send user answers', async () => {
    const fakePayload: UserCircuitAnswersResultState =
      userCircuitAnswerResultResponse;
    const fakeEntries: UserCircuitEntriesState = userCircuitEntriesResponse;

    const action = sendAnswers.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/send-answers/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      userCircuitAnswersResult: fakePayload,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAILED to send user answers', async () => {
    const fakePayload = null;
    const fakeEntries: UserCircuitEntriesState = userCircuitEntriesResponse;

    const action = sendAnswers.rejected(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/send-answers/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual({
      ...initialCircuitsState,
      userCircuitAnswersResult: null,
    });
    expect(state.isLoading).toBeFalsy;
  });
});
