import React from 'react';
import { LinkButton } from '../Button';

export default (props) => {
  const { email } = props;

  // TODO make email input copy-able with clipboard thing

  return (
    <div className='panel panel--accent text--left'>
      <div className='panel__body'>
        <h4>Validate your DKIM Signature</h4>
        <p className='paddingBottom--md'>Send an email to this generated email address, then view your results.</p>
        <div className='flex'>
          <div className='col-xs-8'>
            <input className='input__text input--full' type="text" readOnly={true} value={email} />
          </div>
          <div className='col-xs-4'>
            <LinkButton type='blue' fullWidth={true} to={`/dkim/results/${email}`}>View Results</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
