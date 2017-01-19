import React from 'react';
import Icon from 'components/Icon';
import _ from 'lodash';

export default ({ error = {}, message = false, icon = 'exclamation-circle' }) => {
  const errorMessage = _.get(error, 'message', message);
  if (!errorMessage) { return null; }
  return (
    <div className='error'>
      {icon && <Icon name={icon} />}
      {errorMessage}
    </div>
  );
};
