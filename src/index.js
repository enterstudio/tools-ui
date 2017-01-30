import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import setupAxis from './setup-axios';
import routes from './routes';
import './styles/tools.scss';

setupAxis();

ReactDOM.render((
  <Router history={browserHistory} routes={routes} />
), document.getElementById('root'));
