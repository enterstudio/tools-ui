import React from 'react';
import Icon from '../../components/Icon';

// TODO Finish styling error
const Error = (props) => {
  const { error } = props;
  return (
    <div className='panel__body'>
      <Icon name='exclamation-circle' />
      {error.message}
    </div>
  );
};

const ResultListHeader = (props) => {
  const { email, getResults, error } = props;

  return (
    <div className='panel panel--accent'>
      <div className='panel__body'>
        <div className='float--right'>
          <a className='actionLink' onClick={getResults} title='Refresh Messages'>Refresh</a>
          <a className='actionLink' title='Share'>Share</a>
        </div>
        <p className='text--muted marginBottom--xs'>Generated Test Address</p>
        <h3>{email}</h3>
        {error && <Error error={error} />}
      </div>
    </div>
  );
};

export default ResultListHeader;
