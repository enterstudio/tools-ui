const config = {
  default: {},
  development: {
    apiBase: 'http://api.sparkpost.dev/api/v1'
  }
}

module.exports = ((env) => {
  return Object.assign({}, config.default, config[env]);
})(process.env.NODE_ENV);
