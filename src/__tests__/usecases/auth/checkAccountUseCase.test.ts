import authReducer, {
  intialAuthState,
} from '../../../domain/usecases/auth/auth';
import { checkAccount } from '../../../domain/usecases/auth/checkAccountUseCase';

const fakeRequestId = 'fakeRequestId';

jest.mock('../../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

describe('Authentication store', () => {
  it('Should return the initial auth state on first call', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toBe(intialAuthState);
  });
});

describe('Check user account confirmation state test', () => {
  it('Should SUCCEED to confirm user account', () => {
    const fakeParams = 'fake_params';
    const fakePayload = true;

    const action = checkAccount.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeParams
    );
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/confirm-user-account/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeParams);

    expect(state).toEqual({
      ...intialAuthState,
      isAccountConfirmed: fakePayload,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to confirm user account', () => {
    const fakeParams = 'fake_params';
    const fakePayload = null;

    const action = checkAccount.rejected(
      fakePayload,
      fakeRequestId,
      fakeParams
    );
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/confirm-user-account/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeParams);

    expect(state).toEqual({
      ...intialAuthState,
      isAccountConfirmed: false,
    });
    expect(state.isLoading).toBeFalsy;
  });
});
