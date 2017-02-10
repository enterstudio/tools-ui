import makeReducer from 'reducers/makeReducer';

export default makeReducer({
  initialState: {
    loading: false,
    error: null,
    list: []
  },
  types: {
    'SPF_GET_HISTORY_PENDING': (state, action) => ({
      ...state,
      loading: true
    }),
    'SPF_GET_HISTORY_SUCCESS': (state, action) => ({
      ...state,
      loading: false,
      list: action.payload.map(({ domain, status, timestamp }, id) => ({ id, domain, status, timestamp }))
    }),
    'SPF_GET_HISTORY_FAIL': (state, action) => ({
      ...state,
      error: action.payload
    })
  }
});
