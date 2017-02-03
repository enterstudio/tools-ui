import cookie from 'js-cookie';
import config from 'config/index';

const { authCookie } = config;

export const checkLogin = () => (dispatch, getState) => {
  const { auth } = getState();

  // already logged in, do nothing
  if (auth.loggedIn) { return; }

  const storedAuthCookie = cookie.get(authCookie.name);

  if (storedAuthCookie) {
    dispatch({
      type: 'AUTH_LOG_IN',
      payload: storedAuthCookie
    });
  } else {
    dispatch({
      type: 'AUTH_LOG_OUT'
    });
  }

};

export const logout = () => {
  cookie.remove(authCookie.name, authCookie.options);
  return {
    type: 'AUTH_LOG_OUT'
  };
};
