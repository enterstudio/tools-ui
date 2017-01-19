import React from 'react';
import renderer from 'react-test-renderer';

import { CopyPopover } from 'components/popover/Popover';

describe('CopyPopover component', () => {

  test('should render with no props', () => {
    expect(renderer.create(<CopyPopover>some text is here</CopyPopover>)).toMatchSnapshot();
  });

});
