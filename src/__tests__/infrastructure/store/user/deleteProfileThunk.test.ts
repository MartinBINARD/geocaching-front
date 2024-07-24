import userReducer, {
  intialUserState,
} from '../../../../infracstructure/store/reducers/user';
import { getProfileResponse } from '../../../../__mocks__/user.mocks';
import { deleteProfileThunk } from '../../../../infracstructure/store/thunks';

const fakeRequestId = 'fakeRequestId';

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

describe('Delete user profile state test', () => {
  it('Should SUCCEED to delete user profile', () => {
    const fakePayload = true;

    const action = deleteProfileThunk.fulfilled(fakePayload, fakeRequestId);
    const filledInitialUserState = {
      ...intialUserState,
      profile: null,
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

    const action = deleteProfileThunk.rejected(fakePayload, fakeRequestId);
    const filledInitialUserState = {
      ...intialUserState,
      profile: getProfileResponse,
    };
    const state = userReducer(filledInitialUserState, action);

    expect(action.type).toEqual('user/delete-profile/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual(filledInitialUserState);
    expect(state.profile).toEqual(getProfileResponse);
    expect(state.isProfileDelete).toBeFalsy;
    expect(state.isProfileLoading).toBeFalsy;
  });
});
