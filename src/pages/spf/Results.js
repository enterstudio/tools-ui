/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import config from 'config/index';
import ResultsHeader from './components/ResultsHeader';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      results: null
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
        this.setState({ results });
      })
      .catch((err) => {
        // TODO show error
      })
      .then(() => this.setState({loading: false}), () => this.setState({loading: false}));
  }

  render() {
    return (
      <div>
        {/* for testing */}
        {/*<pre><code>{ JSON.stringify(this.state.results, null, 2) }</code></pre>*/}

        <ResultsHeader results={ this.state.results } domain={ this.props.params.domain } refresh={ () => this.getResults(this.props.params.domain) } ></ResultsHeader>
      </div>
    );
  }
}
