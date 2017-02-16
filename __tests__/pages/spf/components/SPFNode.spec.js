import React from 'react';
import renderer from 'react-test-renderer';
import SPFNode from 'pages/spf/components/SPFNode';

describe('SPFNode Snapshots', () => {
  let type
    , value
    , record;

  beforeEach(() => {
    type = 'mx';
    value = '_spf.erlock.homes';
    record = 'sirMXaLot';
  })

  test('baseline snapshot', () => {
    const panel = <SPFNode type={ type } value={ value } record={ record }></SPFNode>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should display domain if passed', () => {
    const panel = <SPFNode domain={'domain.com'} type={ type } value={ value } record={ record }></SPFNode>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should not show record if missing', () => {
    const panel = <SPFNode type={ type } value={ value }></SPFNode>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

});
