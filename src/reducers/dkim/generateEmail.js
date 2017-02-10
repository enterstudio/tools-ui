import makeReducer from 'reducers/makeReducer';

export default makeReducer({
  initialState: {
    error: null,
    email: null,
    loading: false
  },
  types: {
    'DKIM_REMOVE_EMAIL': (state, action) => ({
      ...state,
      email: null
    }),
    'DKIM_SAVED_EMAIL': (state, action) => ({
      ...state,
      email: action.email
    }),
    'DKIM_GENERATE_EMAIL_PENDING': (state, action) => ({
      ...state,
      loading: true
    }),
    'DKIM_GENERATE_EMAIL_SUCCESS': (state, action) => ({
      ...state,
      loading: false,
      email: action.payload.email
    }),
    'DKIM_GENERATE_EMAIL_FAIL': (state, action) => ({
      ...state,
      error: action.payload.message
    })
  }
});
