import React, { Component } from 'react';
import axios from 'axios';
import config from 'config/index';
import moment from 'moment';

import ResultListRow from 'components/dkim/ResultListRow';
import ResultListHeader from 'components/dkim/ResultListHeader';

export default class ResultListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tableRows: [],
      loading: false // should this just be true at first?
    };
  }

  componentDidMount() {
    this.getResults();
  }

  // TODO move this to redux
  getResults() {
    const { email } = this.props.params;
    this.setState({ loading: true });
    return axios.get(`${config.apiBase}/messaging-tools/validations/${email}`)
      .then(({ data }) => {
        const { results } = data;
        this.setState({
          tableRows: results.map(({ id, subject, result, header_from, received }) => (
            {
              id, header_from, subject,
              result: result ? 'Passed' : 'Failed',
              received: moment(received).local().format('[Delivered on] MMM D YYYY[, at] h:mm A')
            }
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

  renderResultListRow({ id, subject, result, header_from, received }) {
    const { email } = this.props.params;
    return (
      <ResultListRow key={id}
        id={id}
        subject={subject}
        result={result}
        header_from={header_from}
        received={received}
        email={email} />
    );
  }

  renderEmptyTable() {
    return (
      <div className='panel'>
        <div className='panel__body text--center'>
          <p>No messages have been recieved to this test address.</p>
        </div>
      </div>
    );
  }

  render() {
    const { error, tableRows } = this.state;
    const { email } = this.props.params;

    return (
      <div className='flex center-xs'>
        <div className='col-xs-12 col-md-10 col-lg-8'>
          <ResultListHeader email={email} error={error} getResults={() => this.getResults()}/>
          {tableRows.map((values) => this.renderResultListRow(values))}
          {tableRows.length === 0 && this.renderEmptyTable()}
        </div>
      </div>
    );
  }
}
