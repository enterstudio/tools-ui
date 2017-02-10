import moment from 'moment';
import makeReducer from 'reducers/makeReducer';

export default makeReducer({
  initialState: {
    error: null,
    tableRows: [],
    loading: false
  },
  types: {
    'DKIM_GET_RESULTS_SUCCESS': (state, action) => {
      const tableRows = action.payload.map(({ id, subject, result, header_from, received }) => (
        {
          id, header_from, subject, result,
          received: moment(received).local().format('[Delivered on] MMM D YYYY[, at] h:mm A')
        }
      ));

      return {
        ...state,
        loading: false,
        tableRows: tableRows
      };
    },
    'DKIM_GET_RESULTS_FAIL': (state, action) => ({
      ...state,
      error: action.payload.message
    })
  }
});
