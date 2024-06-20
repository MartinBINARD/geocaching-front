import { AxiosError } from 'axios';
import { RegisterForm, RegisterSucces } from '../../domain/entities/auth';
import authReducer, {
  intialAuthState,
  register,
} from '../../domain/usecases/auth';
import {
  rightRegisterFormEntries,
  registerMessageResponse,
  registerErrorEmailResponse,
  wrongRegisterFormEntries,
  registerErrorPseudoResponse,
  registerErrorGenericResponse,
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
  it('Should SUCESS to register', async () => {
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
