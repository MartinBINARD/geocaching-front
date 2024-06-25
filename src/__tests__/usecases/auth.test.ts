import { AxiosError } from 'axios';
import {
  EmailForm,
  LoginForm,
  RegisterForm,
  RegisterSucces,
  UpdateCredentials,
  User,
} from '../../domain/entities/auth';
import authReducer, {
  checkUserAccountConfirmation,
  fetchSession,
  forgotPassword,
  intialAuthState,
  login,
  logout,
  register,
  updatePassword,
} from '../../domain/usecases/auth';
import {
  rightRegisterFormEntries,
  registerMessageResponse,
  registerErrorEmailResponse,
  wrongRegisterFormEntries,
  registerErrorPseudoResponse,
  registerErrorGenericResponse,
  loginEntries,
  rightLoginResponse,
  loginErrorResponse,
  forgotPasswordEntrie,
  forgotPasswordErrorResponse,
  updateCredentialsEntries,
  updateCredentialsErrorResponse,
} from '../data/auth.data';

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

describe('Register state test', () => {
  it('Should SUCCEED to register', async () => {
    const fakeEntries = rightRegisterFormEntries as unknown as RegisterForm;
    const fakePayload: RegisterSucces = registerMessageResponse;

    const action = register.fulfilled(fakePayload, fakeRequestId, fakeEntries);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/register/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual(intialAuthState);
    expect(state.isLoading).toBeFalsy;
    expect(state.registerErrorMessage).toEqual('');
  });

  it('Should FAIL to register ==> INVALID EMAIL', async () => {
    const fakeEntries = wrongRegisterFormEntries as unknown as RegisterForm;
    const fakePayload = registerErrorEmailResponse as AxiosError;

    const action = register.rejected(fakePayload, fakeRequestId, fakeEntries);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/register/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error.message).toEqual(fakePayload.message);

    expect(state).toEqual({
      ...intialAuthState,
      registerErrorMessage: 'Request failed with status code 500',
    });
    expect(state.isLoading).toBeFalsy;
  });
  it('Should FAIL to register ==> INVALID PSEUDO', async () => {
    const fakeEntries = wrongRegisterFormEntries as unknown as RegisterForm;
    const fakePayload = registerErrorPseudoResponse as AxiosError;

    const action = register.rejected(fakePayload, fakeRequestId, fakeEntries);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/register/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error.message).toEqual(fakePayload.message);

    expect(state).toEqual({
      ...intialAuthState,
      registerErrorMessage: 'Request failed with status code 500',
    });
    expect(state.isLoading).toBeFalsy;
  });
  it('Should FAIL to register ==> GENERIC ERROR', async () => {
    const fakeEntries = wrongRegisterFormEntries as unknown as RegisterForm;
    const fakePayload = registerErrorGenericResponse as AxiosError;

    const action = register.rejected(fakePayload, fakeRequestId, fakeEntries);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/register/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error.message).toEqual(fakePayload.message);

    expect(state).toEqual({
      ...intialAuthState,
      registerErrorMessage: 'Request failed with status code 500',
    });
    expect(state.isLoading).toBeFalsy;
  });
});

describe('Login state test', () => {
  it('Should SUCCEED to login', async () => {
    const fakeEntries = loginEntries as unknown as LoginForm;
    const fakePayload: User = rightLoginResponse;

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

describe('Fetch session state test', () => {
  it('Should SUCCEED to fetch session user', () => {
    const fakePayload = rightLoginResponse;

    const action = fetchSession.fulfilled(fakePayload, fakeRequestId);
    const state = authReducer(intialAuthState, action);
    expect(action.type).toEqual('settings/fetchSession/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual({ ...intialAuthState, user: fakePayload });
  });

  it('Should FAIL to fetch session user', () => {
    const fakePayload = null;

    const action = fetchSession.rejected(fakePayload, fakeRequestId);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/fetchSession/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual({ ...intialAuthState, user: null });
  });
});

describe('Check user account confirmation state test', () => {
  it('Should SUCCEED to confirm user account', () => {
    const fakeParams = '1a347cd3-26b2-637f';
    const fakePayload = true;

    const action = checkUserAccountConfirmation.fulfilled(
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
    const fakeParams = '1a347cd3-26b2-637f';
    const fakePayload = null;

    const action = checkUserAccountConfirmation.rejected(
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

describe('Logout state test', () => {
  it('Should SUCCEED to logout', () => {
    const fakePayload = null;

    const action = logout.fulfilled(fakePayload, fakeRequestId);
    const filledInitialAuthState = {
      ...intialAuthState,
      user: rightLoginResponse,
    };
    const state = authReducer(filledInitialAuthState, action);

    expect(action.type).toEqual('settings/logout/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual({ ...intialAuthState, user: fakePayload });
    expect(state.loginErrorMessage).toBeNull;
  });
  it('Should FAIL to logout', () => {
    const fakePayload = null;

    const action = logout.rejected(fakePayload, fakeRequestId);
    const filledInitialAuthState = {
      ...intialAuthState,
      user: rightLoginResponse,
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
