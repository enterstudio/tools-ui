/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import config from 'config/index';
import ResultsHeader from './components/ResultsHeader';
import ResultsErrors from './components/ResultsErrors';
import { BackLink } from 'components/button/Button';
// import SPFTree from './components/SPFTree';

import SPFNode from './components/SPFNode';

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
        results.spf_tree = walkTree(results.spf_tree);
        console.log('walked tree:', results.spf_tree); // eslint-disable-line no-console
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
      <div>
        <BackLink to='/spf-inspector' title='Back to SPF Inspector' />
        <div className='panel panel--accent'>
          <div className='panel__body text--center paddingTop--xxl paddingBottom--xxl'>
            <h4 className='text--muted'>Inspecting {this.props.params.domain}...</h4>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { results, loading } = this.state;
    const { domain } = this.props.params;
    const { errors, warnings, spf_tree } = results;

    if (loading) {
      return this.renderLoading();
    }

    return (
      <div>
        <BackLink to='/spf-inspector' title='Back to SPF Inspector' />
        <ResultsHeader results={results} domain={domain} refresh={() => this.getResults(domain)} ></ResultsHeader>
        <ResultsErrors errors={errors} warnings={warnings}></ResultsErrors>
        <SPFNode {...spf_tree} domain={domain}>{spf_tree.children}</SPFNode>
      </div>
    );
  }
}

function walkTree(node, i = '0') {
  const walked = Object.assign({}, node, {
    expanded: false,
    treeId: i
  });

  if (node.children) {
    walked.children = node.children.map((child, j) => walkTree(child, `${i}.${j}`));
  }

  return walked;
}
