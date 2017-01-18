import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../src/components/App';

const mockLocation = {
  pathname: 'some/path'
}

test('App renders correctly', () => {
  expect(renderer.create(<App location={mockLocation}>This is my app</App>)).toMatchSnapshot();
});
