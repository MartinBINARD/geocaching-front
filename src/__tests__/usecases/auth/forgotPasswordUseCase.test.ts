import { AxiosError } from 'axios';
import { forgotPassword } from '../../../core/domain';
import { EmailForm } from '../../../core/domain/entities/auth';
import authReducer, {
  intialAuthState,
} from '../../../infracstructure/store/reducers/auth';
import {
  forgotPasswordEntrie,
  forgotPasswordErrorResponse,
} from '../../../__mocks__/auth.mocks';
import { fakeRequestId } from '../../../__mocks__/request.mocks';

jest.mock('../../../infracstructure/config/axios', () => ({
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
