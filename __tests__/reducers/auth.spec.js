import authReducer from 'reducers/auth';

describe('reducers: auth', () => {

  let previousState;

  beforeEach(() => {
    previousState = {
      token: 'old_token',
      username: 'old_username',
      refreshToken: 'old_refresh'
    };
  })

  it('should return a default state', () => {
    expect(authReducer()).toBeDefined();
  });

  it('should return correct state for AUTH_LOG_IN action', () => {
    const action = {
      type: 'AUTH_LOG_IN',
      payload: {
        token: 'my_token',
        username: 'cool_user',
        refreshToken: 'my_refresh_token'
      }
    };
    previousState.loggedIn = false;
    const state = authReducer(previousState, action);
    expect(state).not.toBe(previousState);
    expect(state).toEqual({
      ...action.payload,
      loggedIn: true
    });
  });

  it('should return correct state for AUTH_LOG_IN when no username is provided', () => {
    const action = {
      type: 'AUTH_LOG_IN',
      payload: {
        token: 'my_token',
        refreshToken: 'my_refresh_token'
      }
    };
    previousState.loggedIn = false;
    const state = authReducer(previousState, action);
    expect(state).not.toBe(previousState);
    expect(state).toEqual({
      ...action.payload,
      username: 'old_username',
      loggedIn: true
    });
  });

  it('should return correct state for AUTH_LOG_OUT', () => {
    previousState.loggedIn = true;
    const state = authReducer(previousState, { type: 'AUTH_LOG_OUT' });
    expect(state).not.toBe(previousState);
    expect(state).toEqual({ loggedIn: false });
  });

});
