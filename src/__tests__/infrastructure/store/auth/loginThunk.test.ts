import { AxiosError } from 'axios';
import { LoginRequest } from '../../../../core/adapters/requests';
import { User } from '../../../../core/domain/entities/User';

import authReducer, {
  intialAuthState,
} from '../../../../infracstructure/store/reducers/auth';
import { loginThunk } from '../../../../infracstructure/store/thunks/auth/LoginThunk';

import {
  loginEntries,
  loginErrorResponse,
  validLoginResponse,
} from '../../../../__mocks__/auth.mocks';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';

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

describe('Login state test', () => {
  it('Should SUCCEED to login', async () => {
    const fakeEntries = loginEntries as LoginRequest;
    const fakePayload: User = validLoginResponse;

    const action = loginThunk.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
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
    const fakeEntries = loginEntries as LoginRequest;
    const fakePayload = loginErrorResponse as AxiosError;

    const action = loginThunk.rejected(fakePayload, fakeRequestId, fakeEntries);
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
