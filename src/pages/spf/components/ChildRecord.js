import React, { Component } from 'react';

import ChildRecordPanel from './ChildRecordPanel';

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

  toggleChildren() {
    this.setState({childrenCollapsed: !this.state.childrenCollapsed });
  }

  renderChildren() {
    const children = this.props.record.children;

    if (!children || !children.length || this.state.childrenCollapsed) {
      return null;
    }

    return children.map((child, idx) => <ChildRecord key={ idx } record={ child } level={ this.props.level + 1 } collapsed={ this.state.childrenCollapsed }></ChildRecord>);
  }

  render() {
    const {record, collapsed = false} = this.props;

    if (record.type === 'mxParent') {
      // nothing to show for the root mx record... just include children in line
      return <div className="spf-tree__child"> { this.renderChildren() } </div>;
    }

    return (
      <ChildRecordPanel collapsed={ collapsed } childrenCollapsed={ this.state.childrenCollapsed } type={ record.type } value={ record.value } record={ record.record } toggle={ () => this.toggleChildren() }>
        { this.renderChildren() }
      </ChildRecordPanel>
    );
  }
}
