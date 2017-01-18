import React from 'react';

import Icon from '../Icon';
import { CopyPopover } from '../popover/Popover';
import { ActionLink } from '../button/Button';

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
  const { email, getResults, error, loggedIn } = props;

  return (
    <div className='panel panel--accent'>
      <div className='panel__body'>

        <div className='float--right'>
          {!loggedIn && <ActionLink to='/'>Save Results</ActionLink>}
          <CopyPopover>
            <a className='actionLink' title='Share'>Share</a>
          </CopyPopover>
          <ActionLink onClick={getResults} title='Refresh Messages'>Refresh</ActionLink>
        </div>

        <p className='text--muted marginBottom--xs'>Generated Test Address</p>
        <h3>{email}</h3>

        {error && <Error error={error} />}
      </div>
    </div>
  );
};

ResultListHeader.defaultProps = {
  loggedIn: false
};

ResultListHeader.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

export default ResultListHeader;
