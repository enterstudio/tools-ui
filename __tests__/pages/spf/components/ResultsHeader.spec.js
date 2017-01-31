import React from 'react';
import renderer from 'react-test-renderer';
import ResultsHeader from 'pages/spf/components/ResultsHeader';

describe('ResultsHeader Snapshots', () => {
  let results
    , domain
    , refresh;

  beforeEach(() => {
    results = {
      timestamp: 'now',
      authorized_netblocks: 64,
      dns_lookups: 9
    };

    domain = 'itchyandscratchy.com';

    refresh = () => {}
  })

  test('baseline snapshot', () => {
    const panel = <ResultsHeader results={ results } domain={ domain } refresh={ refresh }></ResultsHeader>;
    expect(renderer.create(panel)).toMatchSnapshot();
  });

});
