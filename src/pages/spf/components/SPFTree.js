import React, { Component } from 'react';

export default class SPFTree extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.results) {
      return <div>Hold your horses!</div>;
    }

    return (
      <div className='panel text--left'>
        <div className='panel__body'>
          <div className="flex">
            <div className="col-xs-10">
              <h4>SPF Record</h4>
            </div>
            <div className="col-xs-2 clearfix"><span className="float--right">Expand All</span></div>
          </div>

          <hr/>

          <div className="flex">
            <div className="col-xs-11">
              <div><h6>{ this.props.domain }</h6></div>
              <span>{ this.props.results.spf_tree.record }</span>
            </div>
            <div className="col-xs-1 clearfix">
              <i className="fa fa-angle-down fa-2x float--right"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
