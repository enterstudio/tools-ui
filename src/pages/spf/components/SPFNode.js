import React from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';

import './SPFNode.scss';

function SPFNode({
  tree,
  treeId,
  domain = null,
  record,
  displayType = null,
  value = null,
  root = false,
  children = null,
  expanded = true,
  expand,
  collapse
}) {
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

  const toggleClasses = classNames({
    'fa-rotate-180': expanded
  });

  return (
    <div className={classNames('spf-tree__childWrapper', {'spf-tree': root})}>
      <div className={panelClasses} onClick={() => expanded ? collapse(treeId) : expand(treeId)}>
        <div className='panel__body'>

          <code className={labelClasses}>{ label }</code>
          {record && <code className='spf-tree__code'>{ record }</code>}
          {children && <Icon name='chevron-up' extras={toggleClasses} />}

        </div>
        <div className='spf-tree__accent' />
      </div>
      <Children tree={tree} expanded={expanded} expand={expand} collapse={collapse}>{children && children.map((childId) => tree[childId])}</Children>
    </div>
  );
}

function Children(props) {
  const { children = null, expanded } = props;

  if (!expanded || !children) {
    return null;
  }

  return (
    <div className="spf-tree__children">
      {children.map((child) => <SPFNode key={child.treeId} {...props} {...child}>{child.children}</SPFNode>)}
    </div>
  );
}

export default SPFNode;
