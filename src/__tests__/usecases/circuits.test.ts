import {
  UserCircuitAnswersResultState,
  UserCircuitEntriesState,
} from '../../domain/entities/circuit';
import circuitsReducer, {
  initialCircuitsState,
  sendAnswers,
} from '../../domain/usecases/circuits';
import {
  userCircuitEntriesResponse,
  userCircuitAnswerResultResponse,
} from '../../__mocks__/circuits.mocks';

const fakeRequestId = 'fakeRequestId';

jest.mock('../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

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
