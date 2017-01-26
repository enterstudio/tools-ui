/* eslint-disable no-console */
import React, { Component } from 'react';
import { CopyPopover } from 'components/popover/Popover';
import { BackLink } from 'components/button/Button';

export default class ResultsHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareOpen: false
    };
  }

  render() {
    return (
      <div>
        <BackLink to='/spf' title='Back to SPF Inspector'></BackLink>
        <div className='panel panel--accent text--left'>
          <div className='panel__body'>
            <div className="flex">
              <div className="col-xs-8">
                <h1>{ this.props.domain }</h1>
                <small className="text--muted">Tested on { this.props.results ? this.props.results.timestamp : '...' }</small>
              </div>
              <div className="col-xs-4 clearfix">
                {/*<span className="padding--md float--right">*/}
                  {/*Save Results <i className="fa fa-question-circle-o"></i>*/}
                {/*</span>*/}
                <span className="padding--md float--right">
                 <CopyPopover><span>Share</span></CopyPopover>
                </span>
                <span className="padding--md float--right">
                  <span onClick={ this.props.refresh }>Refresh</span>
                </span>
              </div>
            </div>

            <hr/>

            <div className="flex">
              <div className="col-xs-3">
                <b>{ this.props.results.authorized_netblocks }</b> Authorized Netblocks
              </div>
              <div className="col-xs-9">
                <b> { this.props.results.dns_lookups }</b> DNS Lookups
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
