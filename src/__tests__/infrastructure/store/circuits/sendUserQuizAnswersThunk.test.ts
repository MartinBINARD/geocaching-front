import {
  userQuizAnswersRequest,
  userQuizResultResponse,
} from '../../../../__mocks__/circuits.mocks';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';
import { SendUserQuizAnswersRequest } from '../../../../core/adapters/requests';
import { UserQuizResult } from '../../../../core/domain/entities';
import circuitsReducer, {
  initialCircuitsState,
} from '../../../../infracstructure/store/reducers/circuits';
import { sendUserQuizAnswersThunk } from '../../../../infracstructure/store/thunks';

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

describe('Send user answers from circuit quiz state test', () => {
  it('Should SUCCEED to send user answers', async () => {
    const fakePayload: UserQuizResult = userQuizResultResponse;
    const fakeEntries: SendUserQuizAnswersRequest = userQuizAnswersRequest;

    const action = sendUserQuizAnswersThunk.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/send-user-quiz-answsers/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({
      ...initialCircuitsState,
      userQuizResult: fakePayload,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAILED to send user answers', async () => {
    const fakePayload = null;
    const fakeEntries: SendUserQuizAnswersRequest = userQuizAnswersRequest;

    const action = sendUserQuizAnswersThunk.rejected(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = circuitsReducer(initialCircuitsState, action);

    expect(action.type).toEqual('circuits/send-user-quiz-answsers/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual({
      ...initialCircuitsState,
      userQuizResult: null,
    });
    expect(state.isLoading).toBeFalsy;
  });
});
