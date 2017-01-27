import React, { Component } from 'react';
import classNames from 'classnames';
import ChildRecord from './ChildRecord';

import './SPFTree.scss';

export default class SPFTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenCollapsed: false
    };
  }

  toggleChildren() {
    this.setState({childrenCollapsed: !this.state.childrenCollapsed});
  }

  renderChildren() {
    const children = this.props.results.spf_tree.children;

    if (!children || !children.length || this.state.childrenCollapsed) {
      return null;
    }

    return (
      <div className='spf-tree__children'>
        {children.map((child, idx) => <ChildRecord key={ idx } record={ child } level={ 1 } collapsed={ this.state.childrenCollapsed }></ChildRecord>)}
      </div>
    );
  }

  render() {
    if (!this.props.results) {
      return <div>Loading results...</div>;
    }

    return (
      <div className="spf-tree">
        <div className='panel text--left'>

          <div className='panel__heading'>
            {/* TODO enable expand/collapse all once we have redux in place
            <div className="float--right">
              <ActionLink>Expand All</ActionLink>
              <ActionLink>Collapse All</ActionLink>
            </div> */}
            <h4>SPF Record</h4>
          </div>

          <div className='panel__body spf-tree__root' onClick={ () => this.toggleChildren() }>
            <i className={ classNames('spf-tree__chevron fa fa-chevron-down', {'is-open': this.state.childrenCollapsed }) }></i>
            <code className='spf-tree__code spf-tree__code--label'>{ this.props.domain }</code>
            <code className='spf-tree__code'>{ this.props.results.spf_tree.record }</code>
          </div>
        </div>
        { this.renderChildren() }
      </div>
    );
  }
}
