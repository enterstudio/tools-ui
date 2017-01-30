/* eslint-disable no-console */
import React, { Component } from 'react';
import classNames from 'classnames';

import './SPFTree.scss';

class SPFNode extends Component {

  renderChildren() {
    const { expanded, children = null } = this.props;
    if (!expanded || !children) {
      return null;
    }

    return (
      <div className="spf-tree__children">
        {this.props.children.map((child) => <SPFNode key={child.treeId} {...child}>{child.children}</SPFNode>)}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className='panel__heading'>
        <h4>SPF Record</h4>
      </div>
    );
  }

  render() {
    const { domain = null, record, displayType = null, value = null, root = false, children = null } = this.props;
    const label = domain ? domain : `${displayType}:${value}`;

    // TODO see if we can anchor link to panel with error
    // TODO add child type 'error'

    const panelClasses = classNames('panel', {
      'spf-tree__child': !root,
      [`spf-tree__child--${displayType}`]: displayType,
      'can-expand': children
    });

    const labelClasses = classNames('spf-tree__code', {
      [`spf-tree__code--${displayType}`]: displayType,
      'spf-tree__code--label': record // if record, use label styles
    });

    return (
      <div className={classNames('spf-tree__childWrapper', {'spf-tree': root})}>
        <div className={panelClasses}>
          {root && this.renderHeader()}
          <div className='panel__body'>

            <code className={labelClasses}>{ label }</code>
            { record && <code className='spf-tree__code'>{ record }</code>}

          </div>
          <div className='spf-tree__accent' />
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

export default SPFNode;
