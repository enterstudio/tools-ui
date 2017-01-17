import React, { Component } from 'react';
import { Link } from 'react-router';

import { Logo } from '../logo/Logo';
import './Nav.scss';

class Nav extends Component {

  renderLoggedOutLinks() {
    return (
      <div className='float--right'>
        <a href='http://sparkpost.com/auth' className='nav__link'>Login</a>
        <a href='http://sparkpost.com/sign-up' className='nav__button'>Sign Up for SparkPost</a>
      </div>
    );
  }

  renderLoggedInLinks() {
    return (
      <div className='float--right'>
        <a href='' className='nav__link'>Logout</a>
        <a href='http://sparkpost.com/dashboard' className='nav__button'>SparkPost Dashboard</a>
      </div>
    );
  }

  render() {
    const { loggedIn, path } = this.props;

    return (
      <nav className='nav'>
        <div className='container'>
          <a href='http://sparkpost.com' title='SparkPost'>
            <Logo></Logo>
          </a>

          <Link
            to='/dkim'
            title='DKIM Validator'
            className={`nav__link ${path.includes('dkim') ? 'is-active' : ''}`}>
            DKIM Validator
          </Link>

          <Link
            to='/'
            title='SPF Inspector'
            className={`nav__link ${path.includes('spf') ? 'is-active' : ''}`}>
            SPF Inspector
          </Link>

          {loggedIn ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
        </div>
      </nav>
    );
  }
}

// I'm just preparing us for redux 😀
Nav.defaultProps = {
  loggedIn: false
};

Nav.propTypes = {
  loggedIn: React.PropTypes.bool,
  path: React.PropTypes.string
};

export default Nav;
