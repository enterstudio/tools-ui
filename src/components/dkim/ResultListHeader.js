import React, { Component } from 'react';
import { CopyPopover } from 'components/popover/Popover';
import { ActionLink } from 'components/button/Button';
import Error from 'components/errors/Error';

class ResultListHeader extends Component {
  render() {
    const { email, getResults, error, loggedIn } = this.props;

    return (
      <div className='panel panel--accent'>
        <div className='panel__body'>

          <div className='float--right'>
            {!loggedIn && <ActionLink to='/'>Save Results</ActionLink>}
            <CopyPopover>
              <ActionLink title='Share'>Share</ActionLink>
            </CopyPopover>
            <ActionLink onClick={getResults} title='Refresh Messages'>Refresh</ActionLink>
          </div>

          <p className='text--muted marginBottom--xs'>Generated Test Address</p>
          <h3>{email}</h3>

          <Error error={error} />
        </div>
      </div>
    );
  }
}

ResultListHeader.defaultProps = {
  loggedIn: false
};

ResultListHeader.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

export default ResultListHeader;
