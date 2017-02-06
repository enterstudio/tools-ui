const initialState = {
  loading: false,
  error: null,
  list: []
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SPF_HISTORY_PENDING': {
      return {
        ...state,
        loading: true
      };
    }

    case 'SPF_HISTORY_SUCCESS': {
      return {
        ...state,
        loading: false,
        list: action.payload.map(({ domain, status, timestamp }, id) => ({ id, domain, status, timestamp }))
      };
    }

    case 'SPF_HISTORY_FAIL': {
      return {
        ...initialState,
        error: action.payload
      };
    }

  }

  return state;
};
