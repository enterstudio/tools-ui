import React, { Component } from 'react';

import ChildRecordPanel from './ChildRecordPanel';

export default class ChildRecord extends Component {
  constructor(props) {
    super(props);

    this.state = { childrenCollapsed: true };
  }

  componentWillMount() {
    const { record } = this.props;
    this.displayType = record.type === 'mxChild' ? 'mx' : record.type;
  }

  toggleChildren() {
    this.setState({ childrenCollapsed: !this.state.childrenCollapsed });
  }

  renderChildren() {
    const children = this.props.record.children;

    if (!children || !children.length) {
      return null;
    }

    // Need to render mx children the same time its siblings are (within same div)
    return children.map((child, idx) => {
      if (child.type === 'mx' && child.children) {
        return child.children.map((mxChild, midx) => {
          mxChild.type = 'mxChild';
          return <ChildRecord key={ `${idx}-${midx}` } record={ mxChild } />;
        });
      }
      return <ChildRecord key={ idx } record={ child } />;
    });
  }

  render() {
    const { record } = this.props;
    const { childrenCollapsed } = this.state;

    return (
      <ChildRecordPanel childrenCollapsed={ childrenCollapsed } type={ this.displayType } value={ record.value } record={ record.record } toggle={ () => this.toggleChildren() }>
        { childrenCollapsed ? null : this.renderChildren() }
      </ChildRecordPanel>
    );
  }
}
