import React from 'react';
import DKIMResults from '../../components/DKIMResults';

export default (props) => {
  const { email } = props.params;
  return <DKIMResults email={email} />;
};
