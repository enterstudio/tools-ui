import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { INTRO_TEXT } from './constants';


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

  handleSubmit(e) {
    e.preventDefault();

    const validDomain = this.validateDomain(this.state.domain);
    this.setState({domainError: !validDomain});

    if (validDomain) {
      this.props.router.push(`/spf-inspector/results/${this.state.domain}`);
    }
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
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <div className="flex">

          <div className={classNames('col-xs-8', {'has-error': this.state.domainError })}>
            <input className='input__text input--full' type='text' onChange={(e) => this.setState({domain: e.target.value}) } placeholder='mydomain.com' />
            <div className="input__error">Please enter a valid domain.</div>
          </div>

          <div className='col-xs-4'>
            <button type='submit' className='button button--orange button--full'>View Results</button>
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
