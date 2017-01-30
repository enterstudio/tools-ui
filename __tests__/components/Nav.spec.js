import React from 'react';
import renderer from 'react-test-renderer';

import Nav from 'components/nav/Nav';

describe('Nav component', () => {

  let location;

  beforeEach(() => {
    location = {
      pathname: '/some/path',
      search: '?maybe=something'
    };
  });

  test('should render correctly by default', () => {
    expect(renderer.create(<Nav location={location} />)).toMatchSnapshot();
  });

  test('should render correctly when logged in', () => {
    expect(renderer.create(<Nav loggedIn={true} location={location} />)).toMatchSnapshot();
  });

  test('should render correctly when not logged in', () => {
    expect(renderer.create(<Nav loggedIn={false} location={location} />)).toMatchSnapshot();
  });

  test('should render correctly with a dkim path', () => {
    location = { ...location, pathname: '/dkim/path' };
    expect(renderer.create(<Nav location={location} />)).toMatchSnapshot();
  });

  test('should render correctly with an spf path', () => {
    location = { ...location, pathname: '/spf/path' };
    expect(renderer.create(<Nav location={location} />)).toMatchSnapshot();
  });

});
