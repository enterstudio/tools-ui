import React from 'react';
import renderer from 'react-test-renderer';

import ErrorMessage from 'components/errors/ErrorMessage';

describe('ErrorMessage component', () => {

  test('should render (null) with no props', () => {
    expect(renderer.create(<ErrorMessage />)).toMatchSnapshot();
  });

  test('should render correctly with an error object', () => {
    const error = new Error('my message');
    expect(renderer.create(<ErrorMessage error={error} />)).toMatchSnapshot();
  });

  test('should render correctly with an error message', () => {
    expect(renderer.create(<ErrorMessage error='some string message' />)).toMatchSnapshot();
  });

  test('should render correctly with a custom icon', () => {
    expect(renderer.create(<ErrorMessage error='some message' icon='some-icon' />)).toMatchSnapshot();
  });

});
