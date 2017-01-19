import React from 'react';
import renderer from 'react-test-renderer';

import ResultListRow from 'components/dkim/ResultListRow';

describe('ResultListRow component', () => {

  const testDate = new Date('2017-01-01T00:00Z').toString();

  test('should render', () => {
    expect(renderer.create(<ResultListRow id={5} subject='subject' result={true} header_from='some@email.com' received={testDate} email='some@email.com' />)).toMatchSnapshot();
  });

});
