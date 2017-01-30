import React, { Component } from 'react';
import axios from 'axios';

import ResultListRow from 'components/spf/ResultListRow';

class History extends Component {
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
      url: 'http://api.sparkpost.dev/api/v1/messaging-tools/spf/history'
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
    }, ({ response: { data: { errors = [] }}}) => {
      this.setState({
        error: errors[0],
        loading: false
      });
    });
  }

  renderResults() {
    const { results } = this.state;

    if (results.length === 0) {
      return this.renderEmpty();
    }

    return results.map((values) => this.renderResultListRow(values));
  }

  renderResultListRow(row) {
    return (
        <ResultListRow key={row.id} {...row} />
    );
  }

  renderEmpty() {
    return (
        <div className='text--center paddingTop--md'>
          <p className='text--regular text--muted'>Search for SPF records to start saving results!</p>
        </div>
    );
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

History.defaultProps = {
  loggedIn: false
};

History.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

export default History;
