import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'js-cookie';
import config from '../../config';
import { DKIM_INTRO_TEXT, DKIM_COOKIE_NAME } from '../../constants/text';

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
    const buttonClasses = ['button', 'button--muted'];
    const { error } = this.state;
    if (error) {buttonClasses.push('has-error');}
    return (
      <div>
        <h6>To get started, click on the button below to generate an email address.</h6>
        <button className={buttonClasses.join(' ')} onClick={() => this.generate()}>Generate Email Address</button>
      </div>
    );
  }

  renderShowEmail() {
    return (
      <div>
        <h6>Use your email client to send test emails to this generated test address.</h6>
        <div><input className='input__text' type="text" readOnly={true} value={this.state.email} /></div>
        <Link className="button button--blue" to={`/dkim/results/${this.state.email}`}>View Results</Link>
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
        <br/><br/><br/>
        <button onClick={() => this.deleteCookie()}>Delete my email cookie and start over</button>
      </div>
    );
  }

  render() {
    const { email } = this.state;
    return (
      <div className="email-generator">
        <p>{DKIM_INTRO_TEXT}</p>
        {email ? this.renderShowEmail() : this.renderGenerateEmail()}
        {process.env.NODE_ENV === 'development' && this.renderDeleteCookie()}
      </div>
    );
  }
}
