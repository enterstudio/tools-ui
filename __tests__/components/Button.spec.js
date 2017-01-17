import React from 'react';
import renderer from 'react-test-renderer';

import { ActionButton, LinkButton } from '../../src/components/Button';

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
});
