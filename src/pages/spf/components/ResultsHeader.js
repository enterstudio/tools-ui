/* eslint-disable no-console */
import React, { Component } from 'react';
import { CopyPopover } from 'components/popover/Popover';

export default class ResultsHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareOpen: false
    };
  }

  render() {
    return (
      <div className='panel panel--accent text--left'>
        <div className='panel__body'>
          <div className="flex">
            <div className="col-xs-10">
              <h1>{ this.props.domain }</h1>
            </div>
            <div className="col-xs-1">
              <CopyPopover><span className="orange">Share</span></CopyPopover>
            </div>
            <div className="col-xs-1">
              <span onClick={ this.props.refresh }>Refresh</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
