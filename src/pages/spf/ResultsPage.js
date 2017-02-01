import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ResultsHeader from './components/ResultsHeader';
import ResultsErrors from './components/ResultsErrors';
import { BackLink, ActionLink } from 'components/button/Button';
import { ErrorMessage } from 'components/errors/ErrorMessage';
import { spfInspect, expandAll, collapseAll, expand, collapse } from 'actions/spf';

import SPFNode from './components/SPFNode';

class ResultsPage extends Component {

  componentDidMount() {
    return this.props.inspect(this.props.params.domain);
  }

  renderBody() {
    const { results, loading, error, params } = this.props;
    const { domain } = params;
    const { errors: spfErrors, warnings: spfWarnings, spf_tree } = results;

    if (loading) {
      return (
        <div className='panel panel--accent'>
          <div className='panel__body text--center paddingTop--xxl paddingBottom--xxl'>
            <h4 className='text--muted'>Inspecting {this.props.params.domain}...</h4>
          </div>
        </div>
      );
    }

    if (error) {
      return <ErrorMessage message={error.message || error}></ErrorMessage>;
    }

    console.log('results???', results); // eslint-disable-line no-console

    return (
      <div>
        <ResultsHeader results={results} domain={domain} refresh={() => this.props.inspect(domain)} ></ResultsHeader>
        <ResultsErrors errors={spfErrors} warnings={spfWarnings}></ResultsErrors>
        <div className="panel marginBottom--none">
          <div className='panel__heading'>
            <div className='float--right'>
              {spf_tree.root && spf_tree.root.expanded ?
                <ActionLink onClick={() => this.props.collapseAll()}>Collapse All</ActionLink> :
                <ActionLink onClick={() => this.props.expandAll()}>Expand All</ActionLink>}
            </div>
            <h4>SPF Record</h4>
          </div>
        </div>
        <SPFNode root={true} tree={spf_tree} {...spf_tree.root} domain={domain} expand={this.props.expand} collapse={this.props.collapse}>{spf_tree.root.children}</SPFNode>
      </div>
    );
  }

  render() {
    return (
      <div>
        <BackLink to='/spf/inspector' title='Back to SPF Inspector' />;
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { results, loading, error } = state.spfInspect;
  return { results, loading, error };
};

export default connect(mapStateToProps, {
  inspect: spfInspect,
  expandAll,
  collapseAll,
  expand,
  collapse
})(ResultsPage);
