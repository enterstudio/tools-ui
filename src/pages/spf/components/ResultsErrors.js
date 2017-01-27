import React from 'react';
import { ActionLink } from 'components/button/Button';

export default (props) => {
  const { errors = [], warnings = [] } = props;

  const errorIcon = errors.length ? 'fa-exclamation-circle' : 'fa-check-circle';
  const warningIcon = warnings.length ? 'fa-exclamation-triangle' : 'fa-check-circle';

  const errorMessage = `${errors.length} Error${errors.length === 1 ? '' : 's'} Found`;
  const warningMessage = `${warnings.length} Warning${warnings.length === 1 ? '' : 's'} Found`;

  // TODO type colors

  return (
    <div className="panel">
      <div className='panel__heading'>
        <div className='float--right'><ActionLink>How do I fix errors?</ActionLink></div>
        <h5>
          <span><i className={ `fa ${errorIcon}` } /> { errorMessage } </span>
          {warnings.length > 0 && <span><i className={ `fa ${warningIcon}` } /> { warningMessage }</span>}
        </h5>
      </div>

      { errors.map((error, idx) => (
        <div key={`e-${idx}`} className="body__panel">
          <i className="fa fa-exclamation-circle"></i>
          <span>{error.message}</span>
        </div>
      )) }

      { errors.map((error, idx) => (
        <div key={`w-${idx}`} className="body__panel">
          <i className="fa fa-exclamation-triangle"></i>
          <span>{error.message}</span>
        </div>
      )) }
    </div>
  );
};
