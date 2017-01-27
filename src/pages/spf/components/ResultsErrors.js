import React from 'react';

export default (props) => {
  const { errors = [] } = props.results;

  const errorMessage = `${errors.length} Error${errors.length === 1 ? '' : 's'} Found.`;

  return (
    <div className="panel">
      <div className="panel__body">
        <div className="flex">
          <div className="col-xs-12">
            {/*TODO warnings*/}
            <span>{ errorMessage }</span>
            <ul>
              { errors.map((error, idx) => <li key={ idx }>{error.message}</li>) }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
