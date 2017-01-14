import React from 'react';
import { Link } from 'react-router';
const noop = () => {};

const mapPropsToClasses = ({
  type = null,        // blue, muted
  size = null,        // s, m, l
  fullWidth = false,
  states = [],        // is-pressed, is-disabled
  icon = false,
  accent = null,      // blue, magenta, teal, green
  extraClasses = []
}) => {
  let classes = ['button'];

  type && classes.push(`button--${type}`);
  size && classes.push(`button--${size}`);
  fullWidth && classes.push('button--full');
  icon && classes.push('button--icon');
  accent && classes.push(`button--${accent}Accent`);

  classes = classes.concat(states).concat(extraClasses);

  return classes;
};

const ActionButton = (props) => {
  const { action = noop, children } = props;
  const classes = mapPropsToClasses(props);

  return (
    <button onClick={action} className={classes.join(' ')}>
      {children}
    </button>
  );
};

const LinkButton = (props) => {
  const { to = null, children } = props;
  const classes = mapPropsToClasses(props);

  return (
    <Link to={to} className={classes.join(' ')}>
      {children}
    </Link>
  );
};

export { ActionButton, LinkButton };
