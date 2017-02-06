import axios from 'axios';
import config from 'config/index';

const spfInspect = (domain) => (dispatch) => {
  dispatch({
    type: 'SPF_INSPECT_PENDING'
  });

  return axios.get(`${config.apiBase}/messaging-tools/spf/query`, { params: { domain } })
    .then(({ data: { results, errors } }) => {

      if (errors) {
        return dispatch({
          type: 'SPF_INSPECT_FAIL',
          payload: errors[0]
        });
      }

      dispatch({
        type: 'SPF_INSPECT_SUCCESS',
        payload: results
      });
    }, (err) => {
      dispatch({
        type: 'SPF_INSPECT_FAIL',
        payload: { message: 'There was an error getting your results.' }
      });
    });
};

const expandAll = () => ({ type: 'SPF_INSPECT_EXPAND_ALL' });
const collapseAll = () => ({ type: 'SPF_INSPECT_COLLAPSE_ALL' });
const expand = (id) => ({ type: 'SPF_INSPECT_EXPAND', payload: id });
const collapse = (id) => ({ type: 'SPF_INSPECT_COLLAPSE', payload: id });

export { spfInspect, expandAll, collapseAll, expand, collapse };
