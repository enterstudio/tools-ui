import React, { Component } from 'react';

import './SPFTree.scss';

class SPFNode extends Component {

  renderChildren() {
    const { children = null, expanded } = this.props;
    if (!expanded || !children) {
      return null;
    }
    return children.map((child) => <SPFNode key={child.treeId} {...child}>{child.children}</SPFNode>);
  }

  render() {
    const { domain = null, record, type = null, value = null } = this.props;
    const label = domain ? domain : `${type}:${value}`;
    return (
      <div className='spf-tree__childWrapper'>
        <code className='spf-tree__code spf-tree__code--label'><strong>{label}</strong></code>
        <code className='spf-tree__code'>{record}</code>
        {this.renderChildren()}
      </div>
    );
  }
}

export default SPFNode;
