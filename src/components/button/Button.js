import React from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';
import classNames from 'classnames';
const noop = () => {};

import './Button.scss';

const mapPropsToClasses = ({ type, size, accent, fullWidth, icon, states, extraClasses }) => (
  classNames('button', {
    [`button--${type}`]: type,
    [`button--${size}`]: size,
    [`button--${accent}Accent`]: accent,
    'button--full': fullWidth,
    'button--icon': icon
  }, states, extraClasses)
);

const ActionButton = (props) => {
  const { action = noop, children } = props;
  const classes = mapPropsToClasses(props);

  return (
    <button onClick={action} className={classes}>
      {children}
    </button>
  );
};

const LinkButton = (props) => {
  const { to = null, children } = props;
  const classes = mapPropsToClasses(props);

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
};

/**
 * Produces an orange link
 * Can be used to link or execute an action
 */
const ActionLink = (props) => {
  const { to = null, onClick = null, title = '', children } = props;

  return (
    <Link to={to} onClick={onClick} className='actionLink' title={title}>
      {children}
    </Link>
  );
};

/**
 * Produces a blue link to indicate browser back
 */
const BackLink = (props) => {
  const { to = null, title = '' } = props;

  return (
    <Link to={to} className='backLink' title={title}><Icon name='chevron-left' /> Back</Link>
  );
};

export { ActionButton, LinkButton, ActionLink, BackLink };
