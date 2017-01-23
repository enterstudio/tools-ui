/* eslint-disable no-console */

import React, { Component } from 'react';
import classNames from 'classnames';
import { INTRO_TEXT } from './constants';
import { ActionButton } from 'components/button/Button';


export default class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
      domainError: false
    };
  }

  validateDomain() {
    return this.state.domain && this.state.domain.test(/^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/);
  }

  goToDomainResults(domain) {
    this.setState({domainError: this.validateDomain(domain)});

    if (!this.state.domainError) {
      // go to `/spf/results/${this.state.domain}`
    }
  }


  renderPanel() {
    return (
      <div className='panel panel--accent text--left'>
        <div className='panel__body'>
          <h4>Inspect a Domain</h4>
          <p className='paddingBottom--md text--muted'>Enter a domain to inspect, e.g., sparkpost.com.</p>
          <form>
            <div className="flex h-hide">
              <div className='col-xs-12'>
                {/* i want this easter egg, but it's served over http, so might cause some mixed content warnings */}
                <img alt='spferlock holmes' title='Spferlock Holmes' src='http://cliparts.co/cliparts/5TR/Kj5/5TRKj55qc.jpg'/>
              </div>
            </div>

            <div className="flex">
              <div className={classNames('col-xs-8', {'has-error': this.state.domainError })}>
                <input className='input__text input--full' type='text' onChange={(e) => this.setState({domain: e.target.value}) } placeholder='mydomain.com' />
                <span className="input__error">Please</span>
              </div>

              <div className='col-xs-4'>
                <ActionButton type='orange' fullWidth={true} action={this.goToDomainResults()}>View Results</ActionButton>
              </div>
            </div>
          </form>
        </div>
      </div>
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
