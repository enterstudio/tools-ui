/**
 * Intercepts SPARKPOST_API_REQUEST actions and
 * creates the appropriate HTTP request, dispatching
 * the 3 necessary actions for each request.
 */

import axios from 'axios';
import config from 'config/index';
import _ from 'lodash';
import { refresh } from 'actions/auth';
import qs from 'qs';

const http = axios.create({ baseURL: config.apiBase });

// http({ url: '/what/ok/yeah' });

export default function sparkpostApiRequest({ dispatch, getState }) {
  return (next) => (action) => {

    next(action);

    if (action.type !== 'SPARKPOST_API_REQUEST') {
      return;
    }

    const noType = 'NO_TYPE_DEFINED';
    const { auth } = getState();
    const { meta } = action;
    const { url, method = 'get', types = [], params, headers, data, chain = {} } = meta;
    const [PENDING_TYPE = noType, SUCCESS_TYPE = noType, FAIL_TYPE = noType] = types;

    dispatch({
      type: PENDING_TYPE
    });

    const httpOptions = {
      method: method.toLowerCase(),
      url,
      params,
      headers,
      data
    };

    if (auth.loggedIn) {
      _.set(httpOptions, 'headers.Authorization', auth.token);
    }

    http(httpOptions).then(({ data: { results, errors }}) => {
      // TODO can this happen?
      if (errors) {
        console.log('err results', results); // eslint-disable-line no-console
        return dispatch({
          type: FAIL_TYPE,
          payload: errors[0]
        });
      }

      dispatch({
        type: SUCCESS_TYPE,
        payload: results
      });

      // if we need to chain together another action, do it here
      if (typeof chain.success === 'function') {
        dispatch(chain.success(results));
      }

    }, ({ message, stack, response }) => {
      // NOTE: if this is a 401, need to do a refresh method to get
      // a new token and then re-dispatch this action
      if (response.status === 401 && auth.refreshToken) {
        return refreshAndRetry(auth, dispatch, action); // TODO prevent infinite retry loop
      }
      dispatch({
        type: FAIL_TYPE,
        payload: { message, response }
      });
    });
  };
}

function refreshAndRetry({ refreshToken: refresh_token }, dispatch, originalAction) {
  return http({
    method: 'POST',
    url: '/authenticate',
    data: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token
    }),
    headers: {
      Authorization: 'Basic bXN5c1VJTGltaXRlZDphZjE0OTdkYS02NjI5LTQ3NTEtODljZS01ZDBmODE4N2MyMDQ=', // TODO move this to config?
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  // dispatch a refresh action to set the new cookie
  .then((result) => dispatch(refresh(result)))

  // dispatch the original action again, with refreshed auth
  .then(() => dispatch(originalAction))

  .catch((err) => console.log('oops oops refresh', err.response, err.response.data.error_description)); // eslint-disable-line no-console
}