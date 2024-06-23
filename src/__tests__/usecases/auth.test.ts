import { AxiosError } from 'axios';
import {
  LoginForm,
  RegisterForm,
  RegisterSucces,
  User,
} from '../../domain/entities/auth';
import authReducer, {
  fetchSession,
  intialAuthState,
  login,
  register,
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
  sessionErrorResponse,
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
  it('Should SUCCESS to register', async () => {
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
    const fakePayload = registerErrorEmailResponse as unknown as AxiosError;

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
    const fakePayload = registerErrorPseudoResponse as unknown as AxiosError;

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
    const fakePayload = registerErrorGenericResponse as unknown as AxiosError;

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
  it('Should SUCCESS to login', async () => {
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
    const fakePayload = loginErrorResponse as unknown as AxiosError;

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
