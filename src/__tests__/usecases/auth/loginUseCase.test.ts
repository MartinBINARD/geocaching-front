import { AxiosError } from 'axios';
import { LoginForm, User } from '../../../domain/entities/auth';

import {
  loginEntries,
  loginErrorResponse,
  validLoginResponse,
} from '../../../__mocks__/auth.mocks';

import authReducer, { intialAuthState } from '../../../store/reducers/auth';
import { login } from '../../../domain';
import { fakeRequestId } from '../../../__mocks__/request.mocks';

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

describe('Login state test', () => {
  it('Should SUCCEED to login', async () => {
    const fakeEntries = loginEntries as unknown as LoginForm;
    const fakePayload: User = validLoginResponse;

    const action = login.fulfilled(fakePayload, fakeRequestId, fakeEntries);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/login/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({ ...intialAuthState, user: fakePayload });
    expect(state.isLoading).toBeFalsy;
    expect(state.loginErrorMessage).toBeNull;
  });

  it('Should FAIL to login', async () => {
    const fakeEntries = loginEntries as unknown as LoginForm;
    const fakePayload = loginErrorResponse as AxiosError;

    const action = login.rejected(fakePayload, fakeRequestId, fakeEntries);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/login/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({
      ...intialAuthState,
      loginErrorMessage: fakePayload.message,
    });
    expect(state.user).toBeNull;
    expect(state.isLoading).toBeFalsy;
  });
});
