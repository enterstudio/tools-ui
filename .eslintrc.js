module.exports = {
  env: {
    browser: true,
    phantomjs: true
  },
  rules: {
    'max-lines': ['warn', { max: 150, skipComments: true }]
  },
  extends: ['react-app', 'sparkpost']
};
