/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
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
        setTreeId(results.spf_tree);
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
        <SPFNode root={true} {...spf_tree} domain={domain}>{spf_tree.children}</SPFNode>
      </div>
    );
  }
}

function walkTree(node) {
  const defaults = {
    expanded: true,
    displayType: node.type
  };
  const walked = Object.assign(defaults, node);

  // mx and a records have child records, but no value of their own, flatten them to simplify the tree
  if (node.type === 'mx' || node.type === 'a') {
    return node.children.map((child) => {
      child.displayType = node.type;
      return walkTree(child);
    });
  }

  if (node.children && node.children.length) {
    walked.children = _.flatten(node.children.map(walkTree));
  }

  return walked;
}

function setTreeId(node, id = '0') {
  node.treeId = id;
  if (node.children) {
    node.children.forEach((child, j) => setTreeId(child, `${id}.${j}`));
  }
}
