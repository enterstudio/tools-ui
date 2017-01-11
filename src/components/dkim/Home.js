import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'js-cookie';

const cookieName = '_dkimTestEmail';
const introText = 'Verifying DKIM is one step that can help your email get to the inbox. Not only is it an industry standard, but when configured correctly it demonstrates to ISPs that – unlike spammers – you are accountable for your email. Check DKIM, quickly with this simple DKIM Validator tool.';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: cookie.get(cookieName) || null,
      loading: false
    };
  }

  generate() {
    this.setState({ loading: true });
    axios.post('http://api.sparkpost.dev/api/v1/messaging-tools/validator-emails')
      .then(({ data }) => {
        const { email } = data.results;
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        cookie.set(cookieName, email, { expires });
        this.setState({
          email: data.results.email,
          loading: false
        });
      });
  }

  renderGenerateEmail() {
    return (
      <div>
        <h6>To get started, click on the button below to generate an email address.</h6>
        <button onClick={() => this.generate()}>Generate Email Address</button>
      </div>
    );
  }

  renderShowEmail() {
    return (
      <div>
        <h6>Use your email client to send test emails to this generated test address.</h6>
        <div><input type="text" readOnly={true} value={this.state.email} /></div>
        <Link to={`/dkim/results/${this.state.email}`}>View Results</Link>
      </div>
    );
  }

  deleteCookie() {
    cookie.remove(cookieName);
    this.setState({ email: null });
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <p>{introText}</p>
        {email ? this.renderShowEmail() : this.renderGenerateEmail()}
        <div className={'for-testing-only-DUH'}>
          <br/><br/><br/>
          <button onClick={() => this.deleteCookie()}>Delete my email cookie and start over</button>
        </div>
      </div>
    );
  }
}
