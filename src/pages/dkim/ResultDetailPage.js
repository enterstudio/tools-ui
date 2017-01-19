import React, { Component } from 'react';
import axios from 'axios';
import config from 'config/index';
import moment from 'moment';

import Table from 'components/Table';
import ResultDetailHeader from 'components/dkim/ResultDetailHeader';
import { BackLink } from 'components/button/Button';
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
            ['From', results.header_from],
            ['On', moment(results.received).local().format('MMM D YYYY[, at] h:mm A')],
            ['Status', results.result ? 'Passed' : 'Failed']
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
    const back = `/dkim/results/${this.props.params.email}`;
    return (
      <div className='flex center-xs'>
        <div className='col-xs-12 col-md-10'>
          <div className='text--left'><BackLink to={back} title='DKIM Results' /></div>
          <ErrorMessage error={error} />
          <ResultDetailHeader rows={detailTableRows} error={error} />
          <div className='panel'>
            <div className='panel__body padding--none'>
              <Table headers={sigTableHeaders} rows={sigTableRows} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
