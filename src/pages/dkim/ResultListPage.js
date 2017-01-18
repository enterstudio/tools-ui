import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import config from '../../config';

import Table from '../../components/Table';
import { ActionButton } from '../../components/Button';
import Icon from '../../components/Icon';

export default class ResultListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tableHeaders: ['Subject', 'DKIM Status', 'Sender', 'Time Delivered'],
      tableRows: [],
      loading: false // should this just be true at first?
    };
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    const { email } = this.props.params;
    this.setState({ loading: true });
    return axios.get(`${config.apiBase}/messaging-tools/validations/${email}`)
      .then(({ data }) => {
        const { results } = data;
        this.setState({
          tableRows: results.map(({ id, subject, result, header_from, received }) => (
            [
              <Link to={`/dkim/results/${this.props.params.email}/${id}`}>{subject}</Link>,
              result ? 'Passed' : 'Failed',
              header_from,
              new Date(received).toLocaleString()
            ]
          )),
          loading: false
        });
      }, ({ response: { data: { errors = [] }}}) => {
        this.setState({
          error: errors[0],
          loading: false
        });
      });
  }

  renderError() {
    const { error } = this.state;
    if (!error) { return null; }
    return (
      <div className='error'>
        <Icon name='exclamation-circle' />
        {error.message}
      </div>
    );
  }

  renderHeader() {
    const { email } = this.props.params;
    return (
      <div className='panel panel--accent'>
        <div className='panel__body'>
          <div className='float--right'>
            <ActionButton action={() => this.getResults()}>Refresh</ActionButton>
            <ActionButton>Share</ActionButton>
          </div>
          <p>Generated Test Address:</p>
          <h5>{email}</h5>
        </div>
      </div>
    );
  }

  render() {
    const { error, tableHeaders, tableRows } = this.state;
    return (
      <div className='flex center-xs'>
        <div className='col-xs-12 col-md-7'>
          {this.renderHeader()}
          {error && this.renderError()}

          <div className='panel'>
            <div className='panel__body'>
              <Table className='dkim-list-table' headers={tableHeaders} rows={tableRows} />
              {(tableRows.length === 0) && <p>No messages have been recieved to this test address.</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
