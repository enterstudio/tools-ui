import React from 'react';
import classNames from 'classnames';

const ChildRecordPanel = (props) => {
  const {childrenCollapsed, type, value, record, children, toggle} = props;

  // TODO see if we can anchor link to panel with error
  // TODO add child type 'error'

  // Can't check children as they are not passed down if collapsed
  const isExpandable = type === 'redirect' || type === 'include';

  const panelClasses = classNames('panel spf-tree__child', {
    [`spf-tree__child--${type}`]: type,
    'can-expand': isExpandable
  });

  const iconClasses = classNames('spf-tree__chevron fa fa-chevron-down', {
    'is-open': childrenCollapsed
  });

  const labelClasses = classNames('spf-tree__code', {
    [`spf-tree__code--${type}`]: type,
    'spf-tree__code--label': record // if record, use label styles
  });

  return (
    <div className='spf-tree__childWrapper'>
      <div className={panelClasses}>
        <div className='panel__body' onClick={ toggle }>

          {isExpandable && <i className={iconClasses} />}
          <code className={labelClasses}>{ type }:{ value }</code>
          { record && <code className='spf-tree__code'>{ record }</code>}

        </div>
        <div className='spf-tree__accent' />
      </div>
      {children && <div className='spf-tree__children'>{ children }</div>}
    </div>
  );
};

ChildRecordPanel.defaultProps = {
  childrenCollapsed: true,
  type: '',
  value: '',
  toggle: null
};

ChildRecordPanel.propTypes = {
  childrenCollapsed: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  record: React.PropTypes.string,
  children: React.PropTypes.array,
  toggle: React.PropTypes.func
};


export default ChildRecordPanel;
