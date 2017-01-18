import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import config from '../../config';
import { DKIM_INTRO_TEXT, DKIM_COOKIE_NAME } from '../../constants/text';
import { ActionButton, LinkButton } from '../../components/Button';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: cookie.get(DKIM_COOKIE_NAME) || null,
      loading: false
    };
  }

  setDkimCookie(email) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    cookie.set(DKIM_COOKIE_NAME, email, { expires });
  }

  generate() {
    this.setState({ loading: true, error: null });
    axios.post(`${config.apiBase}/messaging-tools/validator-emails`)
      .then(({ data }) => {
        const { email } = data.results;
        this.setDkimCookie(email);
        this.setState({
          email: data.results.email,
          loading: false
        });
      }, () => {
        this.setState({ error: true });
      });
  }

  renderGenerateEmail() {
    const extraClasses = [];
    const { error } = this.state;
    if (error) { extraClasses.push('has-error'); }

    return (
      <div className='panel panel--accent'>
        <div className='panel__body paddingTop--xl paddingBottom--xl text--center'>
          <h4>To get started, click on the button below to generate an email address.</h4>
          <ActionButton type='blue' action={() => this.generate()} extraClasses={extraClasses}>Generate Email Address</ActionButton>
        </div>
      </div>
    );
  }

  renderShowEmail() {
    return (
      <div className='panel panel--accent text--left'>
        <div className='panel__body'>
          <h4>Validate your DKIM Signature</h4>
          <p className='paddingBottom--md'>Send an email to this generated email address, then view your results.</p>
          <div className='flex'>
            <div className='col-xs-8'>
              <input className='input__text input--full' type="text" readOnly={true} value={this.state.email} />
            </div>
            <div className='col-xs-4'>
              <LinkButton type='blue' fullWidth={true} to={`/dkim/results/${this.state.email}`}>View Results</LinkButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  deleteCookie() {
    cookie.remove(DKIM_COOKIE_NAME);
    this.setState({ email: null });
  }

  renderDeleteCookie() {
    return (
      <div className={'for-testing-only-DUH'}>
        <br/><br/>
        <ActionButton type='red' size='s' action={() => this.deleteCookie()}>Delete my email cookie and start over</ActionButton>
      </div>
    );
  }

  render() {
    const { email } = this.state;
    return (
      <div className='flex center-xs'>
        <div className='col-xs-12 col-md-7'>
          <h1>DKIM Validator</h1>
          <p className='marginBottom--lg'>{DKIM_INTRO_TEXT}</p>
          {email ? this.renderShowEmail() : this.renderGenerateEmail()}
          {process.env.NODE_ENV === 'development' && this.renderDeleteCookie()}
        </div>
      </div>
    );
  }
}
