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
    // A component cannot update its own props
    //
    // const { record } = this.props;
    //
    // record.displayType = record.type;
    //
    // if (record.type === 'mx' && this.hasChildren()) {
    //   record.children.forEach((child) => {
    //     child.type = 'mxChild';
    //     child.displayType = 'mx';
    //   });
    // }
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

    return children.map((child, idx) => {
      // skip the mx record, have mxChild records behave like children of parent component
      const collapsed = child.type === 'mxChild' ? this.props.collapsed : this.state.childrenCollapsed;
      return (<ChildRecord key={ idx } record={ child } level={ this.props.level + 1 } collapsed={ collapsed }></ChildRecord>);
    });
  }

  render() {
    const {record, collapsed = false} = this.props;

    if (record.type === 'mx') {
      // nothing to show for the root mx record... just include children in line
      return this.renderChildren();
    }

    return (
      <ChildRecordPanel collapsed={ collapsed } childrenCollapsed={ this.state.childrenCollapsed } type={ record.type } value={ record.value } record={ record.record } toggle={ () => this.toggleChildren() }>
        { this.renderChildren() }
      </ChildRecordPanel>
    );
  }
}
