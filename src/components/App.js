import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from 'components/nav/Nav';
import Footer from 'components/footer/Footer';
import { checkLogin } from 'actions/auth';

export class App extends Component {

  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    const { children, location } = this.props;
    return (
      <div className='pageWrapper'>
        <div className='container container--tool'>
          {children}
        </div>
        <Footer></Footer>
        <Nav location={location}></Nav>
      </div>
    );
  }

}

export default connect(null, { checkLogin })(App);
