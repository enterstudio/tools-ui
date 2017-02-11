import React from 'react';
import ErrorMessage from './ErrorMessage';

export default ({ friendly, error }) => {
  const { message: errMessage, response } = error;
  const { message: apiMessage } = response.data.errors[0];
  const details = `${errMessage} (${apiMessage})`;

  return <ErrorMessage friendly={friendly} details={details} />;
};
