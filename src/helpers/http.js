import config from 'config/index';
import axios from 'axios';

const { authCookie, apiBase } = config;

const sparkpostRequest = axios.create({ baseURL: apiBase });

function useRefreshToken(refresh_token) {
  return sparkpostRequest({
    method: 'POST',
    url: '/authenticate',
    data: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    headers: authCookie.requestHeaders
  });
}

export { sparkpostRequest, useRefreshToken };
