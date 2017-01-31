import React from 'react';
import { CopyPopover } from 'components/popover/Popover';
import { ActionLink } from 'components/button/Button';
import classNames from 'classnames';

export default (props) => {
  const {domain, results, refresh} = props;
  return (
    <div>
      <div className='panel panel--accent'>

        {/*  Top section */}
        <div className='panel__body'>
          <div className='float--right'>
            <CopyPopover><ActionLink>Share</ActionLink></CopyPopover>
            <ActionLink onClick={ refresh }>Refresh</ActionLink>
            </div>
          <h1 className='marginBottom--none marginTop--xs'>{ domain }</h1>
          <p className={classNames('text--muted', 'marginBottom--none', {'h-hide': !results.timestamp})}>Tested on { results.timestamp }</p>
        </div>


        {/*  Info section */}
        <div className='panel__body'>
          <div className="flex">
            <div className="col-xs-3">
              <b>{ results.authorized_netblocks }</b> Authorized Netblocks
            </div>
            <div className="col-xs-3">
              <b>{ results.dns_lookups }</b> DNS Lookups
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
