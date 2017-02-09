const initialState = {
  error: null,
  email: null,
  loading: false
};

export default (state = initialState, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case 'DKIM_REMOVE_SAVED_EMAIL_SUCCCESS': {
      return {
        ...state,
        email: null
      };
    }

    case 'DKIM_SAVED_EMAIL': {
      return {
        ...state,
        email: action.email
      };
    }

    case 'DKIM_GENERATE_EMAIL_PENDING': {
      return {
        ...state,
        loading: true
      };
    }

    case 'DKIM_GENERATE_EMAIL_SUCCESS': {
      return {
        ...state,
        loading: false,
        email: action.payload.email
      };
    }

    case 'DKIM_GENERATE_EMAIL_FAIL': {
      return {
        ...state,
        error: action.payload.message
      };
    }
  }

  return state;
};

