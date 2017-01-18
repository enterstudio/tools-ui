import React from 'react';
import { Logo } from '../logo/Logo';
import { FOOTER } from '../../constants/text';

import './Footer.scss';

const Footer = (props) => {
  const { cta, links } = FOOTER;

  return (
    <div className='footer'>
      <div className='container'>

        <div className='flex paddingTop--xxl paddingBottom--xxl'>
          <div className='col-xs-12 col-md-8'>
            <h1>{cta.header}</h1>
            <p className='marginBottom--lg'>{cta.text}</p>
            <a href='http://app.sparkpost.com' title='SparkPost' className='button button--l button--blue'>{cta.button}</a>
          </div>
        </div>

        <nav className='footer__nav'>
          <a href='http://sparkpost.com' className='footer__logoLink' title='SparkPost'>
            <Logo type='white'></Logo>
          </a>
          <div className='float--right'>
            {links.map(({ url, label }, key) => <a href={url} title={label} key={key} className='footer__link'>{label}</a>)}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
