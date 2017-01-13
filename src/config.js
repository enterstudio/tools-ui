const config = {
  default: {},
  development: {
    apiBase: 'http://api.sparkpost.dev/api/v1'
  }
};

const getConfig = (env) => (
  Object.assign({}, config.default, config[env])
);

export default getConfig(process.env.NODE_ENV);
