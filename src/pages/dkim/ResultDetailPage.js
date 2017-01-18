import React, { Component } from 'react';
import axios from 'axios';
import config from 'config/index';
import Table, { VerticalTable } from 'components/Table';
import { ActionButton, LinkButton } from 'components/button/Button';
import Icon from 'components/Icon';
import ErrorMessage from 'components/errors/ErrorMessage';

export default class ResultDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      detailTableRows: [],
      sigTableHeaders: ['Status', 'DKIM Selector (s=)', 'Signing Domain (d=)', 'Timestamp (t=)'],
      sigTableRows: [],
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
          detailTableRows: [
            ['Subject', results.subject],
            ['Sender', results.header_from],
            ['Date', new Date(results.received).toLocaleString()],
            ['DKIM Status', results.result ? 'Passed' : 'Failed']
          ],
          sigTableRows: results.sigs.map(({ s, d, t, result }) => ([result ? 'Passed' : 'Failed', s, d, t || 'N/A'])),
          loading: false
        });
      }, ({ response = null }) => {
        this.setState({
          error: response ? response.data.errors[0] : true,
          loading: false
        });
      });
  }

  render() {
    const { error, detailTableRows, sigTableHeaders, sigTableRows } = this.state;
    const to = `/dkim/results/${this.props.params.email}`;
    return (
      <div>
        <div className='button-header'>
          <LinkButton to={to} type='muted'><Icon name='arrow-left' /> Back</LinkButton>
          <ActionButton type='muted'><Icon name='share-alt' /> Share</ActionButton>
        </div>
        <ErrorMessage error={error} />
        <VerticalTable rows={detailTableRows} />
        <Table headers={sigTableHeaders} rows={sigTableRows} />
      </div>
    );
  }
}
