import React from 'react';
import renderer from 'react-test-renderer';
import SPFNode from 'pages/spf/components/SPFNode';

describe('SPFNode Snapshots', () => {
  let displayType
    , value
    , record;

  beforeEach(() => {
    displayType = 'mx';
    value = '_spf.erlock.homes';
    record = 'sirMXaLot';
  })

  test('baseline snapshot', () => {
    const panel = <SPFNode displayType={ displayType } value={ value } record={ record }></SPFNode>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should display domain if passed', () => {
    const panel = <SPFNode domain={'domain.com'} displayType={ displayType } value={ value } record={ record }></SPFNode>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should not show record if missing', () => {
    const panel = <SPFNode displayType={ displayType } value={ value }></SPFNode>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

});
