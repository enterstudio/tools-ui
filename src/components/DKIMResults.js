import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import config from '../config';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      results: [],
      loading: false // should this just be true at first?
    }
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    const { email } = this.props;
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
    if (!error) return null;
    return (
      <div className='error'>
        <i className='fa fa-exclamation-circle'></i>
        {error.message}
      </div>
    )
  }

  renderHeader() {
    const { email } = this.props;
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
    if (loading) return null;
    return (
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>DKIM Status</th>
            <th>Sender</th>
            <th>Time Delivered</th>
          </tr>
        </thead>
        <tbody>
        {
          (results.length === 0)
          ? this.renderNoMessages()
          : results.map(this.renderRow.bind(this))
        }
        </tbody>
      </table>
    );
  }

  renderNoMessages() {
    return (
      <tr className='no-messages'><td colSpan='4'>No messages have been recieved to this test address.</td></tr>
    );
  }

  renderRow({ id, subject, result, header_from, received }) {
    const { email } = this.props;
    return (
      <tr key={id}>
        <td><Link to={`/dkim/results/${email}/${id}`}>{subject}</Link></td>
        <td>{result ? 'Passed' : 'Failed'}</td>
        <td>{header_from}</td>
        <td>{new Date(received).toLocaleString()}</td>
      </tr>
    );
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        {this.renderHeader()}
        {error ? this.renderError() : this.renderTable()}
      </div>
    )
  }
}
