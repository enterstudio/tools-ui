import React from 'react';

export default (props) => {
  const { errors = [], warnings = [] } = props;

  const errorIcon = errors.length ? 'fa-exclamation-circle' : 'fa-check-circle';
  const warningIcon = warnings.length ? 'fa-exclamation-triangle' : 'fa-check-circle';

  const errorMessage = `${errors.length} Error${errors.length === 1 ? '' : 's'} Found.`;
  const warningMessage = `${warnings.length} Warning${warnings.length === 1 ? '' : 's'} Found.`;

  return (
    <div className="panel">
      <div className="panel__body">
        <div className="flex">
          <div className="col-xs-3">
            <span><i className={ `fa ${errorIcon}` }></i> { errorMessage }</span>
          </div>
          <div className="col-xs-3">
            <span><i className={ `fa ${warningIcon}` }></i> { warningMessage }</span>
          </div>
          <div className="col-xs-6 clearfix">
            <div className="float--right">How do I fix errors?</div>
          </div>
        </div>
        <div className="flex">
          <div className="col-xs-12">
            { errors.map((error, idx) => (
                <div key={ `e-${idx}`}>
                  <hr/>
                  <i className="fa fa-exclamation-circle"></i>
                  <span> {error.message}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex">
          <div className="col-xs-12">
            { warnings.map((warning, idx) => (
                <div key={ `w-${idx}`}>
                  <hr/>
                  <i className="fa fa-exclamation-triangle"></i>
                  <span> {warning.message}</span>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
