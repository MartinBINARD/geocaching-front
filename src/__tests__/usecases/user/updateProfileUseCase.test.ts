import { AxiosError } from 'axios';
import userReducer, { intialUserState } from '../../../store/reducers/user';
import { fakeRequestId } from '../../../__mocks__/request.mocks';
import {
  userProfileFormEntries,
  userProfileFormErrorResponse,
  userProfileResponse,
} from '../../../__mocks__/user.mocks';
import { Profile, UpdateProfileForm } from '../../../domain/entities/user';
import { updateProfile } from '../../../domain';

jest.mock('../../../services/axios', () => ({
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
    const fakeEntries = userProfileFormEntries as unknown as UpdateProfileForm;
    const fakePayload: Profile = userProfileResponse;

    const action = updateProfile.fulfilled(
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
    const fakeEntries = userProfileFormEntries as unknown as UpdateProfileForm;
    const fakePayload = userProfileFormErrorResponse as AxiosError;

    const action = updateProfile.rejected(
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
