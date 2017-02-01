import React from 'react';
import classNames from 'classnames';

import './SPFNode.scss';

function SPFNode({ domain = null, record, displayType = null, value = null, root = false, children = null }) {
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
        {root && <Header/>}
        <div className='panel__body'>

          <code className={labelClasses}>{ label }</code>
          { record && <code className='spf-tree__code'>{ record }</code>}

        </div>
        <div className='spf-tree__accent' />
      </div>
      <Children>{children}</Children>
    </div>
  );
}

function Children({children = null }) {
  if (!children) {
    return null;
  }

  return (
    <div className="spf-tree__children">
      {children.map((child) => <SPFNode key={child.treeId} {...child}>{child.children}</SPFNode>)}
    </div>
  );
}

function Header() {
  return (
    <div className='panel__heading'>
      <h4>SPF Record</h4>
    </div>
  );
}

export default SPFNode;
