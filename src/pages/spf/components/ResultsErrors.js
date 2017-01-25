import React, { Component } from 'react';

export default class ResultsErrors extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className="panel">
        <div className="panel__body">
          <div className="flex">
            <div className="col-xs-12">
              {/*TODO warnings*/}
              <span>{ this.props.results ? this.props.results.errors.length : '¯\\_(ツ)_/¯'} Errors Found</span>
              <ul>
                { this.props.results.errors.map((error) => <li>{error.message}</li>) }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
