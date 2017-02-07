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

    const { auth } = getState();
    const { meta } = action;
    const { url, method = 'get', type = 'NO_TYPE_DEFINED', params, headers, data, chain = {} } = meta;
    const PENDING_TYPE = `${type}_PENDING`;
    const SUCCESS_TYPE = `${type}_SUCCESS`;
    const FAIL_TYPE = `${type}_FAIL`;

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

    return http(httpOptions).then(({ data: { results }}) => {
      // this only happens if 2xx status code
      dispatch({
        type: SUCCESS_TYPE,
        payload: results
      });

      // if we need to chain together another action, do it here
      if (typeof chain.success === 'function') {
        dispatch(chain.success(results));
      }

    }, ({ message, response }) => {
      // NOTE: if this is a 401, need to do a refresh method to get
      // a new token and then re-dispatch this action
      if (response.status === 401 && auth.refreshToken) {
        // call API for new token
        return getRefreshToken(auth.refreshToken)
          // dispatch a refresh action to save new token results
          .then((result) => dispatch(refresh(result)))
          // dispatch the original action again, now that we have a new token
          // but if that fails, fail the request
          .then(() => dispatch(action), ({ message, response }) => {
            dispatch({
              type: FAIL_TYPE,
              payload: { message, response }
            });
          });
      }
      // any other API error should automatically fail
      // TODO on 403 should we do an AUTH_LOG_OUT action?
      dispatch({
        type: FAIL_TYPE,
        payload: { message, response }
      });
    })
    .catch((err) => {
      // curious to understand when/how errors would find their way here, and what happens if/when they do
      console.log('error appeared in spapirequest middleware catch()', err.message); // eslint-disable-line no-console
      throw err;
    });
  };
}

function getRefreshToken(refresh_token) {
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
  });
}
