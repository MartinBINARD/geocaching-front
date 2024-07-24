import userReducer, {
  intialUserState,
} from '../../../../infracstructure/store/reducers/user';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';
import {
  getProfileError,
  getProfileResponse,
} from '../../../../__mocks__/user.mocks';
import { getProfileThunk } from '../../../../infracstructure/store/thunks';
import { Profile } from '../../../../core/domain/entities';
import { AxiosError } from 'axios';

jest.mock('../../../../infracstructure/config/axios', () => ({
  api: {
    baseUrl: 'http://localhost:3000',
  },
}));

describe('User store', () => {
  it('Should return the initial user state on first call', () => {
    expect(userReducer(undefined, { type: '@@INIT' })).toBe(intialUserState);
  });
});

describe('GET user profile state test', () => {
  it('Should SUCCEED to GET user profile', () => {
    const fakePayload: Profile = getProfileResponse;

    const action = getProfileThunk.fulfilled(fakePayload, fakeRequestId);
    const state = userReducer(intialUserState, action);

    expect(action.type).toEqual('user/get-profile/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual({ ...intialUserState, profile: fakePayload });
    expect(state.isProfileLoading).toBeFalsy;
    expect(state.errorMessage).toBeNull;
  });

  it('Should FAIL to GET user profile', () => {
    const fakePayload = getProfileError as AxiosError;

    const action = getProfileThunk.rejected(fakePayload, fakeRequestId);
    const state = userReducer(intialUserState, action);

    expect(action.type).toEqual('user/get-profile/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);
    expect(action.error).toEqual(getProfileError);

    expect(state).toEqual({
      ...intialUserState,
      profile: null,
      errorMessage: getProfileError.message,
    });
    expect(state.isProfileLoading).toBeFalsy;
  });
});
