import { AxiosError } from 'axios';
import authReducer, {
  intialAuthState,
} from '../../../../infracstructure/store/reducers/auth';
import { updatePasswordThunk } from '../../../../infracstructure/store/thunks';
import { UpdatePasswordRequest } from '../../../../core/adapters/requests';
import {
  updatePasswordEntries,
  updatePasswordErrorResponse,
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

describe('Update password state test', () => {
  it('Should SUCCEED to update password', () => {
    const fakeEntries = updatePasswordEntries as UpdatePasswordRequest;
    const fakePayload = true;

    const action = updatePasswordThunk.fulfilled(
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
    const fakeEntries = updatePasswordEntries as UpdatePasswordRequest;
    const fakePayload = updatePasswordErrorResponse as AxiosError;

    const action = updatePasswordThunk.rejected(
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
