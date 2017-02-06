import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHistory } from 'actions/spf';
import ResultListRow from './components/ResultListRow';

export class HistoryList extends Component {

  componentDidMount() {
    this.props.getHistory();
  }

  renderResults() {
    const { list } = this.props;

    if (list.length === 0) {
      return (
        <div className='text--center'>
          <p className='text--regular text--muted'>Search for SPF records to start saving results!</p>
        </div>
      );
    }

    return list.map((row, i) => <ResultListRow key={i} {...row} />);
  }

  renderLoading() {
    return (
        <div className='text--center paddingTop--md'>
          <p className='text--regular text--muted'>Loading History...</p>
        </div>
    );
  }

  render() {
    const { loading } = this.props;
    return (
        <div className='text--left'>
          <h4 className='marginBottom--xs'>SPF History</h4>
          {loading ? this.renderLoading() : this.renderResults()}
        </div>
    );
  }
}

const mapStateToProps = ({ spfHistory }) => ({ ...spfHistory });

export default connect(mapStateToProps, { getHistory })(HistoryList);
