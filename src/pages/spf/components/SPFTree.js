import React, { Component } from 'react';
import classNames from 'classnames';
import ChildRecord from './ChildRecord';

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

    if (!children || !children.length) {
      return null;
    }

    return children.map((child, idx) => <ChildRecord key={ idx } record={ child } level={ 1 } collapsed={ this.state.childrenCollapsed }></ChildRecord>);
  }

  render() {
    if (!this.props.results) {
      return <div>Loading results...</div>;
    }

    return (
      <div className="spf-tree">
        <div className='panel text--left'>
          <div className='panel__body'>
            <div className="flex">
              <div className="col-xs-10">
                <h4>SPF Record</h4>
              </div>
              {/* TODO enable expand/collapse all once we have redux in place */}
              {/*<div className="col-xs-2 clearfix"><span className="float--right">Expand All</span></div>*/}
            </div>

            <hr/>

            <div className="flex">
              <div className="col-xs-11">
                <div><h6>{ this.props.domain }</h6></div>
                <span>{ this.props.results.spf_tree.record }</span>
              </div>
              <div className="col-xs-1 clearfix">
                <i className={ classNames('fa', 'fa-2x', 'float--right', {'fa-angle-down': !this.state.childrenCollapsed, 'fa-angle-up': this.state.childrenCollapsed}) } onClick={ () => this.toggleChildren() }></i>
              </div>
            </div>
          </div>
        </div>

        { this.renderChildren() }
      </div>
    );
  }
}
