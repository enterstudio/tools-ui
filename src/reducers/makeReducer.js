export default (config) => (state = config.initialState || {}, action = {}) => {
  if (config.types && typeof config.types[action.type] === 'function') {
    return config.types[action.type](state, action);
  }

  return state;
};
