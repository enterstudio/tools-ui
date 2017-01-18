import React from 'react';
import { CopyPopover } from 'components/popover/Popover';
import { ActionLink } from 'components/button/Button';
import Error from 'components/errors/ErrorMessage';

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
