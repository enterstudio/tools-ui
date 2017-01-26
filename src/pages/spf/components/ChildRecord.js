import React, { Component } from 'react';
import classNames from 'classnames';

import './ChildRecord.scss';

export default class ChildRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenCollapsed: true
    };
  }

  componentDidMount() {
    if (this.props.record.type === 'mx' && this.hasChildren()) {
      this.props.record.type = 'mxParent';
      this.props.record.children.forEach((child) => child.type = 'mx');
    }
  }

  hasChildren() {
    return this.props.record.children && this.props.record.children.length > 0;
  }

  renderExpandToggle() {
    const icon = this.state.childrenCollapsed ? 'fa-angle-up' : 'fa-angle-down';

    if (this.hasChildren()) {
      return <i className={ classNames('fa', icon, 'fa-2x', 'float--right') } onClick={ () => this.toggleChildren() }></i>;
    }

    return null;
  }

  toggleChildren() {
    this.setState({childrenCollapsed: !this.state.childrenCollapsed });
  }

  renderChildren() {
    const children = this.props.record.children;

    if (!children || !children.length) {
      return null;
    }

    return children.map((child, idx) => <ChildRecord key={ idx } record={ child } level={ this.props.level + 1 } collapsed={ this.state.childrenCollapsed }></ChildRecord>);
  }

  render() {
    if (this.props.record.type === 'mxParent') {
      // nothing to show for the root mx record... just include children in line
      return <div className="spf-child-record"> { this.renderChildren() } </div>;
    }

    return (
      <div className={ classNames('spf-child-record', {'h-hide': this.props.collapsed}) } >
        <div className={classNames('panel', 'text--left', `spf-child-record--${this.props.record.type}`) }>
          <div className='panel__body'>
            <div className="flex">
              <div className="col-xs-11">
                <div className={ classNames(`spf-child-record__type--${this.props.record.type}`)}>{ this.props.record.type }:{ this.props.record.value }</div>
                <span>{ this.props.record.record }</span>
              </div>
              <div className="col-xs-1">
                { this.renderExpandToggle() }
              </div>
            </div>
          </div>
        </div>

        { this.renderChildren() }
      </div>
    );
  }
}
