import { AxiosError } from 'axios';
import { Profile, UpdateProfileForm } from '../../domain/entities/user';
import userReducer, {
  deleteProfile,
  intialUserState,
  updateProfile,
} from '../../domain/usecases/user';
import {
  userProfileFormEntries,
  userProfileFormErrorResponse,
  userProfileResponse,
} from '../../__mocks__/user.mocks';

const fakeRequestId = 'fakeRequestId';

jest.mock('../../services/axios', () => ({
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

describe('Delete user profile state test', () => {
  it('Should SUCCEED to delete user profile', () => {
    const fakePayload = true;

    const action = deleteProfile.fulfilled(fakePayload, fakeRequestId);
    const filledInitialUserState = {
      ...intialUserState,
      profile: userProfileResponse,
    };
    const state = userReducer(filledInitialUserState, action);

    expect(action.type).toEqual('user/delete-profile/fulfilled');
    expect(action.payload).toBeTruthy;
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual({ ...intialUserState, isProfileDelete: true });
    expect(state.profile).toBeNull;
    expect(state.isProfileLoading).toBeFalsy;
  });

  it('Should FAIL to delete user profile', () => {
    const fakePayload = null;

    const action = deleteProfile.rejected(fakePayload, fakeRequestId);
    const filledInitialUserState = {
      ...intialUserState,
      profile: userProfileResponse,
    };
    const state = userReducer(filledInitialUserState, action);

    expect(action.type).toEqual('user/delete-profile/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual(filledInitialUserState);
    expect(state.profile).toEqual(userProfileResponse);
    expect(state.isProfileDelete).toBeFalsy;
    expect(state.isProfileLoading).toBeFalsy;
  });
});
