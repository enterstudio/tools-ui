import moment from 'moment';

const initialState = {
  error: null,
  detailTableRows: [],
  sigTableHeaders: ['Status', 'DKIM Selector (s=)', 'Signing Domain (d=)', 'Timestamp (t=)'],
  sigTableRows: [],
  loading: true
};

export default (state = initialState, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case 'DKIM_GET_DETAILED_RESULT_SUCCESS': {
      return {
        ...state,
        detailTableRows: [
          ['Subject', action.payload.subject],
          ['From', action.payload.header_from],
          ['On', moment(action.payload.received).local().format('MMM D YYYY[, at] h:mm A')],
          ['Status', action.payload.result ? 'Passed' : 'Failed']
        ],
        sigTableRows: action.payload.sigs.map(({ s, d, t, result }) => ([result ? 'Passed' : 'Failed', s, d, t || 'N/A'])),
        loading: false
      };
    }

    case 'DKIM_GET_DETAILED_RESULT_FAIL': {
      return {
        ...state,
        error: action.payload.message
      };
    }
  }

  return state;
};
