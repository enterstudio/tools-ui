import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import App from './components/App';
import DKIMHome from './components/dkim/Home';
import DKIMResults from './components/dkim/Results';
import '../node_modules/@sparkpost/styles/src/assets/css/styles.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from='/' to='/dkim' />
    <Route path='/' component={App}>
      <Route path='dkim' component={DKIMHome} />
      <Route path='dkim/results/:email' component={DKIMResults} />
    </Route>
  </Router>
), document.getElementById('root'));
