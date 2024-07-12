import { validLoginResponse } from '../../../../__mocks__/auth.mocks';
import { fakeRequestId } from '../../../../__mocks__/request.mocks';
import authReducer, {
  intialAuthState,
} from '../../../../infracstructure/store/reducers/auth';
import { fetchSessionThunk } from '../../../../infracstructure/store/thunks/auth/FetchSessionThunk';

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

describe('Fetch session state test', () => {
  it('Should SUCCEED to fetch session user', () => {
    const fakePayload = validLoginResponse;

    const action = fetchSessionThunk.fulfilled(fakePayload, fakeRequestId);
    const state = authReducer(intialAuthState, action);
    expect(action.type).toEqual('settings/fetch-session/fulfilled');
    expect(action.payload).toEqual(fakePayload);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);

    expect(state).toEqual({ ...intialAuthState, user: fakePayload });
  });

  it('Should FAIL to fetch session user', () => {
    const fakePayload = null;

    const action = fetchSessionThunk.rejected(fakePayload, fakeRequestId);
    const state = authReducer(intialAuthState, action);

    expect(action.type).toEqual('settings/fetch-session/rejected');
    expect(action.payload).toEqual(undefined);
    expect(action.meta.requestId).toEqual(fakeRequestId);
    expect(action.meta.arg).toEqual(undefined);
    expect(action.error).toEqual({ message: 'Rejected' });

    expect(state).toEqual({ ...intialAuthState, user: null });
  });
});
