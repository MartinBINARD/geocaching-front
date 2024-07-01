import { AxiosError } from 'axios';
import { EmailForm, UpdateCredentials } from '../../domain/entities/auth';
import authReducer, {
  forgotPassword,
  intialAuthState,
  updatePassword,
} from '../../domain/usecases/auth';
import {
  forgotPasswordEntrie,
  forgotPasswordErrorResponse,
  updateCredentialsEntries,
  updateCredentialsErrorResponse,
  validLoginResponse,
} from '../../__mocks__/auth.mocks';
import { logout } from '../../domain';

const fakeRequestId = 'fakeRequestId';

jest.mock('../../services/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

describe('Authentication store', () => {
  it('Should return the initial auth state on first call', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toBe(intialAuthState);
  });
});

describe('Forgot paswword state test', () => {
  it('Should SUCCEED to send Email to restore password', () => {
    const fakeEntries = forgotPasswordEntrie as unknown as EmailForm;
    const fakePayload = true;

    const action = forgotPassword.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/forgot-password/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual(intialAuthState);
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to send Email to restore password', () => {
    const fakeEntries = forgotPasswordEntrie as unknown as EmailForm;
    const fakePayload = forgotPasswordErrorResponse as AxiosError;

    const action = forgotPassword.rejected(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/forgot-password/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error).toEqual(fakePayload);

    expect(state).toEqual(intialAuthState);
    expect(state.isLoading).toBeFalsy;
  });
});

describe('Update password state test', () => {
  it('Should SUCCEED to update password', () => {
    const fakeEntries =
      updateCredentialsEntries as unknown as UpdateCredentials;
    const fakePayload = true;

    const action = updatePassword.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/update-password/fulfilled');
    expect(action.payload).toBeTruthy;
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({ ...intialAuthState, isRegistered: true });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to update password', () => {
    const fakeEntries =
      updateCredentialsEntries as unknown as UpdateCredentials;
    const fakePayload = updateCredentialsErrorResponse as AxiosError;

    const action = updatePassword.rejected(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/update-password/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error).toEqual(fakePayload);

    expect(state).toEqual({ ...intialAuthState, isRegistered: false });
    expect(state.isLoading).toBeFalsy;
  });
});
