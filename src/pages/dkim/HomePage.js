import React, { Component } from 'react';
import { INTRO_TEXT } from './constants';
import { ActionButton } from 'components/button/Button';
import ShowEmail from './components/ShowEmail';
import GenerateEmail from './components/GenerateEmail';
import { getValidatorEmail, deleteSavedValidatorEmail, checkSavedValidatorEmail } from 'actions/dkim';
import { connect } from 'react-redux';

class HomePage extends Component {
  componentDidMount() {
    return this.props.checkSavedValidatorEmail();
  }

  renderDeleteCookie() {
    return (
      <div className='for-testing-only-DUH'>
        <br/><br/>
        <ActionButton type='red' size='s' action={() => this.props.deleteSavedValidatorEmail()}>Delete my email cookie and start over</ActionButton>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className='panel panel--accent'>
        <div className='panel__body text--center'>
          <p className='text--regular text--muted paddingTop--xl paddingBottom--xl'>Generating Email Address...</p>
        </div>
      </div>
    );
  }

  renderGenerateOrEmail() {
    const { email, error } = this.props;

    return email ? <ShowEmail email={email} /> : <GenerateEmail generate={() => this.props.getValidatorEmail()} error={error} />;
  }

  render() {
    const { loading } = this.props;
    return (
      <div className='flex center-xs'>
        <div className='col-xs-12 col-md-10 col-lg-8'>
          <h1>DKIM Validator</h1>
          <p className='marginBottom--lg'>{INTRO_TEXT}</p>
          {loading ? this.renderLoading() : this.renderGenerateOrEmail()}
          {process.env.NODE_ENV === 'development' && this.renderDeleteCookie()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dkim }) => ({ ...dkim.generateEmail });

export default connect(mapStateToProps, {
  getValidatorEmail,
  deleteSavedValidatorEmail,
  checkSavedValidatorEmail
})(HomePage);

