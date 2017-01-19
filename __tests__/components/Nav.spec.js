import React from 'react';
import renderer from 'react-test-renderer';

import Nav from 'components/nav/Nav';

describe('Nav component', () => {

  test('should render correctly by default', () => {
    expect(renderer.create(<Nav path='/some/path' />)).toMatchSnapshot();
  });

  test('should render correctly when logged in', () => {
    expect(renderer.create(<Nav loggedIn={true} path='/some/path' />)).toMatchSnapshot();
  });

  test('should render correctly when not logged in', () => {
    expect(renderer.create(<Nav loggedIn={false} path='/some/path' />)).toMatchSnapshot();
  });

  test('should render correctly with a dkim path', () => {
    expect(renderer.create(<Nav path='/dkim/path' />)).toMatchSnapshot();
  });

  test('should render correctly with an spf path', () => {
    expect(renderer.create(<Nav path='/spf/path' />)).toMatchSnapshot();
  });

});
