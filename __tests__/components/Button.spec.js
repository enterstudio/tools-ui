import React from 'react';
import renderer from 'react-test-renderer';

import { ActionButton, LinkButton, ActionLink, BackLink, SpLoginLink, SpSignUpLink } from 'components/button/Button';

describe('snapshot tests', () => {
  test('ActionButton will render correctly with all options', () => {
    const someFunction = () => {};
    expect(renderer.create(<ActionButton
      action={someFunction}
      type='muted'
      size='l'
      fullWidth
      icon
      accent='magenta'
      states={['is-disabled', 'is-awesome']}
      extraClasses={['has-error', 'best-button-ever']}
    >This is an action button</ActionButton>)).toMatchSnapshot();
  });

  test('ActionButton will render correctly with no options', () => {
    const someFunction = () => {};
    expect(renderer.create(<ActionButton>ACTION</ActionButton>)).toMatchSnapshot();
  });

  test('LinkButton will render correctly with all options', () => {
    expect(renderer.create(<LinkButton
      to='some url'
      type='muted'
      size='l'
      fullWidth
      icon
      accent='magenta'
      states={['is-disabled', 'is-awesome']}
      extraClasses={['has-error', 'best-button-ever']}
    >This is a link button</LinkButton>)).toMatchSnapshot();
  });

  test('LinkButton will render correctly with no options', () => {
    expect(renderer.create(<LinkButton>LINK</LinkButton>)).toMatchSnapshot();
  });

  test('ActionLink will render correctly with all options', () => {
    expect(renderer.create(<ActionLink
      to='some/route'
      onClick={() => 'something'}
      title='a title'
    >Action link text</ActionLink>)).toMatchSnapshot();
  });

  test('ActionLink will render correctly with no options', () => {
    expect(renderer.create(<ActionLink />)).toMatchSnapshot();
  });

  test('BackLink will render correctly with all options', () => {
    expect(renderer.create(<BackLink
      to='some/route'
      title='a title'
    >Back link text</BackLink>)).toMatchSnapshot();

  });

  test('BackLink will render correctly with no options', () => {
    expect(renderer.create(<BackLink />)).toMatchSnapshot();
  });

  test('SpLoginLink will render correctly with all options', () => {
    expect(renderer.create(<SpLoginLink
      location={{ pathname: '/some/path', search: '?some=search'}}
      classes='a-list of-classes'
    >Log In</SpLoginLink>)).toMatchSnapshot();
  });

  test('SpLoginLink will render correctly with no options', () => {
    expect(renderer.create(<SpLoginLink />)).toMatchSnapshot();
  });

  test('SpSignUpLink will render correctly with all options', () => {
    expect(renderer.create(<SpSignUpLink
      location={{ pathname: '/some/path', search: '?some=search'}}
      classes='a-list of-classes'
    >Sign Up</SpSignUpLink>)).toMatchSnapshot();
  });

  test('SpSignUpLink will render correctly with no options', () => {
    expect(renderer.create(<SpSignUpLink />)).toMatchSnapshot();
  });

});
