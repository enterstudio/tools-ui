import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import { SpLoginLink, SpSignUpLink } from 'components/button/Button';
import config from 'config/index';

import { Logo } from 'components/logo/Logo';

import './Nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: false,
      open: false
    };

    this.handleScroll = _.throttle(this.handleScroll.bind(this), 400);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    this.setState({
      sticky: e.srcElement.body.scrollTop !== 0
    });
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  renderLoggedOutLinks() {
    const { location } = this.props;
    return (
      <div className='nav__right'>
        <SpLoginLink location={location} classes='nav__link'>Login</SpLoginLink>
        <SpSignUpLink location={location} classes='button button--blue nav__button'>Sign Up</SpSignUpLink>
      </div>
    );
  }

  renderLoggedInLinks() {
    return (
      <div className='nav__right'>
        <a href='' className='nav__link'>Logout</a>
        <a href={`${config.appUrl}/dashboard`} className='button button--blue nav__button'>SparkPost Dashboard</a>
      </div>
    );
  }

  render() {
    const { loggedIn, location } = this.props;
    const { sticky, open } = this.state;
    const navClasses = classNames('nav', {
      'is-stickied': sticky,
      'is-open': open
    });

    const dkimLink = classNames('nav__link', { 'is-active': location.pathname.includes('/dkim')});
    const spfLink = classNames('nav__link', { 'is-active': location.pathname.includes('/spf/inspector')});

    return (
      <nav className={navClasses}>
        <div className='container'>

          {loggedIn ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}

          <a href='http://sparkpost.com' className='nav__logoLink' title='SparkPost'>
            <Logo/>
          </a>

          <a className='nav__hamburger' onClick={() => this.toggleMenu()}><span></span></a>

          <div className='nav__links'>
            <Link
              to='/dkim'
              title='DKIM Validator'
              className={dkimLink}>
              DKIM Validator
            </Link>
          </div>

          <Link
            to='/spf/inspector'
            title='SPF Inspector'
            className={spfLink}>
            SPF Inspector
          </Link>

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
  location: React.PropTypes.object
};

export default Nav;
