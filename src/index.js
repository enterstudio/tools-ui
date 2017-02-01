import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import routes from './routes';
import './styles/tools.scss';

const debug = () => (next) => (action) => {
  console.log('=== ACTION ==='); // eslint-disable-line no-console
  console.log(action); // eslint-disable-line no-console
  next(action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, debug)
);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById('root'));
