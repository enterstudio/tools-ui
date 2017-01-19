import React from 'react';
import renderer from 'react-test-renderer';

import GenerateEmail from 'components/dkim/GenerateEmail';

describe('GenerateEmail component', () => {

  const generate = () => {};

  test('should render correctly with a generate function', () => {
    expect(renderer.create(<GenerateEmail generate={generate} />)).toMatchSnapshot();
  });

});
