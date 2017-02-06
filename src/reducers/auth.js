const initialState = {
  loggedIn: false
};

export default (state = initialState, action) => {

  switch (action.type) {

    case 'AUTH_LOG_IN': {
      const { token, username, refresh_token } = action.payload;
      return {
        token,
        username,
        refresh_token,
        loggedIn: true
      };
    }

    case 'AUTH_LOG_OUT': {
      return { loggedIn: false };
    }

  }

  return state;

};
