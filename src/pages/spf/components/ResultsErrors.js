import React, { Component } from 'react';

export default class ResultsErrors extends Component {
  constructor(props) {
    super(props);
  }

  renderCategory(idx, error) {
    // TODO figure out friendly error messages and linking to child record
    return (
      <div key={idx} className='panel__body'>{error.message}</div>
    );
  }

  renderSummary() {
    const { results } = this.props;
    // TODO ¯\_(ツ)_/¯
    return (
      <h5>{ results ? results.errors.length : '¯\\_(ツ)_/¯'} Errors Found</h5>
    );
  }

  render() {
    return (
      <div className="panel">
        <div className='panel__heading'>
          { this.renderSummary() }
        </div>

        {/*TODO warnings*/}
        { this.props.results.errors.map((error, idx) => this.renderCategory(idx, error)) }

      </div>
    );
  }
}
