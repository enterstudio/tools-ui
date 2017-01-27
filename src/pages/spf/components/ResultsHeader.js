/* eslint-disable no-console */
import React, { Component } from 'react';
import { CopyPopover } from 'components/popover/Popover';
import { ActionLink, BackLink } from 'components/button/Button';

export default class ResultsHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BackLink to='/spf' title='Back to SPF Inspector' />
        <div className='panel panel--accent'>

          {/*  Top section */}
          <div className='panel__body'>
            <div className='float--right'>
              <CopyPopover><ActionLink>Share</ActionLink></CopyPopover>
              <ActionLink onClick={ this.props.refresh }>Refresh</ActionLink>
            </div>

            <h1 className='marginBottom--none marginTop--xs'>{ this.props.domain }</h1>
            <p className="text--muted marginBottom--none">Tested on { this.props.results ? this.props.results.timestamp : '...' }</p>
          </div>

          {/*  Info section */}
          <div className='panel__body'>
            <div className="flex">
              <div className="col-xs-3">
                <b>{ this.props.results.authorized_netblocks }</b> Authorized Netblocks
              </div>
              <div className="col-xs-3">
                <b> { this.props.results.dns_lookups }</b> DNS Lookups
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
