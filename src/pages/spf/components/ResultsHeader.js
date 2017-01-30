/* eslint-disable no-console */
import React from 'react';
import { CopyPopover } from 'components/popover/Popover';
import { ActionLink, BackLink } from 'components/button/Button';

export default (props) => {
  const {domain, results, refresh} = props;
  return (
    <div>
      <BackLink to='/spf-inspector' title='Back to SPF Inspector' />
      <div className='panel panel--accent'>

        {/*  Top section */}
        <div className='panel__body'>
          <div className='float--right'>
            <CopyPopover><ActionLink>Share</ActionLink></CopyPopover>
            <ActionLink onClick={ refresh }>Refresh</ActionLink>
            </div>
          <h1 className='marginBottom--none marginTop--xs'>{ domain }</h1>
          <p className="text--muted marginBottom--none">Tested on { results ? results.timestamp : '...' }</p>
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
