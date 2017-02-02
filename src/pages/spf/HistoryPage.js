import React, { Component } from 'react';
import axios from 'axios';
import config from 'config/index';

import ResultListRow from './components/ResultListRow';

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getResults();
  }

  // TODO move this to redux
  getResults() {
    this.setState({ loading: true });
    return axios({
      method: 'get',
      url: `${config.apiBase}/messaging-tools/spf/history`
    })
    .then(({ data }) => {
      const { results } = data;
      this.setState({
        results: results.map(({ domain, status, timestamp }, idx) => (
          {
            id: idx, domain, status, timestamp
          }
        )),
        loading: false
      });
    })
    .catch((err) => {
      this.setState({
        error: err,
        loading: false
      });
    });
  }

  renderResults() {
    const { results } = this.state;

    if (results.length === 0) {
      return (
        <div className='text--center paddingTop--md'>
          <p className='text--regular text--muted'>Search for SPF records to start saving results!</p>
        </div>
      );
    }

    return results.map((row, i) => <ResultListRow key={i} {...row} />);
  }

  renderLoading() {
    return (
        <div className='text--center paddingTop--md'>
          <p className='text--regular text--muted'>Loading History...</p>
        </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
        <div className='flex center-xs'>
          <div className='col-xs-12 col-md-10 col-lg-7'>
            <h1>SPF History</h1>
            {loading ? this.renderLoading() : this.renderResults()}
          </div>
        </div>
    );
  }
}

HistoryPage.defaultProps = {
  loggedIn: false
};

HistoryPage.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

export default HistoryPage;
