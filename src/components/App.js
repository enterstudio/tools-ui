import React from 'react';
import Nav from './nav/Nav';
import Footer from './footer/Footer';

export default (props) => (
  <div className='pageWrapper'>
    <Nav path={props.location.pathname}></Nav>
    <div className='container paddingTop--xxl paddingBottom--xxl'>
      {props.children}
    </div>
    <Footer></Footer>
  </div>
);
