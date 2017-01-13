import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import config from '../../config';

import Table from '../../components/Table';

export default class ResultListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      results: [],
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
          results,
          loading: false
        });
      }, ({ response }) => {
        this.setState({
          error: response.data.errors[0],
          loading: false
        });
      });
  }

  renderError() {
    const { error } = this.state;
    if (!error) {return null;}
    return (
      <div className='error'>
        <i className='fa fa-exclamation-circle'></i>
        {error.message}
      </div>
    );
  }

  renderHeader() {
    const { email } = this.props.params;
    return (
      <div>
        <p>
          <strong>Results for Test Address:</strong>
          <br/>{email}
        </p>
        <button onClick={() => this.getResults()}>Refresh</button>
        <button>Share</button>
      </div>
    );
  }

  renderTable() {
    const { loading, results } = this.state;
    if (loading) {return null;}

    if (results.length === 0) {
      return <p>No messages have been recieved to this test address.</p>;
    }

    const headers = ['Subject', 'DKIM Status', 'Sender', 'Time Delivered'];
    const rows = results.map(({ id, subject, result, header_from, received }) => (
      [
        <Link to={`/dkim/results/${this.props.params.email}/${id}`}>{subject}</Link>,
        result ? 'Passed' : 'Failed',
        header_from,
        new Date(received).toLocaleString()
      ]
    ));

    return <Table headers={headers} rows={rows} />;
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        {this.renderHeader()}
        {error ? this.renderError() : this.renderTable()}
      </div>
    );
  }
}
