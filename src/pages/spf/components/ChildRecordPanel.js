import React from 'react';
import classNames from 'classnames';

export default (props) => {
  const {childrenCollapsed = true, collapsed = false, type = '', value = '', record, children, toggle = () => {}} = props;
  const icon = childrenCollapsed ? 'fa-angle-up' : 'fa-angle-down';

  return <div className={ classNames('spf-child-record', {'h-hide': collapsed}) }>
    <div className={classNames('panel', 'text--left', `spf-child-record--${type}`) }>
      <div className='panel__body'>
        <div className="flex">
          <div className="col-xs-11">
            <div className={ classNames(`spf-child-record__type--${type}`)}>{ type }:{ value }</div>
            <span>{ record }</span>
          </div>
          <div className="col-xs-1">
            <i className={ classNames('fa', icon, 'fa-2x', 'float--right', {'h-hide': !children }) } onClick={ toggle }></i>
          </div>
        </div>
      </div>
    </div>
    { children }
  </div>;
};
