import { AxiosError } from 'axios';
import userReducer, {
  intialUserState,
} from '../../../../infracstructure/store/reducers/user';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';
import {
  getProfileResponse,
  userProfileFormEntries,
  userProfileFormError,
} from '../../../../__mocks__/user.mocks';
import { Profile } from '../../../../core/domain/entities';
import { UpdateProfileRequest } from '../../../../core/adapters/requests/user/UpdateProfileRequest';
import { updateProfileThunk } from '../../../../infracstructure/store/thunks';

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

describe('UPDATE user profile state test', () => {
  it('Should SUCCEED to update user profile', () => {
    const fakeEntries: UpdateProfileRequest = userProfileFormEntries;
    const fakePayload: Profile = getProfileResponse;

    const action = updateProfileThunk.fulfilled(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = userReducer(intialUserState, action);

    expect(action.type).toEqual('user/update-profile/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);

    expect(state).toEqual({ ...intialUserState, profile: fakePayload });
    expect(state.isProfileLoading).toBeFalsy;
  });

  it('Should FAIL to update user profile', () => {
    const fakeEntries: UpdateProfileRequest = userProfileFormEntries;
    const fakePayload = userProfileFormError as AxiosError;

    const action = updateProfileThunk.rejected(
      fakePayload,
      fakeRequestId,
      fakeEntries
    );
    const state = userReducer(intialUserState, action);

    expect(action.type).toEqual('user/update-profile/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(fakeEntries);
    expect(action.error).toEqual(fakePayload);

    expect(state).toEqual({
      ...intialUserState,
      errorMessage: fakePayload.message,
    });
    expect(state.profile).toBeNull;
    expect(state.isProfileLoading).toBeFalsy;
  });
});
