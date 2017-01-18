import React, { Component } from 'react';
import { Link } from 'react-router';
import Icon from '../Icon';

import './MessageRow.scss';

class MessageRow extends Component {
  render() {
    const { id, subject, result, header_from, received, email } = this.props;
    return (
      <Link to={`/dkim/results/${email}/${id}`} className='messageRow'>
        <div className='panel marginBottom--none'>
          <div className='panel__body'>
            <div className={`messageRow__result ${result === 'Failed' && 'has-error'}`}>
              <Icon name={result === 'Passed' ? 'check-circle' : 'exclamation-circle'} />
            </div>
            <div className='messageRow__details'>
              <div className='messageRow__subject'>
                <span className='messageRow__label'>subject</span>
                {subject}
              </div>
              <div className='messageRow__from'><span className='messageRow__label'>from</span>
                {header_from}
              </div>
              <div className='messageRow__received'>Delivered on {received} <Icon name='chevron-right' /></div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

MessageRow.propTypes = {
  id: React.PropTypes.number.isRequired,
  subject: React.PropTypes.string.isRequired,
  result: React.PropTypes.string.isRequired,
  header_from: React.PropTypes.string.isRequired,
  received: React.PropTypes.string.isRequired
};

export default MessageRow;
