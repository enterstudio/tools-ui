import React from 'react';
import renderer from 'react-test-renderer';
import ChildRecordPanel from 'pages/spf/components/ChildRecordPanel';

describe('ChildRecordPanel Snapshots', () => {
  let type
    , value
    , record
    , collapsed
    , childrenCollapsed;

  beforeEach(() => {
    type = 'include';
    value = '_spf.erlock.homes';
    record = 'mx';
    collapsed = false;
    childrenCollapsed = true;
  })

  test('baseline snapshot', () => {
    const panel = <ChildRecordPanel type={ type } value={ value } record={ record } collapsed={ false } childrenCollapsed={ true }></ChildRecordPanel>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should not show record if missing', () => {
    const panel = <ChildRecordPanel type={ type } value={ value }  collapsed={ false } childrenCollapsed={ true }></ChildRecordPanel>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should be hidden if collapsed is true', () => {
    const panel = <ChildRecordPanel type={ type } value={ value } record={ record } collapsed={ true } childrenCollapsed={ true }></ChildRecordPanel>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

  test('should change toggle icon if childrenCollapsed is false', () => {
    const panel = <ChildRecordPanel type={ type } value={ value } record={ record } collapsed={ false } childrenCollapsed={ false }></ChildRecordPanel>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });
});
