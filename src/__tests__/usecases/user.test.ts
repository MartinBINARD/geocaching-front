import userReducer, { intialUserState } from '../../domain/usecases/user';

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
