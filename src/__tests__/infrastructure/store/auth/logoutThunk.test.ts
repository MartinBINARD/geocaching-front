import {
  logoutResponse,
  validLoginResponse,
} from '../../../../__mocks__/auth.mocks';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';
import authReducer, {
  intialAuthState,
} from '../../../../infracstructure/store/reducers/auth';
import { logoutThunk } from '../../../../infracstructure/store/thunks';

jest.mock('../../../../infracstructure/config/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

describe('Authentication store', () => {
  it('Should return the initial auth state on first call', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toBe(intialAuthState);
  });
});

describe('Logout state test', () => {
  it('Should SUCCEED to logout', () => {
    const fakePayload = logoutResponse;

    const action = logoutThunk.fulfilled(fakePayload, fakeRequestId);
    const filledInitialAuthState = {
      ...intialAuthState,
      user: validLoginResponse,
    };
    const state = authReducer(filledInitialAuthState, action);

    expect(action.type).toEqual('settings/logout/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual({ ...intialAuthState, user: null });
    expect(state.loginErrorMessage).toBeNull;
  });
  it('Should FAIL to logout', () => {
    const fakePayload = null;

    const action = logoutThunk.rejected(fakePayload, fakeRequestId);
    const filledInitialAuthState = {
      ...intialAuthState,
      user: validLoginResponse,
    };
    const state = authReducer(filledInitialAuthState, action);

    expect(action.type).toEqual('settings/logout/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual(filledInitialAuthState);
    expect(state.loginErrorMessage).toBeNull;
  });
});
