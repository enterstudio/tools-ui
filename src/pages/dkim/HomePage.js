import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import config from '../../config';
import { DKIM_INTRO_TEXT, DKIM_COOKIE_NAME } from '../../constants/text';
import { ActionButton } from '../../components/button/Button';
import ShowEmail from '../../components/dkim/ShowEmail';
import GenerateEmail from '../../components/dkim/GenerateEmail';

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
          {email ? <ShowEmail email={email} /> : <GenerateEmail generate={() => this.generate()} />}
          {process.env.NODE_ENV === 'development' && this.renderDeleteCookie()}
        </div>
      </div>
    );
  }
}
