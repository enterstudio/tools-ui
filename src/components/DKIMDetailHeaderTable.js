import React from 'react';

export default ({ detail }) => {
  if (!detail) {return null;}
  return (
    <table>
      <tbody>
        <tr>
          <th>Subject</th>
          <td>{detail.subject}</td>
        </tr>
        <tr>
          <th>Sender</th>
          <td>{detail.header_from}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{new Date(detail.received).toLocaleString()}</td>
        </tr>
        <tr>
          <th>DKIM Status</th>
          <td>{detail.result ? 'Passed' : 'Failed'}</td>
        </tr>
      </tbody>
    </table>
  );
};
