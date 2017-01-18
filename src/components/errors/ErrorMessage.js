import React from 'react';
import Icon from 'components/Icon';

export default (props) => {
  const { error, icon = 'exclamation-circle' } = props;
  if (!error) { return null; }
  return (
    <div className='error'>
      {icon && <Icon name={icon} />}
      {error.message}
    </div>
  );
};
