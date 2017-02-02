import axios from 'axios';
import cookie from 'js-cookie';
import config from 'config/index';

export default() => {
  /*
   * Add a request interceptor to append auth token
   * to request header
   */
  axios.interceptors.request.use(function(requestConfig) {
    if (requestConfig.method !== 'OPTIONS') {
      const authCookie = cookie.get(config.authCookieName);
      const token = JSON.parse(authCookie).token;

      requestConfig.headers.authorization = token;
    }

    return requestConfig;
  }, function(error) {
    return Promise.reject(error);
  });

  /*
   * Response interceptor should see 401 unauthorized
   * responses and do something to re-authenticate the user
   */
  axios.interceptors.response.use(function(response) {
    return response;
  }, function(err) {
    return Promise.reject(err);
  });
};
