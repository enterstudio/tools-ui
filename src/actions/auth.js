import cookie from 'js-cookie';
import config from 'config/index';

const { authCookie } = config;

export function checkLogin() {

  // redux-thunk function
  return (dispatch, getState) => {
    const { auth } = getState();

    // already logged in, do nothing
    if (auth.loggedIn) { return; }

    const storedAuthCookie = cookie.get(authCookie.name);

    if (storedAuthCookie) {
      dispatch({
        type: 'AUTH_LOG_IN',
        payload: JSON.parse(storedAuthCookie)
      });
    } else {
      dispatch({
        type: 'AUTH_LOG_OUT'
      });
    }
  };
}

export function refresh(result) {
  const { data } = result;
  const cookieValues = {
    token: data.access_token,
    refreshToken: data.refresh_token
  };
  let oldCookie = cookie.get(authCookie.name);
  if (oldCookie) {
    oldCookie = JSON.parse(oldCookie);
  }
  const newCookie = Object.assign({}, oldCookie, cookieValues);
  cookie.set(authCookie.name, newCookie, authCookie.options);
  return {
    type: 'AUTH_LOG_IN',
    payload: newCookie
  };
}

export function logout() {
  cookie.remove(authCookie.name, authCookie.options);
  return {
    type: 'AUTH_LOG_OUT'
  };
}
