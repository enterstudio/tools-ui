import React from 'react';
import { Route, Redirect } from 'react-router';
import App from 'components/App';
import DKIMHome from 'pages/dkim/HomePage';
import DKIMResults from 'pages/dkim/ResultListPage';
import DKIMDetail from 'pages/dkim/ResultDetailPage';
import NotFound from 'pages/notFound/NotFound';
import SPFQuery from 'pages/spf/Query';
import SPFResults from 'pages/spf/ResultsPage';

export default (
  <Route>
    <Redirect from='/' to='/dkim' />
    <Route path='/' component={App}>
      <Redirect from='/dkim/results' to='/dkim' />
      <Route path='dkim' component={DKIMHome} />
      <Route path='dkim/results/:email' component={DKIMResults} />
      <Route path='dkim/results/:email/:detailId' component={DKIMDetail} />

      <Route path='spf/inspector' component={SPFQuery} />
      <Redirect from='/spf' to='/spf/inspector' />
      <Redirect from='/spf/inspector/results' to='/spf/inspector' />
      <Route path='spf/inspector/results/:domain' component={SPFResults} />

      <Route path='*' component={NotFound} />
    </Route>
  </Route>
);
