import userReducer, { intialUserState } from '../../../store/reducers/user';
import { fakeRequestId } from '../../../__mocks__/request.mocks';
import { userProfileResponse } from '../../../__mocks__/user.mocks';
import { getProfile } from '../../../domain';
import { Profile } from '../../../domain/entities/user';

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

describe('GET user profile state test', () => {
  it('Should SUCCEED to GET user profile', () => {
    const fakePayload: Profile = userProfileResponse;

    const action = getProfile.fulfilled(fakePayload, fakeRequestId);
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
    const fakePayload = null;

    const action = getProfile.rejected(fakePayload, fakeRequestId);
    const state = userReducer(intialUserState, action);

    expect(action.type).toEqual('user/get-profile/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual({
      ...intialUserState,
      profile: null,
      errorMessage: 'Rejected',
    });
    expect(state.isProfileLoading).toBeFalsy;
  });
});
