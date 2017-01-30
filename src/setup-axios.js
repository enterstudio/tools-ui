import axios from 'axios';
import cookie from 'js-cookie';

export default() => {
// Add a request interceptor
  axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    console.log('config', config); // eslint-disable-line no-console
    console.log('cookie', cookie.get('auth')); // eslint-disable-line no-console

    if (config.method !== 'OPTIONS') {
      config.headers.authorization = 'a68e6346bc2336bd40911fab1fea363d424e93d5';
    }

    return config;
  }, function(error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
  axios.interceptors.response.use(function(response) {
    // Do something with response data
    console.log('response', response); // eslint-disable-line no-console
    return response;
  }, function(error) {
    // Do something with response error
    return Promise.reject(error);
  });

};
