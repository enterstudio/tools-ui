/* eslint-disable no-console */

import React, { Component } from 'react';
import { INTRO_TEXT } from './constants';
import { LinkButton } from 'components/button/Button';


export default class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: ''
    };
  }

  renderPanel() {
    return (
      <div className='panel panel--accent text--left'>
        <div className='panel__body'>
          <h4>Inspect a Domain</h4>
          <p className='paddingBottom--md text--muted'>Enter a domain to inspect, e.g., sparkpost.com.</p>
          <div className='flex'>

            <div className='col-xs-12 h-hide'>
              {/* i want this easter egg, but it's served over http, so might cause some mixed content warnings */}
              <img alt='spferlock holmes' title='Spferlock Holmes' src='http://cliparts.co/cliparts/5TR/Kj5/5TRKj55qc.jpg'/>
            </div>

            <div className='col-xs-8'>
              <input className='input__text input--full' type='text' onChange={(e) => this.setState({domain: e.target.value}) } placeholder='mydomain.com' />
            </div>

            <div className='col-xs-4'>
              <LinkButton type='orange' fullWidth={true} to={`/spf/results/${this.state.domain}`}>View Results</LinkButton>
            </div>
          </div>
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
