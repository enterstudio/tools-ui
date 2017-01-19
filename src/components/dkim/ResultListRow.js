import React from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';

import './ResultListRow.scss';

const ResultListRow = (props) => {
  const { id, subject, result, header_from, received, email } = props;

  return (
    <Link to={`/dkim/results/${email}/${id}`} className='dkimResultListRow'>
      <div className='panel marginBottom--none'>
        <div className='panel__body'>
          <div className={`dkimResultListRow__result ${result === 'Failed' && 'has-error'}`}>
            <Icon name={result === 'Passed' ? 'check-circle' : 'exclamation-circle'} />
          </div>
          <div className='dkimResultListRow__details'>
            <div className='dkimResultListRow__subject'>
              <span className='dkimResultListRow__label'>subject</span>
              {subject}
            </div>
            <div className='dkimResultListRow__from'>
              <span className='dkimResultListRow__label'>from</span>
              {header_from}
            </div>
            <div className='dkimResultListRow__received'>Delivered on {received} <Icon name='chevron-right' /></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ResultListRow.propTypes = {
  id: React.PropTypes.number.isRequired,
  subject: React.PropTypes.string.isRequired,
  result: React.PropTypes.string.isRequired,
  header_from: React.PropTypes.string.isRequired,
  received: React.PropTypes.string.isRequired
};

export default ResultListRow;
