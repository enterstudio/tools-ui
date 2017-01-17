import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../src/components/App';

test('App renders correctly', () => {
  expect(renderer.create(<App>This is my app</App>)).toMatchSnapshot();
});
