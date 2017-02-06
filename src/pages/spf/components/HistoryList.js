import React, { Component } from 'react';
import axios from 'axios';
import config from 'config/index';
import moment from 'moment';

import HistoryRow from './HistoryRow';

class HistoryList extends Component {
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
            id: idx, domain, status,
            timestamp: moment(timestamp).format('[Inspected on] MMM D YYYY[, at] h:mm A')
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
        <div className='text--center'>
          <p className='text--regular text--muted'>Search for SPF records to start saving results!</p>
        </div>
      );
    }

    return results.map((row, i) => <HistoryRow key={i} {...row} />);
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
        <div className='text--left'>
          <h4 className='marginBottom--xs'>SPF History</h4>
          {loading ? this.renderLoading() : this.renderResults()}
        </div>
    );
  }
}

export default HistoryList;
