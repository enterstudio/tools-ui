import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import config from 'config/index';
import ResultsHeader from './components/ResultsHeader';
import ResultsErrors from './components/ResultsErrors';
import { BackLink } from 'components/button/Button';
import ErrorMessage from 'components/errors/ErrorMessage';

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
    return this.getResults(this.props.params.domain);
  }

  getResults(domain) {
    this.setState({loading: true});

    return axios.get(`${config.apiBase}/messaging-tools/spf/query`, {params: { domain }})
      .then(({ data }) => {
        const results = data.results;
        const errors = data.errors;

        if (errors) {
          return this.setState({ error: errors[0] });
        }

        results.spf_tree = walkTree(results.spf_tree);
        // need to set IDs after walking due to flattening a and mx records
        setTreeId(results.spf_tree);
        results.timestamp = moment().format('MMM D YYYY[, at] h:mm A');
        this.setState({ results });
      })
      .catch((err) => {
        this.setState({ error: {message: 'There was an error getting your results.'} });
      })
      .then(() => this.setState({loading: false}), () => this.setState({loading: false}));
  }

  renderBackLink() {
    return <BackLink to='/spf/inspector' title='Back to SPF Inspector' />;
  }

  renderLoading() {
    return (
      <div>
        {this.renderBackLink()}
        <div className='panel panel--accent'>
          <div className='panel__body text--center paddingTop--xxl paddingBottom--xxl'>
            <h4 className='text--muted'>Inspecting {this.props.params.domain}...</h4>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { results, loading, error } = this.state;
    const { domain } = this.props.params;
    const { errors: spfErrors, warnings: spfWarnings, spf_tree } = results;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return (
        <div>
          {this.renderBackLink()}
          <ErrorMessage friendly={'Ut oh!'} details={error.message}></ErrorMessage>
        </div>
      );
    }

    return (
      <div>
        {this.renderBackLink()}
        <ResultsHeader results={results} domain={domain} refresh={() => this.getResults(domain)} />
        <ResultsErrors errors={spfErrors} warnings={spfWarnings} />
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
