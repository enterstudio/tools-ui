import React, { Component } from 'react';
import { Link } from 'react-router';
import { Logo } from '../logo/Logo';

import './Nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', (event) => this.handleScroll(event));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', (event) => this.handleScroll(event));
  }

  handleScroll(event) {
    this.setState({
      sticky: event.srcElement.body.scrollTop !== 0
    });
  }

  renderLoggedOutLinks() {
    return (
      <div className='float--right'>
        <a href='http://app.sparkpost.com/auth' className='nav__link'>Login</a>
        <a href='http://app.sparkpost.com/sign-up' className='nav__button'>Sign Up</a>
      </div>
    );
  }

  renderLoggedInLinks() {
    return (
      <div className='float--right'>
        <a href='' className='nav__link'>Logout</a>
        <a href='http://app.sparkpost.com/dashboard' className='nav__button'>SparkPost Dashboard</a>
      </div>
    );
  }

  render() {
    const { loggedIn, path } = this.props;
    const { sticky } = this.state;

    return (
      <nav className={`nav ${sticky && 'nav--sticky'}`}>
        <div className='container'>
          <a href='http://sparkpost.com' className='nav__logoLink' title='SparkPost'>
            <Logo></Logo>
          </a>

          <Link
            to='/dkim'
            title='DKIM Validator'
            className={`nav__link ${path.includes('/dkim') && 'is-active'}`}>
            DKIM Validator
          </Link>

          <Link
            to='/'
            title='SPF Inspector'
            className={`nav__link ${path.includes('/spf') && 'is-active'}`}>
            SPF Inspector
          </Link>

          {loggedIn ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
        </div>
      </nav>
    );
  }
}

// I'm just preparing us for redux 😀
// Normally, default props would be set in redux's initial state
Nav.defaultProps = {
  loggedIn: false
};

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  path: React.PropTypes.string
};

export default Nav;
