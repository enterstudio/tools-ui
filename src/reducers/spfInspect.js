/* eslint-disable complexity */
import moment from 'moment';
import _ from 'lodash';

const initialState = {
  results: { errors: [], warnings: [], spf_tree: { root: {}} },
  loading: false,
  error: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SPF_INSPECT_PENDING': {
      return {
        ...state,
        loading: true
      };
    }

    case 'SPF_INSPECT_SUCCESS': {
      const { errors, warnings, authorized_netblocks, dns_lookups } = action.payload;
      const timestamp = moment().format('MMM D YYYY[, at] h:mm A');
      return {
        ...state,
        results: {
          spfErrors: errors,
          spfWarnings: warnings,
          authorized_netblocks,
          dns_lookups,
          timestamp
        },
        loading: false
      };
    }

    case 'SPF_INSPECT_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

  }

  return state;

};