import React from 'react';
import { LinkButton } from 'components/button/Button';
import Icon from 'components/Icon';

export default (props) => {
  const { domain, timestamp, status } = props;

  const renderStatus = (status) => {
    let iconCls = '';
    switch (status) {
      case 'valid':
        iconCls = 'check';
        break;
      case 'warning':
        iconCls = 'exclamation';
        break;
      case 'error':
        iconCls = 'exclamation-triangle';
        break;
    }
    return (<Icon name={iconCls} />);
  };

  return (
    <div className="panel spf-historyRow">
      <div className="panel__body">
        <div className="flex middle-xs">
          <div className="col-xs-2">
            {renderStatus(status)}
          </div>
          <div className="col-xs-10 col-md-8 col-lg-8">
            <h4>{domain}</h4>
            <p className="paddingBottom--sm text--muted">
              Inspected on {timestamp}
            </p>
          </div>
          <div className="col-xs-12 col-md-2 col-lg-2">
            <LinkButton type='orange' to={`/spf/results/${domain}`}>View</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
