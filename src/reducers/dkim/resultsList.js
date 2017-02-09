import moment from 'moment';

const initialState = {
  error: null,
  tableRows: [],
  loading: false
};

export default (state = initialState, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case 'DKIM_GET_RESULTS_SUCCESS': {
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
    }

    case 'DKIM_GET_RESULTS_FAIL': {
      return {
        ...state,
        error: action.payload.message
      };
    }
  }

  return state;
};
