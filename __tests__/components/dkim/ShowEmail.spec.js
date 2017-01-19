import React from 'react';
import renderer from 'react-test-renderer';

import ShowEmail from 'components/dkim/ShowEmail';

describe('ShowEmail component', () => {

  test('should render', () => {
    expect(renderer.create(<ShowEmail email='some@email.com' />)).toMatchSnapshot();
  });

});
