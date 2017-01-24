/* eslint-disable no-console */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { INTRO_TEXT } from './constants';
import { LinkButton } from 'components/button/Button';


class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
      domainError: false
    };
  }

  validateDomain() {
    // does this sorta kinda look like a domain
    return this.state.domain && this.state.domain.indexOf('.') > 0;
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      const validDomain = this.validateDomain(this.state.domain);
      this.setState({domainError: !validDomain});
      return validDomain;
    });
  }

  renderPanel() {
    return (
      <div className='panel panel--accent text--left'>
        <div className='panel__body'>
          <h4>Inspect a Domain</h4>
          <p className='paddingBottom--md text--muted'>Enter a domain to inspect, e.g., sparkpost.com.</p>
          { this.renderForm() }
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <form>
        <div className="flex">

          <div className={classNames('col-xs-8', {'has-error': this.state.domainError })}>
            <input className='input__text input--full' type='text' onChange={(e) => this.setState({domain: e.target.value}) } placeholder='mydomain.com' />
            <span className="input__error">Please enter a valid domain.</span>
          </div>

          <div className='col-xs-4'>
            <LinkButton type='orange' fullWidth={true} to={ `/spf/results/${this.state.domain}` }>View Results</LinkButton>
          </div>

        </div>
      </form>
    );
  }

  render() {
    return (
      <div className='flex center-xs'>
        <div className='col-xs-12 col-md-10 col-lg-7'>
          <h1>SPF Inspector</h1>
          <p className='marginBottom--lg text--muted'>{INTRO_TEXT}</p>
          { this.renderPanel() }
        </div>
      </div>
    );
  }
}

export default withRouter(Query);
