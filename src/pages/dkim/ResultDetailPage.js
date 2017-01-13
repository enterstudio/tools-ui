import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import config from '../../config';

import Table, { VerticalTable } from '../../components/Table';

export default class ResultDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      detail: null,
      loading: false // should this just be true at first?
    };
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail() {
    const { email, detailId } = this.props.params;
    this.setState({ loading: true });
    return axios.get(`${config.apiBase}/messaging-tools/validations/${email}/${detailId}`)
      .then(({ data }) => {
        const { results } = data;
        this.setState({
          detail: results,
          loading: false
        });
      }, ({ response = null }) => {
        this.setState({
          error: response ? response.data.errors[0] : true,
          loading: false
        });
      });
  }

  renderHeaderTable() {
    const { detail } = this.state;
    if (!detail) { return null; }
    const rows = [
      ['Subject', detail.subject],
      ['Sender', detail.header_from],
      ['Date', new Date(detail.received).toLocaleString()],
      ['DKIM Status', detail.result ? 'Passed' : 'Failed']
    ];
    return <VerticalTable rows={rows} />;
  }

  renderSignatureTable() {
    const { detail } = this.state;
    if (!detail || !detail.sigs) { return null; }
    const headers = ['Status', 'DKIM Selector (s=)', 'Signing Domain (d=)', 'Timestamp (t=)'];
    const rows = detail.sigs.map(({ s, d, t, result }) => ([result ? 'Passed' : 'Failed', s, d, t || 'N/A']));
    return <Table headers={headers} rows={rows} />;
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <div className='button-header'>
          <Link to={`/dkim/results/${this.props.params.email}`} className='button button--muted'><i className='fa fa-arrow-left'></i> Back</Link>
          <button className='button button--muted'><i className='fa fa-share-alt'></i> Share</button>
        </div>
        {error && <p>An error occurred getting details</p>}
        {this.renderHeaderTable()}
        {this.renderSignatureTable()}
      </div>
    );
  }
}
