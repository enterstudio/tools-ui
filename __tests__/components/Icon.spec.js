import React from 'react';
import renderer from 'react-test-renderer';

import Icon from '../../src/components/Icon';

describe('Icon', () => {

  it('should render correctly with all options', () => {
    expect(renderer.create(<Icon
      name='awesome-icon'
      size='lg'
      extras={['spin', 'big', 'super-special']}
    />)).toMatchSnapshot();
  });

  it('should render correctly with no options', () => {
    const someFunction = () => {};
    expect(renderer.create(<Icon />)).toMatchSnapshot();
  });

});
