/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import config from 'config/index';
import ResultsHeader from './components/ResultsHeader';
import ResultsErrors from './components/ResultsErrors';
import SPFTree from './components/SPFTree';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      results: { errors: [], warnings: [], spf_tree: {}}
    };
  }

  componentDidMount() {
    // call the api to get domain results
    return this.getResults(this.props.params.domain);
  }

  getResults(domain) {
    this.setState({loading: true});

    return axios.get(`${config.apiBase}/messaging-tools/spf/query`, {params: { domain }})
      .then(({ data }) => {
        const results = data.results;
        results.timestamp = moment().format('MMM D YYYY[, at] h:mm A');
        this.setState({ results });
      })
      .catch((err) => {
        // TODO show error
      })
      .then(() => this.setState({loading: false}), () => this.setState({loading: false}));
  }

  renderLoading() {
    return (
      <div className='text--center paddingTop--xxl'>
        <h4 className='text--muted'>Inspecting {this.props.params.domain}...</h4>
      </div>
    );
  }

  render() {
    const { domain } = this.props.params;
    const { results, loading } = this.state;

    if (loading) {
      return this.renderLoading();
    }

    return (
      <div>
        <ResultsHeader results={ results } domain={ domain } refresh={ () => this.getResults(domain) } />
        <ResultsErrors errors={ results.errors } warnings={ results.warnings } />
        <SPFTree results={ results } domain={ domain } />
      </div>
    );
  }
}
