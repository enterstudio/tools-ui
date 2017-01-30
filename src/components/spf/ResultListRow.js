import React, { Component } from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';

class ResultListRow extends Component {
  render() {
    const { domain, timestamp } = this.props;

    return (
      <div>
        <div>
          {this.renderStatus()}
        </div>
        <div>
          {domain}
          <span>Inspected on {timestamp}</span>
        </div>
        <div>
          <Link to={`/spf/results/${domain}`}>
            Refresh
          </Link>
        </div>
      </div>
  );
  }

  renderStatus() {
    const { status } = this.props;
    let iconCls = '';
    switch (status) {
      case 'valid':
        iconCls = 'check-status';
        break;
      case 'warning':
        iconCls = 'warning';
        break;
      case 'error':
        iconCls = 'exclamation-circle';
        break;
    }
    return (<Icon name={iconCls} />);
  }
}

ResultListRow.propTypes = {
  domain: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.string.isRequired
};

export default ResultListRow;
