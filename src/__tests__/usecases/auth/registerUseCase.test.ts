import { AxiosError } from 'axios';

import {
  invalidRegisterFormEntries,
  registerErrorEmailResponse,
  registerErrorGenericResponse,
  registerErrorPseudoResponse,
  registerMessageResponse,
  validRegisterFormEntries,
} from '../../../__mocks__/auth.mocks';

import {
  RegisterForm,
  RegisterSucces,
} from '../../../core/domain/entities/auth';
import authReducer, {
  intialAuthState,
} from '../../../infracstructure/store/reducers/auth';

import { register } from '../../../core/domain';
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

describe('Register state test', () => {
  it('Should SUCCEED to register', async () => {
    const fakeEntries = validRegisterFormEntries as unknown as RegisterForm;
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
    const fakeEntries = invalidRegisterFormEntries as unknown as RegisterForm;
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
      registerErrorMessage: fakePayload.message,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to register ==> INVALID PSEUDO', async () => {
    const fakeEntries = invalidRegisterFormEntries as unknown as RegisterForm;
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
      registerErrorMessage: fakePayload.message,
    });
    expect(state.isLoading).toBeFalsy;
  });

  it('Should FAIL to register ==> GENERIC ERROR', async () => {
    const fakeEntries = invalidRegisterFormEntries as unknown as RegisterForm;
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
      registerErrorMessage: fakePayload.message,
    });
    expect(state.isLoading).toBeFalsy;
  });
});
