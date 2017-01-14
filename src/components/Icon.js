import React from 'react';

const iconPrefix = 'fa-';
const mapPropsToClasses = ({ name, size = null, extras = [] }) => {
  const classes = ['fa', `${iconPrefix}${name}`];
  size && classes.push(`${iconPrefix}${size}`);
  return classes.concat(extras.map((extra) => `${iconPrefix}${extra}`));
};

const Icon = (props) => {
  const classes = mapPropsToClasses(props);
  return <i className={classes.join(' ')} />;
};

export default Icon;
