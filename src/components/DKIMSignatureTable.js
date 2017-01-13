import React from 'react';

const Row = ({ sig }) => {
  const { s, d, t, result } = sig;
  return (
    <tr>
      <td>{result ? 'Passed' : 'Failed'}</td>
      <td>{s}</td>
      <td>{d}</td>
      <td>{t || 'N/A'}</td>
    </tr>
  );
};

export default ({ sigs = null }) => {
  if (!sigs) {return null;}

  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>DKIM Selector (s=)</th>
          <th>Signing Domain (d=)</th>
          <th>Timestamp (t=)</th>
        </tr>
      </thead>
      <tbody>
        {sigs.map((sig) => <Row sig={sig} key={sig.s} />)}
      </tbody>
    </table>
  );
};
