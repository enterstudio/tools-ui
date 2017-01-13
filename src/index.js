import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import App from './components/App';
import DKIMHome from './pages/dkim/HomePage';
import DKIMResults from './pages/dkim/ResultListPage';
import DKIMDetail from './pages/dkim/ResultDetailPage';

import './styles/tools.scss';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from='/' to='/dkim' />
    <Route path='/' component={App}>
      <Route path='dkim' component={DKIMHome} />
      <Redirect from='/dkim/results' to='/dkim' />
      <Route path='dkim/results/:email' component={DKIMResults} />
      <Route path='dkim/results/:email/:detailId' component={DKIMDetail} />
    </Route>
  </Router>
), document.getElementById('root'));
