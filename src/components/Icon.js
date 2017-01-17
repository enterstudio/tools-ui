import React from 'react';
import classNames from 'classnames';

const iconPrefix = 'fa-';

const mapPropsToClasses = ({ name, size, extras = [] }) => (
  classNames('fa', {
    [`${iconPrefix}${name}`]: name,
    [`${iconPrefix}${size}`]: size
  }, extras.map((extra) => `${iconPrefix}${extra}`))
);

export default (props) => <i className={mapPropsToClasses(props)} />;
